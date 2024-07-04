// https://jestjs.io/docs/getting-started
module.exports = {
  // preset: "ts-jest",
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@cd-vuejs3/(.*)$": "<rootDir>/packages/$1/src"
  }
};
