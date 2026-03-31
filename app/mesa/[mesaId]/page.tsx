import Link from "next/link";
import MobileShell from "@/app/components/MobileShell";

interface PageProps {
  params: Promise<{ mesaId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { mesaId } = await params;

  return <MesaDisabledState mesaId={mesaId} />;
}

function MesaDisabledState({
  mesaId,
}: {
  mesaId?: string;
}) {
  const href = mesaId ? `/mesa/${mesaId}` : "/";

  return (
    <MobileShell>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: 24,
            background: "#fff",
            padding: 24,
            textAlign: "center",
            boxShadow: "0 14px 28px rgba(0,0,0,.08)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 24 }}>Pedido en mesa desactivado</h1>
          <p style={{ margin: "10px 0 0", color: "#4b5563", lineHeight: 1.45 }}>
            Este flujo por QR esta deshabilitado temporalmente. Usa la carta general
            o vuelve a intentar mas adelante.
          </p>
          <Link
            href={href}
            style={{
              display: "inline-block",
              marginTop: 18,
              borderRadius: 999,
              background: "#111827",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 18px",
              fontWeight: 700,
            }}
          >
            Volver
          </Link>
        </div>
      </section>
    </MobileShell>
  );
}
