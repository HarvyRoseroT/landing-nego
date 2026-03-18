"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { formatMoney } from "@/lib/format";
import type { Producto } from "@/types/producto";
import ImageViewer from "./ImageViewer";

interface Props {
  producto: Producto;
  canAdd?: boolean;
  quantity?: number;
  onAdd?: (producto: Producto) => void;
  onIncrease?: (productoId: number) => void;
  onDecrease?: (productoId: number) => void;
}

export default function ProductoCard({
  producto,
  canAdd = false,
  quantity = 0,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const precio = formatMoney(Number(producto.precio ?? 0));

  return (
    <>
      <div
        style={{
          marginBottom: 22,
          padding: 14,
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 14px rgba(0,0,0,.06)",
          transition: "all .22s ease",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <div
            onClick={() => producto.imagen_url && setShowImage(true)}
            style={{
              width: 90,
              height: 90,
              borderRadius: 14,
              overflow: "hidden",
              background: "#eee",
              flexShrink: 0,
              cursor: producto.imagen_url ? "pointer" : "default",
            }}
          >
            {producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: 22,
                }}
              >
                IMG
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              {producto.nombre}
            </h3>

            {producto.descripcion && (
              <p
                style={{
                  marginTop: 6,
                  marginBottom: 0,
                  fontSize: 14,
                  lineHeight: 1.25,
                  color: "rgba(0,0,0,.75)",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: expanded ? "unset" : 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {producto.descripcion}
              </p>
            )}

            {(producto.marca || producto.talla) && (
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  fontSize: 13,
                  color: "rgba(0,0,0,.58)",
                }}
              >
                {[producto.marca, producto.talla].filter(Boolean).join(" · ")}
              </p>
            )}

            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  background: "rgba(27,94,60,.12)",
                  color: "#1B5E3C",
                  fontWeight: 900,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                }}
              >
                {precio}
              </div>

              {canAdd ? (
                quantity > 0 ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => onDecrease?.(producto.id)} style={stepperStyle}>
                      -
                    </button>
                    <span style={{ minWidth: 18, textAlign: "center", fontWeight: 800 }}>
                      {quantity}
                    </span>
                    <button onClick={() => onIncrease?.(producto.id)} style={stepperStyle}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAdd?.(producto)}
                    style={{
                      border: "none",
                      background: "#1B5E3C",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 800,
                      padding: "10px 14px",
                      borderRadius: 999,
                    }}
                    aria-label="Agregar producto"
                  >
                    Agregar
                  </button>
                )
              ) : producto.descripcion && producto.descripcion.length > 100 ? (
                <button
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1B5E3C",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                  aria-label={expanded ? "Contraer descripcion" : "Expandir descripcion"}
                >
                  {expanded ? "Ver menos" : "Ver mas"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showImage && producto.imagen_url && (
        <ImageViewer
          imageUrl={producto.imagen_url}
          onClose={() => setShowImage(false)}
        />
      )}
    </>
  );
}

const stepperStyle: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 10,
  border: "none",
  background: "rgba(27,94,60,.12)",
  color: "#1B5E3C",
  fontWeight: 800,
  fontSize: 18,
  cursor: "pointer",
};
