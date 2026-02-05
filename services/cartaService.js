// services/cartaService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCartaDetalle(cartaId) {
  const res = await fetch(`${API_URL}/cartas/${cartaId}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Error backend (${res.status})`);
  }

  return res.json();
}