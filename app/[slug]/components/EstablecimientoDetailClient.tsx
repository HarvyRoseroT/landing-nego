"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import PedidoSheet from "@/app/carta/components/PedidoSheet";
import { usePersistentOrder } from "@/hooks/usePersistentOrder";
import { buildGeneralCartaQuery } from "@/lib/orderContext";
import EstablecimientoInfoCard from "./EstablecimientoInfoCard";
import EstablecimientoCartasSection from "./EstablecimientoCartasSection";
import type { EstablecimientoDetalle } from "@/types/establecimiento";

interface Props {
  establecimiento: EstablecimientoDetalle;
}

export default function EstablecimientoDetailClient({ establecimiento }: Props) {
  const isClothing = establecimiento.tipo_establecimiento === "clothing_store";
  const canOrder = establecimiento.domicilio_activo && !isClothing;
  const [sheetOpen, setSheetOpen] = useState(false);
  const pedido = usePersistentOrder(establecimiento.id);

  const cartaQuery = buildGeneralCartaQuery({
    establecimientoId: establecimiento.id,
    establecimientoNombre: establecimiento.nombre,
    telefono: establecimiento.telefono_contacto,
    tipo: establecimiento.tipo_establecimiento,
    domicilioActivo: establecimiento.domicilio_activo,
  });

  return (
    <section style={{ padding: 16 }}>
      <EstablecimientoInfoCard data={establecimiento} />

      {canOrder && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          {establecimiento.cartas.length ? (
            <button onClick={() => setSheetOpen(true)} style={deliveryStyle}>
              Ver pedido a domicilio
            </button>
          ) : null}

          {!establecimiento.cartas.length ? (
            <div style={disabledStyle}>No hay cartas disponibles para pedido.</div>
          ) : null}
        </div>
      )}

      <div style={{ height: 24 }} />
      <EstablecimientoCartasSection
        cartas={establecimiento.cartas}
        queryString={cartaQuery}
      />

      {canOrder ? (
        <PedidoSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          establecimientoNombre={establecimiento.nombre}
          telefono={establecimiento.telefono_contacto}
          items={pedido.items}
          total={pedido.total}
          onIncrease={pedido.increase}
          onDecrease={pedido.decrease}
          onRemove={pedido.remove}
        />
      ) : null}
    </section>
  );
}

const baseButtonStyle: CSSProperties = {
  display: "block",
  width: "100%",
  textDecoration: "none",
  textAlign: "center",
  padding: "16px 18px",
  borderRadius: 16,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};

const deliveryStyle: CSSProperties = {
  ...baseButtonStyle,
  background: "#1B5E3C",
  color: "#fff",
};

const disabledStyle: CSSProperties = {
  ...baseButtonStyle,
  background: "rgba(0,0,0,.08)",
  color: "#666",
};
