export interface PedidoProducto {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagenUrl?: string | null;
  marca?: string | null;
  talla?: string | null;
  notas?: string | null;
}
