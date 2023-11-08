import { describe, expect, test } from "@jest/globals";
import { CdLog, getDomain, isExternal, isUri } from "../src";

describe("CD URI Test", (): void => {
  test("proper domain", (): void => {
    CdLog.log(getDomain());
  });

  test("proper check external", (): void => {
    expect(isExternal("https://www.google.com")).toBe(true);
    expect(isExternal("www.google.com")).toBe(false);
  });

  test("proper check uri", (): void => {
    expect(isUri("https://www.google.com")).toBe(true);
    expect(isUri("www.google.com")).toBe(false);
  });
});
