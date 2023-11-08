import { CdLog } from "./cdLog";

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  if (!key || !object || typeof object !== "object") {
    return false;
  }
  return key in object;
}

export const awaitWrap = <E, D = any>(promise: Promise<D>): Promise<[E, D]> => {
  return promise.then<[E, D]>((data: D) => [undefined as unknown as E, data]).catch<[E, D]>((error: E) => [error, undefined as unknown as D]);
};

export const awaitWraps = <E, D = any>(promises: (Promise<D> | D)[], logError: boolean = true): Promise<[E, D[]]> => {
  return Promise.all(
    promises.map((p: PromiseLike<D> | D) => {
      if (isValidKey("then", p as unknown as object)) {
        return (p as Promise<D>).catch((e: E) => {
          logError && CdLog.logError(e);
        });
      } else {
        return p;
      }
    })
  )
    .then<[E, D[]]>((data: any) => [undefined as unknown as E, data])
    .catch<[E, D[]]>((error: E) => [error, undefined as unknown as D[]]);
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
