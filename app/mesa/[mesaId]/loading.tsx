import MobileShell from "@/app/components/MobileShell";

export default function Loading() {
  return (
    <MobileShell>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: 24,
            background: "#fff",
            padding: 24,
            textAlign: "center",
            boxShadow: "0 14px 28px rgba(0,0,0,.08)",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700 }}>Cargando mesa...</div>
          <p style={{ margin: "10px 0 0", color: "#6b7280" }}>
            Estamos preparando el contexto del pedido por QR.
          </p>
        </div>
      </section>
    </MobileShell>
  );
}
