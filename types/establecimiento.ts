export type EstablishmentType =
  | "restaurant"
  | "cafe"
  | "bar"
  | "dark_kitchen"
  | "clothing_store";

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface CartaResumen {
  id: number;
  nombre: string;
}

export interface EstablecimientoBase {
  id: number;
  slug: string;
  nombre: string;
  direccion?: string | null;
  ciudad?: string | null;
  pais?: string | null;
  logo_url?: string | null;
  tipo_establecimiento: EstablishmentType;
  domicilio_activo: boolean;
  activo: boolean;
}

export interface EstablecimientoCercano extends EstablecimientoBase {
  distancia_km?: number | null;
}

export interface EstablecimientoDetalle extends EstablecimientoBase {
  descripcion?: string | null;
  telefono_contacto?: string | null;
  imagen_ubicacion_url?: string | null;
  latitud?: number | null;
  longitud?: number | null;
  cartas: CartaResumen[];
}
