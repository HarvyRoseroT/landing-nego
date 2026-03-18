"use client";

import type { CSSProperties } from "react";
import { formatMoney } from "@/lib/format";
import { buildWhatsappMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import type { PedidoProducto } from "@/types/pedido";

interface Props {
  open: boolean;
  onClose: () => void;
  establecimientoNombre: string;
  telefono?: string | null;
  items: PedidoProducto[];
  total: number;
  onIncrease: (productoId: number) => void;
  onDecrease: (productoId: number) => void;
  onRemove: (productoId: number) => void;
}

export default function PedidoSheet({
  open,
  onClose,
  establecimientoNombre,
  telefono,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  if (!open) {
    return null;
  }

  const canConfirm = Boolean(telefono && items.length);

  function handleConfirm() {
    if (!telefono) {
      return;
    }

    const message = buildWhatsappMessage({
      nombreEstablecimiento: establecimientoNombre,
      items,
      total,
    });

    window.open(buildWhatsappUrl(telefono, message), "_blank", "noopener,noreferrer");
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.56)",
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          background: "#F8F7F4",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: 20,
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          style={{
            width: 56,
            height: 5,
            borderRadius: 999,
            background: "rgba(0,0,0,.15)",
            margin: "0 auto 16px",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Mi pedido</h2>
            <p style={{ margin: "6px 0 0", color: "#555", fontSize: 14 }}>
              El costo del domicilio no esta incluido. La confirmacion final se hace
              por WhatsApp con el establecimiento.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,.08)",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            x
          </button>
        </div>

        {items.length === 0 ? (
          <div
            style={{
              marginTop: 20,
              borderRadius: 18,
              background: "#fff",
              padding: 18,
              color: "#555",
            }}
          >
            Aun no has agregado productos.
          </div>
        ) : (
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => (
              <div
                key={item.productoId}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: 14,
                  boxShadow: "0 6px 16px rgba(0,0,0,.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                    {(item.marca || item.talla) && (
                      <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
                        {[item.marca, item.talla].filter(Boolean).join(" · ")}
                      </div>
                    )}
                    <div style={{ color: "#1B5E3C", fontWeight: 700, marginTop: 6 }}>
                      {formatMoney(item.precio * item.cantidad)}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.productoId)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#B91C1C",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                  <button onClick={() => onDecrease(item.productoId)} style={counterButtonStyle}>
                    -
                  </button>
                  <span style={{ minWidth: 24, textAlign: "center", fontWeight: 700 }}>
                    {item.cantidad}
                  </span>
                  <button onClick={() => onIncrease(item.productoId)} style={counterButtonStyle}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 20,
            borderRadius: 18,
            background: "#111",
            color: "#fff",
            padding: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <span>Total productos</span>
            <strong>{formatMoney(total)}</strong>
          </div>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            style={{
              marginTop: 14,
              width: "100%",
              border: "none",
              borderRadius: 16,
              padding: "15px 18px",
              background: canConfirm ? "#25D366" : "#4B5563",
              color: canConfirm ? "#052E16" : "#E5E7EB",
              fontWeight: 800,
              cursor: canConfirm ? "pointer" : "not-allowed",
            }}
          >
            Confirmar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

const counterButtonStyle: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 12,
  border: "none",
  background: "rgba(27,94,60,.12)",
  color: "#1B5E3C",
  fontWeight: 800,
  fontSize: 18,
  cursor: "pointer",
};
