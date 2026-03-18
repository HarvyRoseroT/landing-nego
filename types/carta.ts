export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string | null;
  precio?: number | null;
  imagen_url?: string | null;
  orden?: number;
  marca?: string | null;
  talla?: string | null;
}

export interface Seccion {
  id: number;
  nombre: string;
  orden?: number;
  productos?: Producto[];
}

export interface CartaDetalle {
  id: number;
  nombre: string;
  secciones?: Seccion[];
}
