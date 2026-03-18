import { notFound } from "next/navigation";
import MobileShell from "@/app/components/MobileShell";
import CartaClientPage from "@/app/carta/components/CartaClientPage";
import { getCartaDetalle } from "@/services/api";
import type { CartaDetalle, Seccion } from "@/types/carta";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;

  if (!id) {
    notFound();
  }

  const carta = (await getCartaDetalle(id)) as CartaDetalle | null;

  if (!carta) {
    notFound();
  }

  const secciones: Seccion[] = carta.secciones ?? [];

  return (
    <MobileShell>
      <CartaClientPage carta={carta} secciones={secciones} searchParams={query} />
    </MobileShell>
  );
}
