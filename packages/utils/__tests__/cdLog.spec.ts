import { describe, test } from "@jest/globals";
import { cdLog } from "../src";

describe("CD Log Test", (): void => {
  test("proper log", (): void => {
    cdLog.log("test log");
    cdLog.log(["test log0", "test log1"]);
    cdLog.logError("test log error");
  });

  test("proper log with params", (): void => {
    cdLog.log(["test log0 [%s]", "test log1 [%s]"], { chalkParams: ["test0", "test1"] });
    cdLog.log(["test log0 [%s]", "test log1 [%s]"], { logParams: ["test0", "test1"] });
    cdLog.log("test log [%s]", { chalkParams: ["test"] });
    cdLog.log("test log [%s]", { logParams: ["test"] });
  });

  test("proper log custom", (): void => {
    console.log(cdLog.chalkInstance().red.underline.bold("test log custom"));
  });
});
