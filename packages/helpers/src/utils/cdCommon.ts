/**
 * Return `env.MODE + env.VITE_APP_NAME + key`;
 * And converts all the alphabetic characters in a string to uppercase.
 * @param key
 * @return string
 */
export const setKeyWithEnv = (key: string): string => {
  // @ts-ignore
  // return `${import.meta.env?.MODE ?? process.env?.NODE_MODE ?? "development"}_${import.meta.env?.VITE_APP_NAME ?? process.env?.APP_NAME ?? "CD"}_${key}`;
  return `${import.meta.env?.MODE ?? "development"}_${import.meta.env?.VITE_APP_NAME ?? "CD"}_${key}`.toUpperCase();
};
