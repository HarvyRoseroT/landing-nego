"use client";

import { useEffect, useMemo, useState } from "react";
import { clearPedido, readPedido, savePedido } from "@/lib/pedidoStorage";
import type { PedidoProducto } from "@/types/pedido";
import type { Producto } from "@/types/producto";

interface UsePersistentOrderOptions {
  establecimientoId?: number;
  scopeKey?: string;
}

export function usePersistentOrder(options?: number | UsePersistentOrderOptions) {
  const establecimientoId =
    typeof options === "number" ? options : options?.establecimientoId;
  const storageScopeKey =
    typeof options === "number"
      ? String(options)
      : options?.scopeKey ?? (establecimientoId ? String(establecimientoId) : undefined);
  const [items, setItems] = useState<PedidoProducto[]>(() =>
    storageScopeKey ? readPedido(storageScopeKey) : []
  );

  useEffect(() => {
    if (!storageScopeKey) {
      return;
    }

    savePedido(storageScopeKey, items);
  }, [storageScopeKey, items]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.cantidad, 0),
    [items]
  );

  function addProduct(producto: Producto) {
    setItems((current) => {
      const price = Number(producto.precio ?? 0);
      const existing = current.find((item) => item.productoId === producto.id);

      if (existing) {
        return current.map((item) =>
          item.productoId === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          precio: Number.isFinite(price) ? price : 0,
          cantidad: 1,
          imagenUrl: producto.imagen_url,
          marca: producto.marca,
          talla: producto.talla,
        },
      ];
    });
  }

  function increase(productoId: number) {
    setItems((current) =>
      current.map((item) =>
        item.productoId === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  function decrease(productoId: number) {
    setItems((current) =>
      current
        .map((item) =>
          item.productoId === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function remove(productoId: number) {
    setItems((current) => current.filter((item) => item.productoId !== productoId));
  }

  function getQuantity(productoId: number) {
    return items.find((item) => item.productoId === productoId)?.cantidad ?? 0;
  }

  function clear() {
    if (storageScopeKey) {
      clearPedido(storageScopeKey);
    }

    setItems([]);
  }

  return {
    establecimientoId,
    scopeKey: storageScopeKey,
    items,
    total,
    totalItems,
    addProduct,
    increase,
    decrease,
    remove,
    getQuantity,
    clear,
  };
}
