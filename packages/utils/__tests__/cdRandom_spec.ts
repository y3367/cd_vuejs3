import { describe, test } from "@jest/globals";
import { cdLog, nanoid } from "../src";

describe("CD Random Test", (): void => {
  test("proper random nanoid", (): void => {
    cdLog.log([nanoid(), nanoid(32)]);
  });
});
