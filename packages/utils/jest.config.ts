import { jest } from "@jest/globals";

// jest.useRealTimers();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"]
};
