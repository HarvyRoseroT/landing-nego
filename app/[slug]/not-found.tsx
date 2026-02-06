export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 430,
          backgroundColor: "#F8F7F4",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          textAlign: "center",
        }}
      >
        <div>
          <div
            style={{
              width: 72,
              height: 72,
              margin: "0 auto 20px",
              borderRadius: "50%",
              backgroundColor: "#E5E7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            🏪
          </div>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 10,
              color: "#111",
            }}
          >
            Establecimiento no disponible
          </h1>

          <p
            style={{
              fontSize: 14,
              color: "#555",
              lineHeight: 1.6,
              maxWidth: 300,
              margin: "0 auto",
            }}
          >
            El enlace que estás intentando abrir no existe,
            fue eliminado o el establecimiento se encuentra
            temporalmente inactivo.
          </p>
        </div>
      </main>
    </div>
  );
}
