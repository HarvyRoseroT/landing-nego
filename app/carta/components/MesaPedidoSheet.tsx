"use client";

import { useEffect, useMemo, useState } from "react";
import { getOrCreateGuestAppUserId } from "@/lib/appUserStorage";
import { formatMoney } from "@/lib/format";
import { createMesaPedido } from "@/services/api";
import type { PedidoProducto } from "@/types/pedido";
import type { PedidoMesaPayload } from "@/types/mesa";

interface Props {
  open: boolean;
  mesaId: number;
  mesaNombre: string;
  establecimientoNombre: string;
  items: PedidoProducto[];
  total: number;
  onClose: () => void;
  onIncrease: (productoId: number) => void;
  onDecrease: (productoId: number) => void;
  onRemove: (productoId: number) => void;
  onConfirmed: () => void;
}

export default function MesaPedidoSheet({
  open,
  mesaId,
  mesaNombre,
  establecimientoNombre,
  items,
  total,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onConfirmed,
}: Props) {
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [notas, setNotas] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [submittedTotal, setSubmittedTotal] = useState(0);
  const [submittedItemsCount, setSubmittedItemsCount] = useState(0);

  const canConfirm = useMemo(
    () =>
      items.length > 0 &&
      clienteNombre.trim().length >= 2 &&
      clienteTelefono.trim().length >= 7 &&
      !submitting,
    [clienteNombre, clienteTelefono, items.length, submitting]
  );

  useEffect(() => {
    if (!open) {
      setConfirmed(false);
      setSubmitError(null);
      setSubmitting(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  async function handleConfirm() {
    const usuarioAppId = getOrCreateGuestAppUserId();

    if (!usuarioAppId) {
      setSubmitError("No pudimos inicializar el usuario de la app para este pedido.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload: PedidoMesaPayload = {
      usuario_app_id: usuarioAppId,
      cliente_nombre: clienteNombre.trim(),
      cliente_telefono: clienteTelefono.trim(),
      notas: notas.trim() || undefined,
      items: items.map((item) => ({
        producto_id: item.productoId,
        cantidad: item.cantidad,
        notas: item.notas ?? undefined,
      })),
    };

    try {
      await createMesaPedido(mesaId, payload);
      setSubmittedTotal(total);
      setSubmittedItemsCount(items.reduce((sum, item) => sum + item.cantidad, 0));
      setConfirmed(true);
      onConfirmed();
    } catch {
      setSubmitError("No pudimos enviar el pedido. Revisa tu conexion e intenta otra vez.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={overlayStyle}
      onClick={onClose}
    >
      <div
        style={sheetStyle}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={dragHandleStyle} />

        {confirmed ? (
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Pedido mesa confirmado</h2>
            <p style={{ margin: "8px 0 0", color: "#4b5563", lineHeight: 1.4 }}>
              Tu pedido fue enviado a {mesaNombre} en {establecimientoNombre}.
            </p>

            <div style={summaryCardStyle}>
              <div style={rowStyle}>
                <span>Mesa</span>
                <strong>{mesaNombre}</strong>
              </div>
              <div style={rowStyle}>
                <span>Items</span>
                <strong>{submittedItemsCount}</strong>
              </div>
              <div style={rowStyle}>
                <span>Total</span>
                <strong>{formatMoney(submittedTotal)}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              style={primaryButtonStyle}
            >
              Seguir viendo la carta
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Confirmar pedido mesa</h2>
                <p style={{ margin: "6px 0 0", color: "#555", fontSize: 14 }}>
                  Mesa {mesaNombre}.
                </p>
              </div>
              <button
                onClick={onClose}
                style={closeButtonStyle}
                aria-label="Cerrar"
              >
                X
              </button>
            </div>

            {items.length === 0 ? (
              <div style={emptyStateStyle}>Aun no has agregado productos al pedido.</div>
            ) : (
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item) => (
                  <div
                    key={item.productoId}
                    style={itemCardStyle}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                        <div style={{ color: "#1B5E3C", fontWeight: 700, marginTop: 6 }}>
                          {formatMoney(item.precio * item.cantidad)}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(item.productoId)}
                        style={removeButtonStyle}
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

            <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
              <label style={labelStyle}>
                <span>Tu nombre</span>
                <input
                  value={clienteNombre}
                  onChange={(event) => setClienteNombre(event.target.value)}
                  placeholder="Ej. Juan"
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                <span>Tu telefono</span>
                <input
                  value={clienteTelefono}
                  onChange={(event) => setClienteTelefono(event.target.value)}
                  placeholder="3001234567"
                  inputMode="tel"
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                <span>Notas del pedido</span>
                <textarea
                  value={notas}
                  onChange={(event) => setNotas(event.target.value)}
                  placeholder="Sin cebolla, sin picante..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 86 }}
                />
              </label>
            </div>

            {submitError ? (
              <div
                style={{
                  marginTop: 16,
                  borderRadius: 16,
                  background: "#fef2f2",
                  color: "#991b1b",
                  padding: 14,
                  fontSize: 14,
                }}
              >
                {submitError}
              </div>
            ) : null}

            <div
              style={{
                marginTop: 20,
                borderRadius: 18,
                background: "#111",
                color: "#fff",
                padding: 18,
              }}
            >
              <div style={rowStyle}>
                <span>Total productos</span>
                <strong>{formatMoney(total)}</strong>
              </div>
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                style={{
                  ...primaryButtonStyle,
                  marginTop: 14,
                  background: canConfirm ? "#F4D35E" : "#4B5563",
                  color: canConfirm ? "#111827" : "#E5E7EB",
                  cursor: canConfirm ? "pointer" : "not-allowed",
                }}
              >
                {submitting ? "Enviando pedido..." : "Enviar pedido a la mesa"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.56)",
  zIndex: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
} as const;

const sheetStyle = {
  width: "100%",
  maxWidth: 430,
  background: "#F8F7F4",
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  padding: 20,
  maxHeight: "88vh",
  overflowY: "auto",
} as const;

const dragHandleStyle = {
  width: 56,
  height: 5,
  borderRadius: 999,
  background: "rgba(0,0,0,.15)",
  margin: "0 auto 16px",
} as const;

const closeButtonStyle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,.08)",
  color: "#111827",
  fontSize: 16,
  fontWeight: 800,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  flexShrink: 0,
} as const;

const emptyStateStyle = {
  marginTop: 20,
  borderRadius: 18,
  background: "#fff",
  padding: 18,
  color: "#555",
} as const;

const itemCardStyle = {
  background: "#fff",
  borderRadius: 18,
  padding: 14,
  boxShadow: "0 6px 16px rgba(0,0,0,.06)",
} as const;

const removeButtonStyle = {
  border: "none",
  background: "none",
  color: "#B91C1C",
  fontWeight: 700,
  cursor: "pointer",
} as const;

const counterButtonStyle = {
  width: 36,
  height: 36,
  borderRadius: 12,
  border: "none",
  background: "rgba(27,94,60,.12)",
  color: "#1B5E3C",
  fontWeight: 800,
  fontSize: 18,
  cursor: "pointer",
} as const;

const labelStyle = {
  display: "grid",
  gap: 6,
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
} as const;

const inputStyle = {
  width: "100%",
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,.12)",
  background: "#fff",
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: "inherit",
  color: "#111827",
} as const;

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
} as const;

const primaryButtonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 16,
  padding: "15px 18px",
  fontWeight: 800,
} as const;

const summaryCardStyle = {
  marginTop: 18,
  display: "grid",
  gap: 12,
  borderRadius: 18,
  background: "#fff",
  padding: 18,
  boxShadow: "0 6px 16px rgba(0,0,0,.06)",
} as const;
