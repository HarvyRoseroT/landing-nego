export type OrderFlowType = "general";

export interface OrderRouteContext {
  flow: OrderFlowType;
  establecimientoId: number | null;
  establecimientoNombre: string;
  telefono: string | null;
  tipo: string | null;
  domicilioActivo: boolean;
  mesaId: number | null;
  mesaNombre: string | null;
}

type SearchValue = string | string[] | undefined;
type SearchParamsInput = Record<string, SearchValue>;

export function parseOrderRouteContext(
  searchParams: SearchParamsInput
): OrderRouteContext {
  return {
    flow: "general",
    establecimientoId: getNumberParam(searchParams.establecimientoId),
    establecimientoNombre:
      getStringParam(searchParams.establecimientoNombre) ?? "establecimiento",
    telefono: getStringParam(searchParams.telefono),
    tipo: getStringParam(searchParams.tipo),
    domicilioActivo: getStringParam(searchParams.domicilio) === "true",
    mesaId: null,
    mesaNombre: null,
  };
}

export function buildGeneralCartaQuery(params: {
  establecimientoId: number;
  establecimientoNombre: string;
  telefono?: string | null;
  tipo: string;
  domicilioActivo: boolean;
}) {
  return new URLSearchParams({
    establecimientoId: String(params.establecimientoId),
    establecimientoNombre: params.establecimientoNombre,
    telefono: params.telefono ?? "",
    tipo: params.tipo,
    domicilio: String(params.domicilioActivo),
  }).toString();
}

export function buildMesaCartaQuery(params: {
  establecimientoId: number;
  establecimientoNombre: string;
  tipo: string;
  mesaId: number;
  mesaNombre: string;
}) {
  return new URLSearchParams({
    establecimientoId: String(params.establecimientoId),
    establecimientoNombre: params.establecimientoNombre,
    tipo: params.tipo,
    domicilio: "true",
    mesaId: String(params.mesaId),
    mesaNombre: params.mesaNombre,
  }).toString();
}

function getStringParam(value: SearchValue) {
  return typeof value === "string" && value.trim() ? value : null;
}

function getNumberParam(value: SearchValue) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
