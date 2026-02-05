import Link from "next/link";

interface Carta {
  id: number;
  nombre: string;
}

interface Props {
  cartas: Carta[];
}

export default function EstablecimientoCartasSection({ cartas }: Props) {
  if (!cartas.length) {
    return (
      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: "#fff",
          border: "1px solid rgba(0,0,0,.08)",
        }}
      >
        📖 Este establecimiento no tiene cartas disponibles
      </div>
    );
  }

  return (
    <>
      <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Cartas</h2>

      {cartas.map((carta) => (
        <Link
          key={carta.id}
          href={`/carta/${carta.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 18,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              boxShadow: "0 6px 14px rgba(0,0,0,.04)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "rgba(27,94,60,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              📘
            </div>

            <div style={{ flex: 1, fontWeight: 600 }}>
              {carta.nombre}
            </div>

            <div style={{ fontSize: 24, color: "#bbb" }}>›</div>
          </div>
        </Link>
      ))}
    </>
  );
}
