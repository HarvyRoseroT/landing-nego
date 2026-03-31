"use client";

import Link from "next/link";
import { useState } from "react";
import MesaPedidoSheet from "@/app/carta/components/MesaPedidoSheet";
import EstablecimientoLogo from "@/app/[slug]/components/EstablecimientoLogo";
import { usePersistentOrder } from "@/hooks/usePersistentOrder";
import { formatMoney } from "@/lib/format";
import { buildMesaCartaQuery } from "@/lib/orderContext";
import type { MesaPedidoContext } from "@/types/mesa";

interface Props {
  context: MesaPedidoContext;
}

export default function MesaClientPage({ context }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pedido = usePersistentOrder({
    establecimientoId: context.establecimiento.id,
    scopeKey: `mesa-${context.mesa.id}`,
  });

  const cartaQuery = buildMesaCartaQuery({
    establecimientoId: context.establecimiento.id,
    establecimientoNombre: context.establecimiento.nombre,
    tipo: context.establecimiento.tipo_establecimiento,
    mesaId: context.mesa.id,
    mesaNombre: context.mesa.nombre,
  });

  return (
    <section
      style={{
        padding: 20,
        background:
          "linear-gradient(180deg, #111827 0%, #1f2937 55%, #F8F7F4 55%, #F8F7F4 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 14px 28px rgba(0,0,0,.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <EstablecimientoLogo logoUrl={context.establecimiento.logo_url} />
          <div>
            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Pedido mesa por QR
            </p>
            <h1 style={{ margin: "4px 0 0", fontSize: 24 }}>
              {context.establecimiento.nombre}
            </h1>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            borderRadius: 20,
            background: "#111827",
            color: "#fff",
            padding: 18,
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.8 }}>Estas pidiendo en</div>
          <div style={{ marginTop: 4, fontSize: 24, fontWeight: 800 }}>
            {context.mesa.nombre}
          </div>
          {context.plano?.nombre ? (
            <div style={{ marginTop: 6, fontSize: 14, opacity: 0.82 }}>
              Plano {context.plano.nombre}
            </div>
          ) : null}
        </div>
      </div>

      <section style={{ marginTop: 24 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 18,
            boxShadow: "0 8px 20px rgba(0,0,0,.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20 }}>Pedido mesa</h2>
              <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>
                Mesa {context.mesa.nombre}
              </p>
            </div>
            <div
              style={{
                minWidth: 72,
                borderRadius: 14,
                background: "rgba(27,94,60,.12)",
                color: "#1B5E3C",
                padding: "10px 12px",
                textAlign: "center",
                fontWeight: 800,
              }}
            >
              {pedido.totalItems} item{pedido.totalItems === 1 ? "" : "s"}
            </div>
          </div>

          {pedido.items.length === 0 ? (
            <div
              style={{
                marginTop: 16,
                borderRadius: 16,
                background: "#f9fafb",
                padding: 16,
                color: "#6b7280",
              }}
            >
              Aun no has seleccionado productos para esta mesa.
            </div>
          ) : (
            <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
              {pedido.items.map((item) => (
                <div
                  key={item.productoId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    borderRadius: 16,
                    background: "#f9fafb",
                    padding: 14,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                    <div style={{ marginTop: 4, color: "#6b7280", fontSize: 14 }}>
                      Cantidad: {item.cantidad}
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, color: "#1B5E3C" }}>
                    {formatMoney(item.precio * item.cantidad)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#374151", fontWeight: 700 }}>Total</span>
            <strong>{formatMoney(pedido.total)}</strong>
          </div>

          <button
            onClick={() => setSheetOpen(true)}
            disabled={!pedido.items.length}
            style={{
              marginTop: 16,
              width: "100%",
              border: "none",
              borderRadius: 16,
              padding: "15px 18px",
              background: pedido.items.length ? "#111827" : "#9ca3af",
              color: "#fff",
              fontWeight: 800,
              cursor: pedido.items.length ? "pointer" : "not-allowed",
            }}
          >
            Hacer pedido en mesa
          </button>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Cartas disponibles</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>
            Agrega productos y confirmalos para la mesa {context.mesa.nombre}.
          </p>
        </div>

        {!context.cartas.length ? (
          <div
            style={{
              borderRadius: 18,
              background: "#fff",
              padding: 18,
              color: "#4b5563",
              boxShadow: "0 8px 20px rgba(0,0,0,.06)",
            }}
          >
            No hay cartas disponibles para esta mesa en este momento.
          </div>
        ) : (
          context.cartas.map((carta) => (
            <Link
              key={carta.id}
              href={`/carta/${carta.id}?${cartaQuery}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  marginBottom: 12,
                  background: "#fff",
                  borderRadius: 18,
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 18px rgba(0,0,0,.06)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{carta.nombre}</div>
                  <div style={{ marginTop: 4, color: "#6b7280", fontSize: 14 }}>
                    Ver productos y agregar al pedido mesa
                  </div>
                </div>
                <div style={{ fontSize: 24, color: "#9ca3af", lineHeight: 1 }}>&gt;</div>
              </div>
            </Link>
          ))
        )}
      </section>

      <MesaPedidoSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        mesaId={context.mesa.id}
        mesaNombre={context.mesa.nombre}
        establecimientoNombre={context.establecimiento.nombre}
        items={pedido.items}
        total={pedido.total}
        onIncrease={pedido.increase}
        onDecrease={pedido.decrease}
        onRemove={pedido.remove}
        onConfirmed={pedido.clear}
      />
    </section>
  );
}
