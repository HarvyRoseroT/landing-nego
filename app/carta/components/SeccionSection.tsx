import ProductoCard from "./ProductoCard";
import type { Producto } from "@/types/producto";

interface Props {
  nombre: string;
  productos: Producto[];
  canAdd?: boolean;
  getQuantity?: (productoId: number) => number;
  onAdd?: (producto: Producto) => void;
  onIncrease?: (productoId: number) => void;
  onDecrease?: (productoId: number) => void;
}

export default function SeccionSection({
  nombre,
  productos,
  canAdd = false,
  getQuantity,
  onAdd,
  onIncrease,
  onDecrease,
}: Props) {
  if (!productos.length) return null;

  return (
    <section style={{ marginBottom: 32 }}>
      <h2
        style={{
          margin: 0,
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 1.2,
          color: "#111827",
        }}
      >
        {nombre.toUpperCase()}
      </h2>

      <div
        style={{
          width: 60,
          height: 3,
          background: "#1B5E3C",
          borderRadius: 2,
          margin: "6px 0 18px",
        }}
      />

      {productos.map((p) => (
        <ProductoCard
          key={p.id}
          producto={p}
          canAdd={canAdd}
          quantity={getQuantity?.(p.id) ?? 0}
          onAdd={onAdd}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </section>
  );
}
