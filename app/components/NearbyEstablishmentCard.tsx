"use client";

import Link from "next/link";
import EstablecimientoLogo from "@/app/[slug]/components/EstablecimientoLogo";
import { formatDistance, getTypeIcon, getTypeLabel } from "@/lib/format";
import type { EstablecimientoCercano } from "@/types/establecimiento";

interface Props {
  item: EstablecimientoCercano;
}

export default function NearbyEstablishmentCard({ item }: Props) {
  const isClothing = item.tipo_establecimiento === "clothing_store";
  const statusText = isClothing
    ? "Catalogo visual"
    : item.domicilio_activo
      ? "Domicilio activo"
      : "Solo catalogo";

  return (
    <Link
      href={`/${item.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          background: "#141414",
          borderRadius: 24,
          padding: 16,
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 14px 40px rgba(0,0,0,.22)",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <EstablecimientoLogo logoUrl={item.logo_url} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.08)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {getTypeIcon(item.tipo_establecimiento)} {getTypeLabel(item.tipo_establecimiento)}
              </span>
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: isClothing ? "rgba(234,179,8,.16)" : "rgba(34,197,94,.16)",
                  color: isClothing ? "#FACC15" : "#86EFAC",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {statusText}
              </span>
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {item.nombre}
            </h2>
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.72)", fontSize: 14 }}>
              {[item.direccion, item.ciudad].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>
            {formatDistance(item.distancia_km)}
          </span>
          <span style={{ color: "#4ADE80", fontWeight: 700, fontSize: 14 }}>
            Ver detalle
          </span>
        </div>
      </article>
    </Link>
  );
}
