import { cdLogError } from "./cdLog";

export const setKeyWithEnv = (key: string): string => {
  // @ts-ignore
  return `${import.meta.env?.MODE ?? process.env?.NODE_MODE ?? "development"}_${import.meta.env?.VITE_APP_NAME ?? process.env?.APP_NAME ?? "CD"}_${key}`;
};

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  if (!key || !object || typeof object !== "object") {
    return false;
  }
  return key in object;
}

export const awaitWrap = <E, D = any>(promise: Promise<D>): Promise<[E | undefined, D | undefined]> => {
  return promise.then<[undefined, D]>((data: D) => [undefined, data]).catch<[E, undefined]>((error: E) => [error, undefined]);
};

export const awaitWraps = <E, T = any>(promises: (Promise<any> | T)[], logError: boolean = true): Promise<[E | undefined, any | undefined]> => {
  return Promise.all(
    promises.map((p: PromiseLike<any> | T) => {
      if (isValidKey("then", p as unknown as object)) {
        return (p as Promise<any>).catch((e: E) => {
          logError && cdLogError(e);
        });
      } else {
        return p;
      }
    })
  )
    .then<[undefined, any]>((data: any) => [undefined, data])
    .catch<[E, undefined]>((error: E) => [error, undefined]);
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
