const TOKEN_COOKIE = "token";
const TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const getCookie = (name) => {
  if (typeof document === "undefined") return "";

  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : "";
};

const getCookieToken = () => {
  const cookieNames = [TOKEN_COOKIE, "authToken", "accessToken", "jwt"];

  return cookieNames
    .map((name) => getCookie(name))
    .find(Boolean);
};

const getAuthToken = () => {
  if (typeof localStorage === "undefined") return getCookieToken() || "";

  return localStorage.getItem(TOKEN_COOKIE) || getCookieToken() || "";
};

const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_COOKIE, token);

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(
    token,
  )}; path=/; max-age=${TOKEN_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
};

const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_COOKIE);
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
};

export { getAuthToken, removeAuthToken, setAuthToken };
