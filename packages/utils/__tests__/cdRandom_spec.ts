import { describe, test } from "@jest/globals";
import { CdLog, nanoid } from "../src";

describe("CD Random Test", (): void => {
  test("proper random nanoid", (): void => {
    CdLog.log([nanoid(), nanoid(32)]);
  });
});
