import { describe, expect, test } from "@jest/globals";
import { getDayFormat } from "../src";

describe("CD Day Test", (): void => {
  test("proper day format", (): void => {
    // expect(getDayFormat()).toBe("2000-01-01 00:00:00");
    expect(getDayFormat(new Date("2000-01-01 00:00:00"))).toBe("2000-01-01 00:00:00");
  });
});
