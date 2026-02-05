const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEstablecimientoBySlug(slug) {
  const res = await fetch(
    `${API_URL}/establecimientos/slug/${slug}`,
    { cache: "no-store" }
  );

  // 404 → la page decide el notFound()
  if (res.status === 404) {
    return null;
  }

  // errores reales
  if (!res.ok) {
    throw new Error(`Error backend (${res.status})`);
  }

  return res.json();
}
