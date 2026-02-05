import ProductoCard from "./ProductoCard";
import type { Producto } from "@/types/producto";

interface Props {
  nombre: string;
  productos: Producto[];
}

export default function SeccionSection({ nombre, productos }: Props) {
  if (!productos.length) return null;

  return (
    <section style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 1.2,
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
        <ProductoCard key={p.id} producto={p} />
      ))}
    </section>
  );
}
