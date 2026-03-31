"use client";

import { useState } from "react";
import CartaHeader from "./CartaHeader";
import PedidoSheet from "./PedidoSheet";
import SeccionSection from "./SeccionSection";
import { usePersistentOrder } from "@/hooks/usePersistentOrder";
import { parseOrderRouteContext } from "@/lib/orderContext";
import type { CartaDetalle, Seccion } from "@/types/carta";

interface Props {
  carta: CartaDetalle;
  secciones: Seccion[];
  searchParams: Record<string, string | string[] | undefined>;
}

export default function CartaClientPage({
  carta,
  secciones,
  searchParams,
}: Props) {
  const context = parseOrderRouteContext(searchParams);
  const [sheetOpen, setSheetOpen] = useState(
    getStringParam(searchParams.openPedido) === "true"
  );
  const isClothing = context.tipo === "clothing_store";
  const canOrder = Boolean(
    context.establecimientoId && context.domicilioActivo && !isClothing
  );
  const pedido = usePersistentOrder(context.establecimientoId ?? undefined);

  return (
    <>
      <CartaHeader titulo={carta.nombre} />

      {secciones.length === 0 ? (
        <div
          style={{
            padding: 32,
            textAlign: "center",
            color: "#777",
          }}
        >
          Esta carta no tiene secciones disponibles
        </div>
      ) : (
        <div style={{ padding: "24px 20px 120px" }}>
          {isClothing ? (
            <div
              style={{
                marginBottom: 20,
                borderRadius: 18,
                background: "#fff",
                padding: 16,
                boxShadow: "0 6px 14px rgba(0,0,0,.05)",
                color: "#555",
              }}
            >
              Catalogo visual. Esta tienda de ropa no permite pedidos desde la web.
            </div>
          ) : !context.domicilioActivo ? (
            <div
              style={{
                marginBottom: 20,
                borderRadius: 18,
                background: "#fff",
                padding: 16,
                boxShadow: "0 6px 14px rgba(0,0,0,.05)",
                color: "#555",
              }}
            >
              Este establecimiento muestra su catalogo, pero no tiene domicilio activo.
            </div>
          ) : null}

          {secciones.map((seccion) => (
            <SeccionSection
              key={seccion.id}
              nombre={seccion.nombre}
              productos={seccion.productos ?? []}
              canAdd={canOrder}
              getQuantity={pedido.getQuantity}
              onAdd={pedido.addProduct}
              onIncrease={pedido.increase}
              onDecrease={pedido.decrease}
            />
          ))}
        </div>
      )}

      {canOrder ? (
        <>
          <button
            onClick={() => setSheetOpen(true)}
            style={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 32px)",
              maxWidth: 398,
              border: "none",
              borderRadius: 18,
              padding: "16px 18px",
              background: "#111827",
              color: "#fff",
              fontWeight: 800,
              boxShadow: "0 12px 30px rgba(0,0,0,.25)",
              cursor: "pointer",
            }}
          >
            {`Mi pedido (${pedido.totalItems})`}
          </button>

          <PedidoSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            establecimientoNombre={context.establecimientoNombre}
            telefono={context.telefono}
            items={pedido.items}
            total={pedido.total}
            onIncrease={pedido.increase}
            onDecrease={pedido.decrease}
            onRemove={pedido.remove}
          />
        </>
      ) : null}
    </>
  );
}

function getStringParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : null;
}
