"use client";

import { useState } from "react";

interface Props {
  logoUrl?: string | null;
}

export default function EstablecimientoLogo({ logoUrl }: Props) {
  const [error, setError] = useState(false);

  const primaryColor = "#1B5E3C";

  return (
    <div
      style={{
        width: 74,
        height: 74,
        padding: 3,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 6px 12px rgba(0,0,0,.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: `1.5px solid rgba(27,94,60,.25)`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        {logoUrl && !error ? (
          <img
            src={logoUrl}
            alt="Logo establecimiento"
            onError={() => setError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span style={{ fontSize: 32 }}>🏪</span>
        )}
      </div>
    </div>
  );
}
