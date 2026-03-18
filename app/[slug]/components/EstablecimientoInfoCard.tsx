"use client";

import ExpandableText from "./ExpandableText";

interface Props {
  data: {
    descripcion?: string;
    direccion?: string;
    ciudad?: string;
    pais?: string;
    telefono_contacto?: string;
    domicilio_activo?: boolean;
    tipo_establecimiento?: string;
  };
}

export default function EstablecimientoInfoCard({ data }: Props) {
  const {
    descripcion,
    direccion,
    ciudad,
    pais,
    telefono_contacto,
    domicilio_activo,
    tipo_establecimiento,
  } = data;

  const isClothing = tipo_establecimiento === "clothing_store";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
      }}
    >
      {descripcion && (
        <>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 600,
              color: "#777",
            }}
          >
            Descripción
          </p>
          <div style={{ height: 6 }} />
          <ExpandableText text={descripcion} />
          <div style={{ height: 16 }} />
        </>
      )}

      {direccion && <InfoRow icon="📍" text={direccion} />}

      {(ciudad || pais) && (
        <InfoRow
          icon="🌍"
          text={[ciudad, pais].filter(Boolean).join(" · ")}
        />
      )}

      {telefono_contacto && <InfoRow icon="TE" text={telefono_contacto} />}

      {!isClothing && domicilio_activo && (
        <div
          style={{
            marginTop: 12,
            padding: "14px 20px",
            borderRadius: 14,
            background: "rgba(27,94,60,.08)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22 }}>🛵</div>
          <div
            style={{
              fontWeight: 600,
              color: "#1B5E3C",
              marginTop: 6,
            }}
          >
            Entrega a domicilio disponible
          </div>
          <div
            style={{
              fontWeight: 600,
              color: "#1B5E3C",
              marginTop: 4,
            }}
          >
            Pide y confirma por WhatsApp
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 8,
        alignItems: "flex-start",
      }}
    >
      <span>{icon}</span>
      <span style={{ fontSize: 14 }}>{text}</span>
    </div>
  );
}
