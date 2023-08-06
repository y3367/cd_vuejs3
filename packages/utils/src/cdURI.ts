export const isIp = (host: string): boolean => {
  return /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/.test(host);
};

export const getDomain = (): string => {
  // eslint-disable-next-line no-restricted-globals
  let host: string = window.location.host;
  if (!isIp(host)) {
    const topDomain = host.match(/[\w-]+\.[\w]{2,3}$/g);
    topDomain && (host = topDomain[0]);
  }
  return host;
};

export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export const isUri = (path: string) => {
  const reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
  return reg.test(path);
};
