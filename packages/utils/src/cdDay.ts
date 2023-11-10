// https://day.js.org/
import dayjs from "dayjs";

/**
 * Create a Day.js object
 */
export const getDayjs = (date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs => {
  return dayjs(date, format, locale, strict);
};

/**
 * Create a Day.js object from a Unix timestamp (10 digits, seconds since the Unix Epoch).
 * @param date
 */
export const getDayjsFromUnix = (date: number): dayjs.Dayjs => {
  return dayjs.unix(date);
};

export const getDayFormat = (date?: dayjs.ConfigType, format?: string): string => {
  return dayjs(date).format(format ?? "YYYY-MM-DD HH:mm:ss");
};

export const toUnix = (date?: dayjs.ConfigType): number => {
  return getDayjs(date).unix();
};

export const addDayjs = (n: number, unit: dayjs.ManipulateType, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjs(date).add(n, unit);
};

export const addMilliseconds = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "milliseconds", date);
};

export const addSeconds = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "seconds", date);
};

export const addMinutes = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "minutes", date);
};

export const addHours = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "hours", date);
};

export const addDays = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "days", date);
};

export const addMonths = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "months", date);
};

export const addYears = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "years", date);
};

export const addWeeks = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return addDayjs(n, "weeks", date);
};

export const subDayjs = (n: number, unit: dayjs.ManipulateType, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjs(date).subtract(n, unit);
};

export const subMilliseconds = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "milliseconds", date);
};

export const subSeconds = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "seconds", date);
};

export const subMinutes = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "minutes", date);
};

export const subHours = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "hours", date);
};

export const subDays = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "days", date);
};

export const subMonths = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "months", date);
};

export const subYears = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "years", date);
};

export const subWeeks = (n: number, date?: dayjs.ConfigType): dayjs.Dayjs => {
  return subDayjs(n, "weeks", date);
};

export const getDayjsBegin = (unit: dayjs.OpUnitType, n: number = 0, addUnit: dayjs.ManipulateType = "days", date?: dayjs.ConfigType): dayjs.Dayjs => {
  const dayjs = n !== 0 ? addDayjs(n, addUnit, date) : getDayjs(date);
  return dayjs.startOf(unit);
};

export const getHourBegin = (n: number = 0, addUnit: dayjs.ManipulateType = "hours", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsBegin("hour", n, addUnit, date);
};

export const getDayBegin = (n: number = 0, addUnit: dayjs.ManipulateType = "days", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsBegin("day", n, addUnit, date);
};

export const getWeekBegin = (n: number = 0, addUnit: dayjs.ManipulateType = "week", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsBegin("week", n, addUnit, date);
};

export const getMonthBegin = (n: number = 0, addUnit: dayjs.ManipulateType = "month", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsBegin("month", n, addUnit, date);
};

export const getYearBegin = (n: number = 0, addUnit: dayjs.ManipulateType = "years", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsBegin("year", n, addUnit, date);
};

export const getDayjsEnd = (unit: dayjs.OpUnitType, n: number = 0, addUnit: dayjs.ManipulateType = "days", date?: dayjs.ConfigType): dayjs.Dayjs => {
  const dayjs = n !== 0 ? addDayjs(n, addUnit, date) : getDayjs(date);
  return dayjs.endOf(unit);
};

export const getHourEnd = (n: number = 0, addUnit: dayjs.ManipulateType = "hours", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsEnd("hour", n, addUnit, date);
};

export const getDayEnd = (n: number = 0, addUnit: dayjs.ManipulateType = "days", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsEnd("day", n, addUnit, date);
};

export const getWeekEnd = (n: number = 0, addUnit: dayjs.ManipulateType = "week", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsEnd("week", n, addUnit, date);
};

export const getMonthEnd = (n: number = 0, addUnit: dayjs.ManipulateType = "month", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsEnd("month", n, addUnit, date);
};

export const getYearEnd = (n: number = 0, addUnit: dayjs.ManipulateType = "years", date?: dayjs.ConfigType): dayjs.Dayjs => {
  return getDayjsEnd("year", n, addUnit, date);
};

interface CdDayProps {
  getDayjs: typeof getDayjs;
  getDayjsFromUnix: typeof getDayjsFromUnix;
  getDayFormat: typeof getDayFormat;
  format: typeof getDayFormat;
  toUnix: typeof toUnix;

  add: typeof addDayjs;
  addDayjs: typeof addDayjs;
  addMilliseconds: typeof addMilliseconds;
  addSeconds: typeof addSeconds;
  addMinutes: typeof addMinutes;
  addHours: typeof addHours;
  addDays: typeof addDays;
  addMonths: typeof addMonths;
  addYears: typeof addYears;
  addWeeks: typeof addWeeks;

  sub: typeof subDayjs;
  subDayjs: typeof subDayjs;
  subMilliseconds: typeof subMilliseconds;
  subSeconds: typeof subSeconds;
  subMinutes: typeof subMinutes;
  subHours: typeof subHours;
  subDays: typeof subDays;
  subMonths: typeof subMonths;
  subYears: typeof subYears;
  subWeeks: typeof subWeeks;

  getBegin: typeof getDayjsBegin;
  getDayjsBegin: typeof getDayjsBegin;
  getHourBegin: typeof getHourBegin;
  getDayBegin: typeof getDayBegin;
  getWeekBegin: typeof getWeekBegin;
  getMonthBegin: typeof getMonthBegin;
  getYearBegin: typeof getYearBegin;

  getEnd: typeof getDayjsEnd;
  getDayjsEnd: typeof getDayjsEnd;
  getHourEnd: typeof getHourEnd;
  getDayEnd: typeof getDayEnd;
  getWeekEnd: typeof getWeekEnd;
  getMonthEnd: typeof getMonthEnd;
  getYearEnd: typeof getYearEnd;
}

export const cdDay: CdDayProps = {
  getDayjs,
  getDayjsFromUnix,
  getDayFormat,
  format: getDayFormat,
  toUnix,

  add: addDayjs,
  addDayjs,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
  addWeeks,

  sub: subDayjs,
  subDayjs,
  subMilliseconds,
  subSeconds,
  subMinutes,
  subHours,
  subDays,
  subMonths,
  subYears,
  subWeeks,

  getBegin: getDayjsBegin,
  getDayjsBegin,
  getHourBegin,
  getDayBegin,
  getWeekBegin,
  getMonthBegin,
  getYearBegin,

  getEnd: getDayjsEnd,
  getDayjsEnd,
  getHourEnd,
  getDayEnd,
  getWeekEnd,
  getMonthEnd,
  getYearEnd
};
