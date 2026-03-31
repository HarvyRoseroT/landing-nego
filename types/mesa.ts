import type { CartaResumen, EstablecimientoBase } from "@/types/establecimiento";

export interface MesaInfo {
  id: number;
  nombre: string;
  capacidad?: number | null;
}

export interface PlanoInfo {
  id: number;
  nombre: string;
}

export interface MesaPedidoContext {
  mesa: MesaInfo;
  plano?: PlanoInfo | null;
  establecimiento: Pick<
    EstablecimientoBase,
    "id" | "slug" | "nombre" | "logo_url" | "tipo_establecimiento"
  > & {
    descripcion?: string | null;
  };
  cartas: CartaResumen[];
}

export interface PedidoMesaItemPayload {
  producto_id: number;
  cantidad: number;
  notas?: string;
}

export interface PedidoMesaPayload {
  usuario_app_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  notas?: string;
  items: PedidoMesaItemPayload[];
}

export interface PedidoMesaResponse {
  id?: number;
  total?: number | null;
  estado?: string | null;
  [key: string]: unknown;
}
