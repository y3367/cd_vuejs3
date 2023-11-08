import { describe, expect, test } from "@jest/globals";
import { awaitWrap, awaitWraps, fileToHump, isValidKey } from "../src";

const testSuccessFunction = async (x: any): Promise<any> => {
  return x;
};

const testFailFunction = async (x: any): Promise<any> => {
  throw Error(x);
};

describe("CD Common Test", (): void => {
  test("proper validKey", (): void => {
    expect(isValidKey("key1", { key1: "value1", key2: "value2" })).toBe(true);
    expect(isValidKey("key0", { key1: "value1", key2: "value2" })).toBe(false);
  });

  test("proper awaitWrap", async (): Promise<void> => {
    expect(await awaitWrap(testSuccessFunction(1))).toStrictEqual([undefined, 1]);
    expect(await awaitWrap(testSuccessFunction("success"))).toStrictEqual([undefined, "success"]);
    expect(await awaitWrap(testFailFunction("test failed"))).toStrictEqual([new Error("test failed"), undefined]);
  });

  test("proper awaitWraps", async (): Promise<void> => {
    expect(await awaitWraps([testSuccessFunction(1)])).toStrictEqual([undefined, [1]]);
    expect(await awaitWraps([testSuccessFunction(1), testSuccessFunction("success")])).toStrictEqual([undefined, [1, "success"]]);
    expect(await awaitWraps([testSuccessFunction("success"), testSuccessFunction(1), "123"])).toStrictEqual([undefined, ["success", 1, "123"]]);
    expect(await awaitWraps([testSuccessFunction("success"), testFailFunction("test failed"), testSuccessFunction(1), "567"])).toStrictEqual([undefined, ["success", undefined, 1, "567"]]);
    expect(await awaitWraps([testFailFunction("test failed"), testFailFunction("test failed again")], false)).toStrictEqual([undefined, [undefined, undefined]]);
  });

  test("proper fileToHump", (): void => {
    expect(fileToHump("/path0/path1/Path2")).toStrictEqual("Path0Path1Path2");
    expect(fileToHump("./path0/path1/Path2")).toStrictEqual(".Path0Path1Path2");
    expect(fileToHump("/path0/path1/Path2.png")).toStrictEqual("Path0Path1Path2");
    expect(fileToHump("./path0/path1/Path2.png")).toStrictEqual(".Path0Path1Path2");
  });
});
