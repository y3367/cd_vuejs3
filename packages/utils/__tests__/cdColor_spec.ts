import { describe, expect, test } from "@jest/globals";
import { getColorLuma, mixColor } from "../src";

describe("CD Color Test", (): void => {
  test("proper mixColor", (): void => {
    expect(mixColor("#ABCDEF", "#FEDCBA", 1)).toBe("#fedcba");
    expect(mixColor("#ABCDEF", "#FEDCBA", 0.8)).toBe("#edd9c5");
    expect(mixColor("#ABCDEF", "#FEDCBA", 0.5)).toBe("#d5d5d5");
    expect(mixColor("#ABCDEF", "#FEDCBA", 0.3)).toBe("#c4d2df");
    expect(mixColor("#ABCDEF", "#FEDCBA", 0.1)).toBe("#b3cfea");
    expect(mixColor("#ABCDEF", "#FEDCBA", 0)).toBe("171,205,239");
  });

  test("proper colorLuma", (): void => {
    expect(getColorLuma("#000000")).toBe(0);
    expect(getColorLuma("#FFFFFF")).toBe(255);
    expect(getColorLuma("#ABCDEF")).toBe(198.71);
    expect(getColorLuma("#FEDCBA")).toBe(226.29);
  });
});
