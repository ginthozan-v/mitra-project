export const setCookie = ({ name, value, expiry, path = '/' }: { name; value: string; expiry?: number; path?: string }) => {
  // eraseCookie(name);
  let cookie = `${name}=${value};`;
  if (expiry) {
    let date = new Date();
    date.setTime(date.getTime() + expiry * 24 * 60 * 60 * 1000);
    cookie += `expires=${date.toUTCString()};`;
  }
  cookie += `path=${path};`;
  document.cookie = cookie;
};

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};

export const eraseCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}