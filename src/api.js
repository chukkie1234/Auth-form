const BASE_URL = "https://task-79s6.onrender.com";
const TOKEN_KEY = "nexoraAccessToken";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the SmartHub server. Please try again.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || data?.status === false) {
    const message =
      data?.message ||
      data?.errors?.[0] ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

export function registerAccount(payload) {
  return apiRequest("/api/auth/register", { method: "POST", body: payload });
}

export function verifyEmail(token) {
  return apiRequest("/api/auth/verify-email", { method: "POST", body: { token } });
}

export function resendVerification(email) {
  return apiRequest("/api/auth/resend-verification", {
    method: "POST",
    body: { email },
  });
}

export function loginAccount(identifier, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: { identifier, password },
  });
}

export function logoutAccount() {
  return apiRequest("/api/auth/logout", { method: "POST", body: {} });
}

export function forgotPassword(email) {
  return apiRequest("/api/auth/forgot-password", { method: "POST", body: { email } });
}

export function resetPassword(token, newPassword) {
  return apiRequest("/api/auth/reset-password", {
    method: "POST",
    body: { token, newPassword },
  });
}

export function getCurrentUser() {
  return apiRequest("/api/auth/me", { auth: true });
}

export function updateProfile(payload) {
  return apiRequest("/api/auth/profile", { method: "PUT", auth: true, body: payload });
}
