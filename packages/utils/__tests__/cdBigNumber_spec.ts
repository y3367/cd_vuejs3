import { describe, expect, test } from "@jest/globals";
import { Decimal } from "decimal.js";
import { cdBn } from "../src";

describe("CD BigNumber Test", (): void => {
  test("proper toDecimal", (): void => {
    expect((): void => {
      cdBn.toDecimal("");
    }).toThrow("unknown value:  / undefined");
    expect(cdBn.toDecimal(0)).toStrictEqual(new Decimal("0"));
    expect(cdBn.toDecimal("0")).toStrictEqual(new Decimal("0"));
    expect(cdBn.toDecimal("", "1")).toStrictEqual(new Decimal("1"));
    expect(cdBn.toDecimal("2", "1")).toStrictEqual(new Decimal("2"));
    expect(cdBn.toDecimal(" 2 ", "1")).toStrictEqual(new Decimal("2"));
    expect(cdBn.toDecimal("0.938044659618614773")).toStrictEqual(new Decimal("0.938044659618614773"));
    // loss precision when number precision > 16
    // eslint-disable-next-line no-loss-of-precision
    expect(cdBn.toDecimal(0.938044659618614773)).toStrictEqual(new Decimal("0.9380446596186147"));
  });

  /**
   * rounding => 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
   */
  test("proper fixed n & rounding", (): void => {
    expect(cdBn.toNumber("1.5545", 2, 0)).toBe(1.56);
    expect(cdBn.toNumber("1.5545", 2, 1)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 2)).toBe(1.56);
    expect(cdBn.toNumber("1.5545", 2, 3)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 4)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 5)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 6)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 7)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 8)).toBe(1.55);

    expect(cdBn.toNumber("1.5555", 2, 0)).toBe(1.56);
    expect(cdBn.toNumber("1.5555", 2, 1)).toBe(1.55);
    expect(cdBn.toNumber("1.5555", 2, 2)).toBe(1.56);
    expect(cdBn.toNumber("1.5555", 2, 3)).toBe(1.55);
    expect(cdBn.toNumber("1.5555", 2, 4)).toBe(1.56);
    expect(cdBn.toNumber("1.5555", 2, 5)).toBe(1.56);
    expect(cdBn.toNumber("1.5555", 2, 6)).toBe(1.56);
    expect(cdBn.toNumber("1.5555", 2, 7)).toBe(1.56);
    expect(cdBn.toNumber("1.5555", 2, 8)).toBe(1.56);

    // most commonly used
    expect(cdBn.toNumber("1.5545", 2, 1)).toBe(1.55);
    expect(cdBn.toNumber("1.5545", 2, 4)).toBe(1.55);
    expect(cdBn.toNumber("1.5555", 2, 1)).toBe(1.55);
    expect(cdBn.toNumber("1.5555", 2, 4)).toBe(1.56);
  });

  test("proper toNumber", (): void => {
    expect(cdBn.toNumber("1")).toBe(1);
    expect(cdBn.toNumber("1.99")).toBe(1.99);
    expect(cdBn.toNumber("1.99", 0)).toBe(2);

    // loss precision when number precision > 16
    // eslint-disable-next-line no-loss-of-precision
    expect(cdBn.toNumber("0.938044659618614773")).toBe(0.9380446596186147);
  });

  test("proper format", (): void => {
    expect(cdBn.format("0.938044659618614773")).toBe("0.938044659618614773");
    expect(cdBn.format("0.938044659618614773", 2)).toBe("0.94");
    expect(cdBn.format("0.938044659618614773", 2, 4)).toBe("0.94");
    expect(cdBn.format("0.938044659618614773", 2, 1)).toBe("0.93");

    // loss precision when number precision > 16
    // eslint-disable-next-line no-loss-of-precision
    expect(cdBn.format(0.938044659618614773)).toBe("0.9380446596186147");
  });

  test("proper decimal places", (): void => {
    expect(cdBn.decimalPlaces("0.938044659618614773")).toBe(18);
    expect(cdBn.decimalPlaces("0.938044659618614773938044659618614773")).toBe(36);

    expect(cdBn.dp("0.938044659618614773")).toBe(18);
    expect(cdBn.dp("0.938044659618614773938044659618614773")).toBe(36);
  });

  test("proper add", (): void => {
    expect(cdBn.add(2.222, undefined)).toBe("2.222");
    expect(cdBn.add(2.222, null)).toBe("2.222");
    expect(cdBn.add(2.222, 0)).toBe("2.222");
    expect(cdBn.add(2.222, new Decimal(1.111))).toBe("3.333");
    expect(cdBn.add(2.222, "")).toBe("2.222");
    expect(cdBn.add(2.222, " ")).toBe("2.222");
    expect(cdBn.add(2.222, " 0 ")).toBe("2.222");
    expect(cdBn.add(2.222, " 1.111 ")).toBe("3.333");

    expect(cdBn.add(1.111, 2.222)).toBe("3.333");
    expect(cdBn.add("1.111", "2.222")).toBe("3.333");
    expect(cdBn.add("1.111", "2.222", 2, 4)).toBe("3.33");

    expect(cdBn.addAll(["1.111", "2.222", 3.333])).toBe("6.666");
    expect(cdBn.addAll(["1.111", "2.222", 3.333, "", undefined, null, 0])).toBe("6.666");
    expect(cdBn.addAll(["1.111", "2.222", 3.333], 2, 4)).toBe("6.67");
  });

  test("proper sub", (): void => {
    expect(cdBn.sub(2.222, undefined)).toBe("2.222");
    expect(cdBn.sub(2.222, null)).toBe("2.222");
    expect(cdBn.sub(2.222, 0)).toBe("2.222");
    expect(cdBn.sub(2.222, new Decimal(1.111))).toBe("1.111");
    expect(cdBn.sub(2.222, "")).toBe("2.222");
    expect(cdBn.sub(2.222, " ")).toBe("2.222");
    expect(cdBn.sub(2.222, " 0 ")).toBe("2.222");
    expect(cdBn.sub(2.222, " 1.111 ")).toBe("1.111");

    expect(cdBn.sub(2.222, 1.111)).toBe("1.111");
    expect(cdBn.sub("2.222", "1.111")).toBe("1.111");
    expect(cdBn.sub("2.222", "1.111", 2, 4)).toBe("1.11");

    // (3 + 7) - (1.111 + 2.222) = 10 - 3.333 = 6.667
    // (3 + 7) - (1.111 + 2.222 + 3.333) = 10 - 6.666 = 3.334
    expect(cdBn.subAll([3, 7], ["1.111", "2.222"])).toBe("6.667");
    expect(cdBn.subAll([10], ["1.111", "2.222", 3.333, "", undefined, null, 0])).toBe("3.334");
    expect(cdBn.subAll([3, 7], ["1.111", "2.222", 3.333], 2, 4)).toBe("3.33");
  });

  test("proper mul", (): void => {
    // // 1.111 * 2.222 = 2.468642
    expect(cdBn.mul(2.222, undefined)).toBe("0");
    expect(cdBn.mul(2.222, null)).toBe("0");
    expect(cdBn.mul(2.222, 0)).toBe("0");
    expect(cdBn.mul(2.222, new Decimal(0))).toBe("0");
    expect(cdBn.mul(2.222, "")).toBe("0");
    expect(cdBn.mul(2.222, " ")).toBe("0");
    expect(cdBn.mul(2.222, " 0 ")).toBe("0");
    expect(cdBn.mul(2.222, " 1 ")).toBe("2.222");

    expect(cdBn.mul(2.222, 1.111)).toBe("2.468642");
    expect(cdBn.mul("2.222", "1.111")).toBe("2.468642");
    expect(cdBn.mul("2.222", "1.111", 2, 4)).toBe("2.47");

    // 1.111 * 2.222 * 3.333 = 8.227983786
    expect(cdBn.mulAll(["", " ", undefined, null])).toBe("0");
    expect(cdBn.mulAll(["1.111", "", " ", undefined, null])).toBe("1.111");
    expect(cdBn.mulAll(["1.111", "", " ", " 0 ", undefined, null])).toBe("0");
    expect(cdBn.mulAll(["1.111", 2.222, new Decimal("3.333")])).toBe("8.227983786");
    expect(cdBn.mulAll(["1.111", "2.222", 3.333, "", " ", undefined, null])).toBe("8.227983786");
    expect(cdBn.mulAll(["1.111", "2.222", 3.333], 2, 4)).toBe("8.23");
  });

  test("proper div", (): void => {
    expect(cdBn.div(2.222, undefined)).toBe("");
    expect(cdBn.div(2.222, null)).toBe("");
    expect(cdBn.div(2.222, 0)).toBe("");
    expect(cdBn.div(2.222, new Decimal(0))).toBe("");
    expect(cdBn.div(2.222, "")).toBe("");
    expect(cdBn.div(2.222, " ")).toBe("");
    expect(cdBn.div(2.222, " 0 ")).toBe("");
    expect(cdBn.div(2.222, " 1 ")).toBe("2.222");

    expect(cdBn.div(2.222, 1.111)).toBe("2");
    expect(cdBn.div("2.222", "2")).toBe("1.111");
    expect(cdBn.div("2.222", "2", 2, 4)).toBe("1.11");

    // 15.996 / 6 = (3.999 * 4) / (2 * 3) = 2.666
    expect(cdBn.divAll([], ["2", "3"])).toBe("");
    expect(cdBn.divAll([2], [""])).toBe("");
    expect(cdBn.divAll([2], ["2"])).toBe("1");
    expect(cdBn.divAll([7.998, 2], ["2", "3"])).toBe("2.666");
    expect(cdBn.divAll([15.996], ["2", "2", 1.5, "", undefined, null])).toBe("2.666");
    expect(cdBn.divAll([7.998, 2], ["2", "3"], 2, 4)).toBe("2.67");
  });

  test("proper mod", (): void => {
    expect(cdBn.mod(10, 3)).toBe("1");
    expect(cdBn.mod(11, 3)).toBe("2");
  });

  test("proper movePointLeft", (): void => {
    expect(cdBn.movePointLeft("0.938044659618614773", 2)).toBe("0.00938044659618614773");
    expect(cdBn.movePointLeft("0.938044659618614773", 2, 4, 4)).toBe("0.0094");
  });

  test("proper movePointRight", (): void => {
    expect(cdBn.movePointRight("0.938044659618614773", 2)).toBe("93.8044659618614773");
    expect(cdBn.movePointRight("0.938044659618614773", 2, 2, 4)).toBe("93.8");
  });

  test("proper comparedTo", (): void => {
    expect(cdBn.comparedTo("1", "0")).toBe(1);
    expect(cdBn.comparedTo("1", "1")).toBe(0);
    expect(cdBn.comparedTo("1", "2")).toBe(-1);
    expect(cdBn.comparedTo(1, undefined)).toBe(undefined);
    expect(cdBn.comparedTo(1, " unknown value ")).toBe(undefined);
  });

  test("proper min", (): void => {
    expect(cdBn.min("-1", "0", "1", new Decimal(1.5), 2)).toStrictEqual(cdBn.toDecimal("-1"));
    expect(cdBn.min("-1", "0", "1", new Decimal(1.5), 2, undefined)).toBe(undefined);
  });

  test("proper max", (): void => {
    expect(cdBn.max("-1", "0", "1", new Decimal(1.5), 2)).toStrictEqual(cdBn.toDecimal("2"));
    expect(cdBn.max("-1", "0", "1", new Decimal(1.5), 2, undefined)).toBe(undefined);
  });

  test("proper isPositiveInteger", (): void => {
    expect(cdBn.isPositiveInteger("1")).toBe(true);
    expect(cdBn.isPositiveInteger("0")).toBe(true);
    expect(cdBn.isPositiveInteger("-1")).toBe(false);
  });

  test("proper separate", (): void => {
    expect(cdBn.separate("1000000000")).toBe("1,000,000,000");
    expect(cdBn.separate("9999999.999")).toBe("9,999,999.999");
  });

  test("proper formatAndSeparate", (): void => {
    // CdBn.formatAndSeparate("1000000000")
    expect(cdBn.formatAndSeparate("1000000000")).toBe("1,000,000,000");
    expect(cdBn.formatAndSeparate("9999999.999")).toBe("9,999,999.999");
    expect(cdBn.formatAndSeparate("9999999.999", { n: 2, rounding: 4, separator: "_", thousands: 3 })).toBe("10_000_000");
    expect(cdBn.formatAndSeparate("9999999.999", { n: 2, rounding: 1, separator: "_", thousands: 3 })).toBe("9_999_999.99");
    expect(cdBn.formatAndSeparate("9999999.999", { n: 2, rounding: 1, separator: "_", thousands: 4 })).toBe("999_9999.99");
  });

  test("proper pow", (): void => {
    expect(cdBn.pow("10", 18)).toBe("1000000000000000000");
    expect(cdBn.pow("10", 9)).toBe("1000000000");
    expect(cdBn.pow("2", 2)).toBe("4");
    expect(cdBn.pow("2", 3)).toBe("8");
    expect(cdBn.pow("2", 4)).toBe("16");
  });
});
