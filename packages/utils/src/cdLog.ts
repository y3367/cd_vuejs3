import type { ChalkInstance } from "chalk";
import chalk from "chalk";

export type LogOptions = {
  chalkParams?: any[];
  logParams?: any[];
};

export const cdChalkInstance = (): ChalkInstance => {
  return chalk;
};

export const cdLogChalk = (ci: ChalkInstance, message?: any, options?: LogOptions) => {
  console.log(ci(message, ...(options?.chalkParams ?? [])), ...(options?.logParams ?? []));
};

export const cdLog = (message?: any, options?: LogOptions) => {
  // console.log(message, ...optionalParams);
  const ci: ChalkInstance = cdChalkInstance().green;
  cdLogChalk(ci, message, options);
};

export const cdLogError = (message?: any, options?: LogOptions) => {
  const ci: ChalkInstance = cdChalkInstance().bold.red;
  cdLogChalk(ci, message, options);
};

export const cdLogWarning = (message?: any, options?: LogOptions) => {
  // Orange color
  const ci: ChalkInstance = cdChalkInstance().hex("#FFA500");
  cdLogChalk(ci, message, options);
};

export const cdLogBlue = (message?: any, options?: LogOptions) => {
  const ci: ChalkInstance = cdChalkInstance().blue;
  cdLogChalk(ci, message, options);
};

export const cdLogBlack = (message?: any, options?: LogOptions) => {
  const ci: ChalkInstance = cdChalkInstance().black;
  cdLogChalk(ci, message, options);
};

export const cdLogUnderline = (message?: any, options?: LogOptions) => {
  const ci: ChalkInstance = cdChalkInstance().underline;
  cdLogChalk(ci, message, options);
};

export interface CdLogProps {
  chalkInstance: typeof cdChalkInstance;
  logChalk: typeof cdLogChalk;
  log: typeof cdLog;
  logSuccess: typeof cdLog;
  logError: typeof cdLogError;
  logWarning: typeof cdLogWarning;
  logBlue: typeof cdLogBlue;
  logBlack: typeof cdLogBlack;
  logUnderline: typeof cdLogUnderline;
}

export const CdLog: CdLogProps = {
  chalkInstance: cdChalkInstance,
  logChalk: cdLogChalk,
  log: cdLog,
  logSuccess: cdLog,
  logError: cdLogError,
  logWarning: cdLogWarning,
  logBlue: cdLogBlue,
  logBlack: cdLogBlack,
  logUnderline: cdLogUnderline
};
