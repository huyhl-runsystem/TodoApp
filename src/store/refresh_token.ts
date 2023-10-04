export const LocalStorageEventTarget = new EventTarget();

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

const setCookie = (name : string , value : string , expires : Date, path = "/", domain = "") => {
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}; domain=${domain}`;
};

const getCookieValue = (name : string) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return "";
};

export const setAccessTokenCookie = (
    accessToken :string, 
    expirationDays : number
    ) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + expirationDays * ONE_DAY_IN_SECONDS * 1000);
  setCookie("access_token", accessToken, expirationDate);
};

export const clearAccessTokenCookie = () => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() - ONE_DAY_IN_SECONDS * 1000);
  setCookie("access_token", "", expirationDate);
};

export const getAccessTokenFromCookie = () => {
  return getCookieValue("access_token");
};

export const setRefreshTokenToCookie = (refreshToken : string) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  setCookie("refresh_token", refreshToken, expirationDate);
};

export const getRefreshTokenFromCookie = () => {
  return getCookieValue("refresh_token");
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const eqPos = cookie.indexOf("=");
    const cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    setCookie(cookieName, "", new Date(0));
  }
};
