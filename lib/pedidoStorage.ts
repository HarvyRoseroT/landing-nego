import type { PedidoProducto } from "@/types/pedido";

function getOrderKey(scopeKey: string) {
  return `nego-order-${scopeKey}`;
}

export function readPedido(scopeKey: string): PedidoProducto[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(getOrderKey(scopeKey));

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
  scopeKey: string,
  items: PedidoProducto[]
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getOrderKey(scopeKey), JSON.stringify(items));
}

export function clearPedido(scopeKey: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(getOrderKey(scopeKey));
}
