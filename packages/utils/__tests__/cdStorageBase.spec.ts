import { describe, expect, test } from "@jest/globals";
import { cdStorageBase } from "../src";

describe("CD StorageBase Test", (): void => {
  test("proper storage", (): void => {
    const storageKey = "test_storage";
    expect(cdStorageBase.get(storageKey)).toBe(null);

    cdStorageBase.set(storageKey, "test");
    expect(cdStorageBase.get(storageKey)).toBe("test");

    cdStorageBase.remove(storageKey);
    expect(cdStorageBase.get(storageKey)).toBe(null);
  });
});
