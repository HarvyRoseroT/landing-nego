import type { EstablishmentType } from "@/types/establecimiento";

const moneyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

export function formatMoney(value: number) {
  return moneyFormatter.format(value);
}

export function formatDistance(distance?: number | null) {
  if (typeof distance !== "number" || Number.isNaN(distance)) {
    return "Distancia no disponible";
  }

  return `${distance.toFixed(distance >= 10 ? 0 : 1)} km`;
}

export function getTypeLabel(type: EstablishmentType) {
  switch (type) {
    case "cafe":
      return "Cafe";
    case "bar":
      return "Bar";
    case "dark_kitchen":
      return "Dark kitchen";
    case "clothing_store":
      return "Tienda de ropa";
    default:
      return "Restaurante";
  }
}

export function getTypeIcon(type: EstablishmentType) {
  switch (type) {
    case "cafe":
      return "CA";
    case "bar":
      return "BA";
    case "dark_kitchen":
      return "DK";
    case "clothing_store":
      return "TR";
    default:
      return "RE";
  }
}
