import type { ChalkInstance } from "chalk";
import chalk from "chalk";

export const cdChalkInstance = (): ChalkInstance => {
  return chalk;
};

export const cdLogChalk = (ci: ChalkInstance, message?: any[], ...optionalParams: any[]) => {
  console.log(ci(message, ...optionalParams));
};

export const cdLog = (message?: any[], ...optionalParams: any[]) => {
  // console.log(message, ...optionalParams);
  const ci: ChalkInstance = cdChalkInstance().green;
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogError = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = cdChalkInstance().bold.red;
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogWarning = (message?: any, ...optionalParams: any[]) => {
  // Orange color
  const ci: ChalkInstance = cdChalkInstance().hex("#FFA500");
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogBlue = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = cdChalkInstance().blue;
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogBlack = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = cdChalkInstance().black;
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogUnderline = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = cdChalkInstance().underline;
  cdLogChalk(ci, message, ...optionalParams);
};
