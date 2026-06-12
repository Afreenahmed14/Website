/**
 * Api.js — Firebase-only API layer for HourlyRecruit
 * All Spring Boot / JWT backend code has been removed.
 * Authentication is handled by Firebase Auth.
 * Data is stored in Firestore via Datastore.js.
 */

// ── Token helpers (kept for compatibility, but Firebase Auth manages sessions) ──

export function getAccessToken() {
  return sessionStorage.getItem("hr_access_token") || null;
}

export function clearTokens() {
  sessionStorage.removeItem("hr_access_token");
  sessionStorage.removeItem("hr_refresh_token");
  sessionStorage.removeItem("hr_admin_auth");
}

// ── fetchSiteSettings: reads from Firestore via Datastore ──────────────────
// This is a no-op stub kept so existing import statements don't break.
// The actual data loading is done by getData() in Datastore.js directly.
export async function fetchSiteSettings() {
  // Data is fetched in Datastore.getData() using Firebase.
  // Return null so App.jsx skips the merge — App.jsx now calls getData() directly.
  return null;
}