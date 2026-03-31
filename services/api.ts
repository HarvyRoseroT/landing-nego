import type { CartaDetalle } from "@/types/carta";
import type {
  CartaResumen,
  EstablishmentType,
  EstablecimientoCercano,
  EstablecimientoDetalle,
} from "@/types/establecimiento";
import type {
  MesaPedidoContext,
  PedidoMesaPayload,
  PedidoMesaResponse,
} from "@/types/mesa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ensureApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no esta configurado");
  }
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function getBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "si", "yes", "activo"].includes(normalized)) {
      return true;
    }

    if (["false", "0", "no", "inactivo"].includes(normalized)) {
      return false;
    }
  }

  return fallback;
}

function getTipoEstablecimiento(value: unknown): EstablishmentType {
  const fallback: EstablishmentType = "restaurant";

  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (
    normalized === "restaurant" ||
    normalized === "cafe" ||
    normalized === "bar" ||
    normalized === "dark_kitchen" ||
    normalized === "clothing_store"
  ) {
    return normalized;
  }

  return fallback;
}

function isNonNullable<T>(value: T | null): value is T {
  return value !== null;
}

function getCartas(value: unknown): CartaResumen[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item): CartaResumen | null => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const id = getNumber((item as { id?: unknown }).id);
      const nombre = getString((item as { nombre?: unknown }).nombre);
      const orden = getNumber((item as { orden?: unknown }).orden);

      if (!id || !nombre) {
        return null;
      }

      return {
        id,
        nombre,
        ...(orden !== null ? { orden } : {}),
      };
    })
    .filter(isNonNullable);
}

function normalizeEstablecimientoBase(raw: Record<string, unknown>) {
  return {
    id: getNumber(raw.id) ?? 0,
    slug: getString(raw.slug) ?? "",
    nombre: getString(raw.nombre) ?? "Establecimiento",
    direccion: getString(raw.direccion),
    ciudad: getString(raw.ciudad),
    pais: getString(raw.pais),
    logo_url: getString(raw.logo_url),
    tipo_establecimiento: getTipoEstablecimiento(
      raw.tipo_establecimiento ?? raw.tipo
    ),
    domicilio_activo: getBoolean(raw.domicilio_activo),
    activo: getBoolean(raw.activo, true),
  };
}

function normalizeDetalle(raw: Record<string, unknown>): EstablecimientoDetalle {
  const base = normalizeEstablecimientoBase(raw);

  return {
    ...base,
    descripcion: getString(raw.descripcion),
    telefono_contacto: getString(raw.telefono_contacto),
    imagen_ubicacion_url: getString(raw.imagen_ubicacion_url),
    latitud: getNumber(raw.latitud ?? raw.lat),
    longitud: getNumber(raw.longitud ?? raw.lng),
    cartas: getCartas(raw.cartas),
  };
}

function normalizeCercano(raw: Record<string, unknown>): EstablecimientoCercano | null {
  const base = normalizeEstablecimientoBase(raw);

  if (!base.id || !base.slug) {
    return null;
  }

  return {
    ...base,
    distancia_km: getNumber(
      raw.distancia_km ?? raw.distancia ?? raw.distancia_en_km
    ),
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  return requestJson<T>(path, { method: "GET" });
}

async function requestJson<T>(
  path: string,
  init: RequestInit
): Promise<T | null> {
  ensureApiUrl();

  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    ...init,
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Error backend (${res.status})`);
  }

  return (await res.json()) as T;
}

function extractListPayload(
  payload: unknown[] | { data?: unknown[] } | null
): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object" && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export async function getEstablecimientosCercanos(
  lat: number,
  lng: number
): Promise<EstablecimientoCercano[]> {
  const payload = await fetchJson<unknown[] | { data?: unknown[] }>(
    `/establecimientos/cercanos?lat=${lat}&lng=${lng}`
  );

  const items = extractListPayload(payload);

  return items
    .map((item) =>
      item && typeof item === "object"
        ? normalizeCercano(item as Record<string, unknown>)
        : null
    )
    .filter(
      (item): item is EstablecimientoCercano => Boolean(item && item.activo)
    );
}

export async function getEstablecimientoBySlug(
  slug: string
): Promise<EstablecimientoDetalle | null> {
  const payload = await fetchJson<Record<string, unknown>>(
    `/establecimientos/slug/${slug}`
  );

  if (!payload) {
    return null;
  }

  return normalizeDetalle(payload);
}

export async function getEstablecimientoDetalle(
  id: number
): Promise<EstablecimientoDetalle | null> {
  const payload = await fetchJson<Record<string, unknown>>(
    `/establecimientos/${id}/detalle`
  );

  if (!payload) {
    return null;
  }

  return normalizeDetalle(payload);
}

export async function getCartaDetalle(cartaId: string | number) {
  return fetchJson<CartaDetalle>(`/cartas/${cartaId}`);
}

export async function getAppCartaDetalle(cartaId: string | number) {
  return fetchJson<CartaDetalle>(`/app/cartas/${cartaId}`);
}

function normalizeMesaContext(raw: Record<string, unknown>): MesaPedidoContext | null {
  const mesaRaw =
    raw.mesa && typeof raw.mesa === "object"
      ? (raw.mesa as Record<string, unknown>)
      : null;
  const establecimientoRaw =
    raw.establecimiento && typeof raw.establecimiento === "object"
      ? (raw.establecimiento as Record<string, unknown>)
      : null;
  const planoRaw =
    raw.plano && typeof raw.plano === "object"
      ? (raw.plano as Record<string, unknown>)
      : null;

  if (!mesaRaw || !establecimientoRaw) {
    return null;
  }

  const mesaId = getNumber(mesaRaw.id);
  const mesaNombre = getString(mesaRaw.nombre);
  const establecimientoId = getNumber(establecimientoRaw.id);
  const establecimientoNombre = getString(establecimientoRaw.nombre);
  const establecimientoSlug = getString(establecimientoRaw.slug);

  if (
    !mesaId ||
    !mesaNombre ||
    !establecimientoId ||
    !establecimientoNombre ||
    !establecimientoSlug
  ) {
    return null;
  }

  return {
    mesa: {
      id: mesaId,
      nombre: mesaNombre,
      capacidad: getNumber(mesaRaw.capacidad),
    },
    plano: planoRaw
      ? {
          id: getNumber(planoRaw.id) ?? 0,
          nombre: getString(planoRaw.nombre) ?? "",
        }
      : null,
    establecimiento: {
      id: establecimientoId,
      nombre: establecimientoNombre,
      slug: establecimientoSlug,
      descripcion: getString(establecimientoRaw.descripcion),
      logo_url: getString(establecimientoRaw.logo_url),
      tipo_establecimiento: getTipoEstablecimiento(
        establecimientoRaw.tipo_establecimiento
      ),
    },
    cartas: getCartas(raw.cartas),
  };
}

export async function getMesaPedidoContext(
  mesaId: string | number
): Promise<MesaPedidoContext | null> {
  const payload = await fetchJson<Record<string, unknown>>(`/app/mesas/${mesaId}`);

  if (!payload) {
    return null;
  }

  return normalizeMesaContext(payload);
}

export async function createMesaPedido(
  mesaId: string | number,
  body: PedidoMesaPayload
): Promise<PedidoMesaResponse | null> {
  return requestJson<PedidoMesaResponse>(`/app/mesas/${mesaId}/pedidos`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
