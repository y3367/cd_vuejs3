module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  // testRegex: "(/__tests__/.*\\.spec\\.ts)$",
  extensionsToTreatAsEsm: [".ts"]
};
