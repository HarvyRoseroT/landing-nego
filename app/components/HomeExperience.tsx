"use client";

import { useEffect, useState } from "react";
import NearbyEstablishmentCard from "@/app/components/NearbyEstablishmentCard";
import { saveUserLocation } from "@/lib/locationStorage";
import { getEstablecimientosCercanos } from "@/services/api";
import type {
  EstablecimientoCercano,
  UserLocation,
} from "@/types/establecimiento";

type GeoState = "idle" | "loading" | "error" | "ready";

export default function HomeExperience() {
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [message, setMessage] = useState(
    "Necesitamos tu ubicacion para mostrar establecimientos cercanos."
  );
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [items, setItems] = useState<EstablecimientoCercano[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);

  useEffect(() => {
    void requestLocation();
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }

    const currentLocation = location;
    let active = true;

    async function loadNearby() {
      setLoadingItems(true);
      setItemsError(null);

      try {
        const response = await getEstablecimientosCercanos(
          currentLocation.lat,
          currentLocation.lng
        );
        if (!active) {
          return;
        }
        setItems(response);
      } catch {
        if (!active) {
          return;
        }
        setItemsError("No pudimos cargar establecimientos cercanos en este momento.");
      } finally {
        if (active) {
          setLoadingItems(false);
        }
      }
    }

    void loadNearby();

    return () => {
      active = false;
    };
  }, [location]);

  async function requestLocation() {
    if (!navigator.geolocation) {
      setGeoState("error");
      setMessage("Tu navegador no soporta geolocalizacion.");
      return;
    }

    setGeoState("loading");
    setMessage("Obteniendo tu ubicacion...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        saveUserLocation(nextLocation);
        setLocation(nextLocation);
        setGeoState("ready");
        setMessage("Ubicacion lista.");
      },
      () => {
        setGeoState("error");
        setMessage(
          "Activa la ubicacion para mostrar establecimientos cercanos y calcular rutas."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  return (
    <>
      <section className="px-6 pt-8 pb-6">
        <img src="/logo_nego.png" alt="Nego Logo" className="h-10 w-auto" />
        <div className="mt-8 rounded-[28px] border border-white/10 bg-neutral-900 p-6 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-green-400">
            Nego mobile web
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-white">
            Explora negocios cercanos desde tu navegador
          </h1>
          <p className="mt-4 text-sm leading-6 text-neutral-300">
            Usa tu ubicacion para ver restaurantes, cafes, bares, dark kitchens y
            tiendas de ropa activas en tu zona.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => void requestLocation()}
              className="rounded-2xl bg-green-500 px-5 py-4 text-base font-bold text-black"
            >
              {geoState === "loading" ? "Obteniendo ubicacion..." : "Usar mi ubicacion"}
            </button>
            <a
              href="https://panel.nego.ink"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 px-5 py-4 text-center text-sm font-semibold text-white"
            >
              Iniciar sesion
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="rounded-[24px] border border-white/8 bg-neutral-900/80 p-5">
          <h2 className="text-lg font-bold text-white">Establecimientos cercanos</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-300">{message}</p>

          {geoState === "error" ? (
            <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
              La ubicacion es necesaria para cargar negocios cercanos.
              <button
                onClick={() => void requestLocation()}
                className="mt-4 block w-full rounded-xl bg-amber-300 px-4 py-3 font-semibold text-black"
              >
                Reintentar
              </button>
            </div>
          ) : null}

          {loadingItems ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-neutral-300">
              Cargando establecimientos cercanos...
            </div>
          ) : null}

          {itemsError ? (
            <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
              {itemsError}
            </div>
          ) : null}

          {!loadingItems && !itemsError && geoState === "ready" && items.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-neutral-300">
              No encontramos establecimientos activos cerca de tu ubicacion.
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-4">
            {items.map((item) => (
              <NearbyEstablishmentCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
