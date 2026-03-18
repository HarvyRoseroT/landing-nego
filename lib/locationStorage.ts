import type { UserLocation } from "@/types/establecimiento";

const USER_LOCATION_KEY = "nego-user-location";

export function saveUserLocation(location: UserLocation) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location));
}

export function readUserLocation(): UserLocation | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(USER_LOCATION_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as UserLocation;
    if (typeof parsed.lat === "number" && typeof parsed.lng === "number") {
      return parsed;
    }
  } catch {}

  return null;
}
