const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCartaDetalle(cartaId) {
  const res = await fetch(`${API_URL}/app/cartas/${cartaId}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Carta no encontrada");
  }

  return res.json();
}
