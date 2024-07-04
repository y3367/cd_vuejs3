module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  // testRegex: "(/__tests__/*.ts)$",
  // testRegex: "(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.[jt]sx?$",
  extensionsToTreatAsEsm: [".ts"]
};
