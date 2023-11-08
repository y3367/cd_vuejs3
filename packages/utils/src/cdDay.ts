import dayjs from "dayjs";

export const getDayFormat = (date?: any, format?: string): string => {
  return dayjs(date).format(format ?? "YYYY-MM-DD HH:mm:ss");
};
