import { getEstablecimientoBySlug } from "@/services/establecimientoService";
import { notFound } from "next/navigation";
import EstablecimientoInfoCard from "./components/EstablecimientoInfoCard";
import EstablecimientoCartasSection from "./components/EstablecimientoCartasSection";
import EstablecimientoLogo from "./components/EstablecimientoLogo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  const establecimiento = await getEstablecimientoBySlug(slug);

  if (!establecimiento) notFound();

  return (
    /* FONDO EXTERIOR NEGRO */
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* CONTENEDOR MÓVIL */}
      <main
        style={{
          width: "100%",
          maxWidth: 430,
          backgroundColor: "#F8F7F4",
          minHeight: "100vh",
        }}
      >
        {/* HERO */}
        <section
          style={{
            position: "relative",
            height: 240,
            backgroundImage: establecimiento.imagen_ubicacion_url
              ? `url(${establecimiento.imagen_ubicacion_url})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,.55), transparent 40%, rgba(0,0,0,.45))",
            }}
          />

          {/* Header content */}
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

        {/* CONTENT */}
        <section style={{ padding: 16 }}>
          <EstablecimientoInfoCard data={establecimiento} />
          <div style={{ height: 24 }} />
          <EstablecimientoCartasSection cartas={establecimiento.cartas ?? []} />
        </section>
      </main>
    </div>
  );
}
