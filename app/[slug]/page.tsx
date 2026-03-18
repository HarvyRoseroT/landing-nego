import { notFound } from "next/navigation";
import MobileShell from "@/app/components/MobileShell";
import { getEstablecimientoBySlug } from "@/services/api";
import EstablecimientoLogo from "./components/EstablecimientoLogo";
import EstablecimientoDetailClient from "./components/EstablecimientoDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const establecimiento = await getEstablecimientoBySlug(slug);

  if (!establecimiento) {
    notFound();
  }

  return (
    <MobileShell>
      <section
        style={{
          position: "relative",
          height: 240,
          backgroundImage: establecimiento.imagen_ubicacion_url
            ? `url(${establecimiento.imagen_ubicacion_url})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1f2937",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.55), transparent 40%, rgba(0,0,0,.45))",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            display: "flex",
            gap: 12,
            alignItems: "flex-end",
          }}
        >
          <EstablecimientoLogo logoUrl={establecimiento.logo_url} />

          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,.6)",
            }}
          >
            {establecimiento.nombre}
          </h1>
        </div>
      </section>

      <EstablecimientoDetailClient establecimiento={establecimiento} />
    </MobileShell>
  );
}
