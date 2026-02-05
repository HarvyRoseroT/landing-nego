const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEstablecimientoBySlug(slug) {
  const res = await fetch(`${API_URL}/establecimientos/slug/${slug}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Establecimiento no encontrado");
  }

  return res.json();
}
