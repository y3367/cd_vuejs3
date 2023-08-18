import { describe, expect, test } from "@jest/globals";
import { BnAdd, BnFormat } from "../src";

describe("CD BigNumber Test", () => {
  test("proper number format", () => {
    expect(BnFormat("0.938044659618614773")).toBe("0.938044659618614773");
    // eslint-disable-next-line no-loss-of-precision
    expect(BnFormat(0.938044659618614773)).toBe("0.9380446596186147");
  });

  test("proper add numbers", () => {
    expect(BnAdd("1", "2")).toBe("3");
    expect(BnAdd("1.11", "2.22")).toBe("3.33");
    expect(BnAdd("1.11", "2.22", 1, 4)).toBe("3.3");
    expect(BnAdd("1.11", "2.44", 1, 4)).toBe("3.6");
  });
});
