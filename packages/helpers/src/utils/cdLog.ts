import type { ChalkInstance } from "chalk";
import chalk from "chalk";

export const cdLogChalk = (ci: ChalkInstance, message?: any, ...optionalParams: any[]) => {
  console.log(ci(message, ...optionalParams));
};

export const cdLog = (message?: any, ...optionalParams: any[]) => {
  // console.log(message, ...optionalParams);
  const log: ChalkInstance = chalk.green;
  cdLogChalk(log, message, ...optionalParams);
};

export const cdLogError = (message?: any, ...optionalParams: any[]) => {
  const error: ChalkInstance = chalk.bold.red;
  cdLogChalk(error, message, ...optionalParams);
};

export const cdLogWarning = (message?: any, ...optionalParams: any[]) => {
  // Orange color
  const warning: ChalkInstance = chalk.hex("#FFA500");
  cdLogChalk(warning, message, ...optionalParams);
};

export const cdLogBlue = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = chalk.blue;
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogBlack = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = chalk.black;
  cdLogChalk(ci, message, ...optionalParams);
};

export const cdLogUnderline = (message?: any, ...optionalParams: any[]) => {
  const ci: ChalkInstance = chalk.underline;
  cdLogChalk(ci, message, ...optionalParams);
};
