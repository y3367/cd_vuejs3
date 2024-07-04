import { describe, test } from "@jest/globals";
import { getDesktopBrowserType, isDesktopChrome, isMobile } from "../src";

describe("CD Browser Test", (): void => {
  test("proper Browser", (): void => {
    console.log(`isMobile: `, isMobile());
    console.log(`isDesktopChrome: `, isDesktopChrome(false));
    console.log(`navigator.userAgent: `, navigator.userAgent);
    console.log(`getDesktopBrowserType: `, getDesktopBrowserType(navigator.userAgent));
  });
});
