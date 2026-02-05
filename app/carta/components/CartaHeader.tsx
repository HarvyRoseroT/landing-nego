"use client";

import { useRouter } from "next/navigation";

interface Props {
  titulo: string;
}

export default function CartaHeader({ titulo }: Props) {
  const router = useRouter();

  return (
    <header
      style={{
        padding: "14px 16px",
        backgroundColor: "#F8F7F4",
        borderBottom: "1px solid rgba(0,0,0,.05)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* BOTÓN VOLVER */}
      <button
        onClick={() => router.back()}
        aria-label="Volver"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "none",
          background: "rgba(27,94,60,.1)",
          color: "#1B5E3C",
          fontSize: 20,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ←
      </button>

      {/* TÍTULO */}
      <h1
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 0.6,
          color: "#1B5E3C",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {titulo}
      </h1>
    </header>
  );
}
