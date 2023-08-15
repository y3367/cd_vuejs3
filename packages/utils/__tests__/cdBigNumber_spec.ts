import { describe, expect, test } from "@jest/globals";
import { BnAdd } from "../src/cdBigNumber";

// jest.useFakeTimers();
describe("My First Test", () => {
  test("can add numbers", () => {
    expect(BnAdd("1", "2")).toBe("3");
  });
});
