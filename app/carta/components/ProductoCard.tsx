"use client";

import { useState } from "react";
import type { Producto } from "@/types/producto";
import ImageViewer from "./ImageViewer";

interface Props {
  producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const precio = formatter.format(Number(producto.precio ?? 0));

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
          {/* IMAGEN */}
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
                🖼️
              </div>
            )}
          </div>

          {/* INFO */}
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

            {/* FOOTER */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* PRECIO A LA DERECHA */}
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

              {/* EXPAND */}
              {producto.descripcion &&
                producto.descripcion.length > 100 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1B5E3C",
                      cursor: "pointer",
                      fontSize: 18,
                      marginLeft: 12,
                    }}
                    aria-label={
                      expanded ? "Contraer descripción" : "Expandir descripción"
                    }
                  >
                    {expanded ? "▲" : "▼"}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE */}
      {showImage && producto.imagen_url && (
        <ImageViewer
          imageUrl={producto.imagen_url}
          onClose={() => setShowImage(false)}
        />
      )}
    </>
  );
}
