import { setKeyWithEnv } from "./cdCommon";

const STORAGE_TYPE_COOKIE: string = "cookie";
const STORAGE_TYPE_LOCALSTORAGE: string = "localStorage";

let save_type = STORAGE_TYPE_LOCALSTORAGE;
if (typeof localStorage === "object") {
  try {
    localStorage.setItem("localStorageTest", "1");
    localStorage.removeItem("localStorageTest");
  } catch (e) {
    save_type = STORAGE_TYPE_COOKIE;
  }
}

const get = (key: string): string | null | undefined => {
  key = setKeyWithEnv(key);
  let val: string | null | undefined = undefined;
  switch (save_type) {
    case STORAGE_TYPE_LOCALSTORAGE:
      val = localStorage.getItem(key);
      break;
    case STORAGE_TYPE_COOKIE:
    // val = cookie.get(key)
  }
  return val;
};

const set = (key: string, val: any): void => {
  key = setKeyWithEnv(key);
  switch (save_type) {
    case STORAGE_TYPE_LOCALSTORAGE:
      localStorage.setItem(key, val);
      break;
    case STORAGE_TYPE_COOKIE:
      // cookie.set(key,val, { expires: 3650, domain:this.getDomain()})
      // cookie.set(key,val, { expires: 3650, domain:'firefox'})
      break;
  }
};

const remove = (key: string): void => {
  key = setKeyWithEnv(key);
  switch (save_type) {
    case STORAGE_TYPE_LOCALSTORAGE:
      localStorage.removeItem(key);
      break;
    case STORAGE_TYPE_COOKIE:
    // val = cookie.get(key)
  }
};

interface CdStorageProps {
  get: Function;
  set: Function;
  remove: Function;
}

export const cdStorage: CdStorageProps = {
  get,
  set,
  remove
};
