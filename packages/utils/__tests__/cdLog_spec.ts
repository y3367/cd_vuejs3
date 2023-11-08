import { describe, test } from "@jest/globals";
import { CdLog } from "../src";

describe("CD Log Test", (): void => {
  test("proper log", (): void => {
    CdLog.log("test log");
    CdLog.log(["test log0", "test log1"]);
    CdLog.logError("test log error");
  });

  test("proper log with params", (): void => {
    CdLog.log(["test log0 [%s]", "test log1 [%s]"], { chalkParams: ["test0", "test1"] });
    CdLog.log(["test log0 [%s]", "test log1 [%s]"], { logParams: ["test0", "test1"] });
    CdLog.log("test log [%s]", { chalkParams: ["test"] });
    CdLog.log("test log [%s]", { logParams: ["test"] });
  });

  test("proper log custom", (): void => {
    console.log(CdLog.chalkInstance().red.underline.bold("test log custom"));
  });
});
