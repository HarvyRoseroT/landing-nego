import { notFound } from "next/navigation";
import { getCartaDetalle } from "@/services/cartaService";
import SeccionSection from "../components/SeccionSection";
import CartaHeader from "../components/CartaHeader";
import type { CartaDetalle, Seccion } from "@/types/carta";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) notFound();

  const carta = (await getCartaDetalle(id)) as CartaDetalle;

  if (!carta) notFound();

  const secciones: Seccion[] = carta.secciones ?? [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          backgroundColor: "#F8F7F4",
        }}
      >
        {/* HEADER CON BACK */}
        <CartaHeader titulo={carta.nombre} />

        {/* BODY */}
        {secciones.length === 0 ? (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              color: "#777",
            }}
          >
            Esta carta no tiene secciones disponibles
          </div>
        ) : (
          <div style={{ padding: "24px 20px 32px" }}>
            {secciones.map((seccion) => (
              <SeccionSection
                key={seccion.id}
                nombre={seccion.nombre}
                productos={seccion.productos ?? []}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
