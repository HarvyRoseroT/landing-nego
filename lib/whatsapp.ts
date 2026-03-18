import { formatMoney } from "@/lib/format";
import type { PedidoProducto } from "@/types/pedido";

interface BuildWhatsappMessageParams {
  nombreEstablecimiento: string;
  items: PedidoProducto[];
  total: number;
}

export function buildWhatsappMessage({
  nombreEstablecimiento,
  items,
  total,
}: BuildWhatsappMessageParams) {
  const lines = items.map(
    (item) =>
      `- ${item.nombre} x${item.cantidad} (${formatMoney(
        item.precio * item.cantidad
      )})`
  );

  return [
    `Hola ${nombreEstablecimiento}, quiero confirmar este pedido a domicilio:`,
    "",
    ...lines,
    "",
    `Total productos: ${formatMoney(total)}`,
    "Entiendo que el costo del domicilio no esta incluido y se confirma por este medio.",
  ].join("\n");
}

export function buildWhatsappUrl(phone: string, message: string) {
  const sanitizedPhone = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}
