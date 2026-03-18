import type { PedidoProducto } from "@/types/pedido";

function getOrderKey(establecimientoId: number) {
  return `nego-order-${establecimientoId}`;
}

export function readPedido(establecimientoId: number): PedidoProducto[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(getOrderKey(establecimientoId));

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as PedidoProducto[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePedido(
  establecimientoId: number,
  items: PedidoProducto[]
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getOrderKey(establecimientoId), JSON.stringify(items));
}
