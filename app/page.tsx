"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* NAV SIMPLE */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <img src="/logo_nego.png" alt="Nego Logo" className="h-10 w-auto" />
        <a
          href="https://panel.nego.ink"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-lg transition"
        >
          Iniciar sesión
        </a>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Digitaliza tu restaurante <br />
          <span className="text-green-400">y vende más</span>
        </h1>

        <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-12">
          Aumenta tus ventas, recibe pedidos por WhatsApp y gestiona tu carta digital
          sin comisiones altas ni depender de otras empresas.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          

          <a
            href="https://play.google.com/store/apps/details?id=com.hasaroo.nego"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            App para clientes
          </a>
        </div>

        
      </section>

      

      {/* BENEFICIOS */}
      <section className="bg-neutral-900 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

          <div className="p-6 rounded-xl bg-neutral-800 border border-white/10">
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Aumenta tus ventas
            </h3>
            <p className="text-neutral-300 text-sm">
              Optimiza tu carta y facilita el pedido para vender más.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-800 border border-white/10">
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Pedidos por WhatsApp
            </h3>
            <p className="text-neutral-300 text-sm">
              Recibe pedidos directos sin intermediarios.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-800 border border-white/10">
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Sin comisiones altas
            </h3>
            <p className="text-neutral-300 text-sm">
              Tú conservas el 100% de tus ingresos.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-800 border border-white/10">
            <h3 className="text-lg font-bold text-green-400 mb-2">
              Independencia total
            </h3>
            <p className="text-neutral-300 text-sm">
              No dependas de plataformas externas.
            </p>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Control total. Más ventas. Más ganancias.
        </h2>

        <p className="text-neutral-400 mb-10">
          Empieza hoy con Nego y transforma tu restaurante.
        </p>

        <a
          href="https://panel.nego.ink"
          className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-5 rounded-xl text-xl transition-all duration-300 shadow-xl hover:scale-105"
        >
          Comenzar ahora
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Links legales */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">

            <a
              href="https://panel.nego.ink/legal/privacidad"
              className="group p-6 rounded-xl bg-neutral-900 border border-white/5 hover:border-green-500/40 transition-all duration-300 hover:bg-neutral-800"
            >
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition">
                Política de Privacidad
              </h3>
              <p className="text-neutral-400 text-sm">
                Cómo protegemos y tratamos tus datos.
              </p>
            </a>

            <a
              href="https://panel.nego.ink/legal/terminos"
              className="group p-6 rounded-xl bg-neutral-900 border border-white/5 hover:border-green-500/40 transition-all duration-300 hover:bg-neutral-800"
            >
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition">
                Términos y Condiciones
              </h3>
              <p className="text-neutral-400 text-sm">
                Reglas y condiciones de uso de la plataforma.
              </p>
            </a>

            <a
              href="https://panel.nego.ink/legal/pagos"
              className="group p-6 rounded-xl bg-neutral-900 border border-white/5 hover:border-green-500/40 transition-all duration-300 hover:bg-neutral-800"
            >
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition">
                Política de Pagos
              </h3>
              <p className="text-neutral-400 text-sm">
                Información sobre planes y facturación.
              </p>
            </a>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6 text-center text-neutral-500 text-sm">
            © {new Date().getFullYear()} Nego. Todos los derechos reservados.
          </div>

        </div>
      </footer>

    </main>
  );
}