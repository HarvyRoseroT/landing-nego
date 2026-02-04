"use client";

export default function HomePage() {
  const goPlayStore = () => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=TU_APP_ID";
  };

  const goAppStore = () => {
    window.location.href = "https://apps.apple.com/app/TU_APP_ID";
  };

  const goWebMenu = () => {
    window.location.href = "https://nego.ink";
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Nego</h1>
          <p className="text-neutral-400 text-lg">
            Elige cómo quieres ver la carta
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={goPlayStore}
            className="w-full rounded-2xl bg-white text-black py-5 text-lg font-semibold active:scale-95 transition"
          >
            Descargar en Google Play
          </button>

          <button
            onClick={goAppStore}
            className="w-full rounded-2xl bg-white text-black py-5 text-lg font-semibold active:scale-95 transition"
          >
            Descargar en App Store
          </button>

          <button
            onClick={goWebMenu}
            className="w-full rounded-2xl border border-neutral-700 py-5 text-lg font-semibold active:scale-95 transition"
          >
            Ver carta en la web
          </button>
        </div>
      </div>
    </main>
  );
}
