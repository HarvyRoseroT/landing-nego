const APP_USER_ID_KEY = "nego-app-user-id";

export function getOrCreateGuestAppUserId() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(APP_USER_ID_KEY);

  if (stored) {
    const parsed = Number(stored);

    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  const generated = Date.now();
  window.localStorage.setItem(APP_USER_ID_KEY, String(generated));
  return generated;
}
