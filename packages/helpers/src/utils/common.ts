import { cdLogError } from "./cdLog";

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  if (!key || !object || typeof object !== "object") {
    return false;
  }
  return key in object;
}

export const awaitWrap = <E, D = any>(promise: Promise<D>): Promise<[E | undefined, D | undefined]> => {
  return promise.then<[undefined, D]>((data: D) => [undefined, data]).catch<[E, undefined]>((error: E) => [error, undefined]);
};

export const awaitWraps = <E, T = any>(promises: (Promise<any> | T)[]): Promise<[E | undefined, any | undefined]> => {
  return Promise.all(
    promises.map((p: PromiseLike<any> | T) => {
      if (isValidKey("then", p as unknown as object)) {
        return (p as Promise<any>).catch((e: E) => {
          cdLogError(e);
        });
      } else {
        return p;
      }
    })
  )
    .then<[undefined, any]>((data: any) => [undefined, data])
    .catch<[E, undefined]>((error: E) => [error, undefined]);
};

export const setKeyWithEnv = (key: string): string => {
  // @ts-ignore
  return import.meta.env.MODE + "_" + import.meta.env.VITE_APP_NAME + "_" + key;
};

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

export const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

export const nanoid = (size = 21) => {
  let id = "";
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};

export const fileToHump = function (fileName: string): string {
  const index = fileName.lastIndexOf(".");
  if (index > 0) {
    fileName = fileName.slice(0, index);
  }
  const fileNameArr = fileName.replace(/\\/g, "/").split("/");
  if (fileNameArr[fileNameArr.length - 1] === "index" || fileNameArr[fileNameArr.length - 1] === "Index") {
    fileNameArr.pop();
  }
  for (let i = 1, len = fileNameArr.length; i < len; i++) {
    fileNameArr[i] = fileNameArr[i].slice(0, 1).toUpperCase() + fileNameArr[i].slice(1);
  }
  return fileNameArr.join("");
};

export const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};
