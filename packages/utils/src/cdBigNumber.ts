import { Decimal } from "decimal.js";
// http://mikemcl.github.io/decimal.js/#
// https://github.com/MikeMcl/decimal.js
// npm install --save decimal.js
// ROUND_UP: 0;
// ROUND_DOWN: 1;
// ROUND_CEIL: 2;
// ROUND_FLOOR: 3;
// ROUND_HALF_UP: 4;
// ROUND_HALF_DOWN: 5;
// ROUND_HALF_EVEN: 6;
// ROUND_HALF_CEIL: 7;
// ROUND_HALF_FLOOR: 8;
// EUCLID: 9;
// 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;

Decimal.set({
  toExpNeg: -9000000000000000,
  toExpPos: 9000000000000000,
  precision: 99,
  rounding: 4,
  modulo: 1,
  minE: -9e15,
  maxE: 9e15,
  crypto: false
});

/**
 * convert value to *`Decimal`*
 * @param a first value as a
 * @param defaultValue default value
 * @return Decimal
 */
export const BnToDecimal = (a: any, defaultValue?: any): Decimal => {
  if (typeof a === "string") {
    a = a.trim();
  }
  if (typeof a === "bigint") {
    a = String(a);
  }
  if (a === undefined || a === null || (typeof a === "string" && a.trim() === "")) {
    if (defaultValue !== undefined && defaultValue !== null) {
      if (defaultValue instanceof Decimal) {
        return defaultValue;
      } else {
        return BnToDecimal(defaultValue);
      }
    }
    throw Error(`unknown value: ${a} / ${defaultValue}`);
  }
  return new Decimal(a);
};

/**
 * format value and convert to *`number`*
 * @param a first value as a
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return number
 */
export const BnToNumber = (a: any, n?: any, rounding?: any): number => {
  if (!a) return 0;
  return BnToDecimal(BnToDecimal(a).toFixed(n, rounding)).toNumber();
};

/**
 * format value and convert to *`string`*
 * @param a first value as a
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnFormat = (a: any, n?: any, rounding?: any): string => {
  if (!a) return "0";
  return BnToDecimal(BnToDecimal(a).toFixed(n, rounding)).toString();
};

/**
 * get decimal places after format value
 * @param a first value as a
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return number
 */
export const BnDecimalPlaces = (a: any, n?: any, rounding?: any): number => {
  if (!a) return 0;
  return BnToDecimal(BnFormat(a, n, rounding)).decimalPlaces();
};

/**
 * get decimal places after format value
 * @param a first value as a
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return number
 */
export const BnDp = (a: any, n?: any, rounding?: any): number => {
  if (!a) return 0;
  return BnToDecimal(BnFormat(a, n, rounding)).dp();
};

/**
 * calculate *`a + b = res`* and format *`res`*
 * @param a first value as a
 * @param b second value as b
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnAdd = (a: any, b: any, n?: any, rounding?: any): string => {
  if (!a && !b) return "0";
  const addAmount = BnToDecimal(a, 0).add(BnToDecimal(b, 0));
  return BnFormat(addAmount, n, rounding);
};

/**
 * calculate *`a + b + c + .... = res`* and format *`res`*
 * @param values values such as [a,b,c,...]
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnAddAll = ([...values], n?: any, rounding?: any): string => {
  let addAmount = BnToDecimal(0);
  values.forEach(v => {
    if (v) {
      try {
        addAmount = addAmount.add(BnToDecimal(v, 0));
      } catch (error) {
        console.error("add error >> ", v, error);
      }
    }
  });
  return BnFormat(addAmount, n, rounding);
};

/**
 * calculate *`a - b = res`* and format *`res`*
 * @param a first value as a
 * @param b second value as b
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnSub = (a: any, b: any, n?: any, rounding?: any): string => {
  if (!a && !b) return "0";
  const subAmount = BnToDecimal(a, 0).sub(BnToDecimal(b, 0));
  return BnFormat(subAmount, n, rounding);
};

/**
 * calculate *`(a0 + b0 + c0 + ....) - (A1 + B1 + C1 + ....) = res`* and format *`res`*
 * @param addValues values such as [a0,b0,c0,...]
 * @param subValues values such as [A1,B1,C1,...]
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnSubAll = ([...addValues], [...subValues], n?: any, rounding?: any): string => {
  let addAmount = BnToDecimal(0);
  addValues.forEach(v => {
    if (v) {
      try {
        addAmount = addAmount.add(BnToDecimal(v));
      } catch (error) {
        console.error("sub add add error >> ", v, error);
      }
    }
  });

  let subAmount = BnToDecimal(0);
  subValues.forEach(v => {
    if (v) {
      try {
        subAmount = subAmount.add(BnToDecimal(v));
      } catch (error) {
        console.error("sub add sub error >> ", v, error);
      }
    }
  });

  return BnFormat(addAmount.sub(subAmount), n, rounding);
};

/**
 * calculate *`a * factor = res`* and format *`res`*
 * @param a first value as a
 * @param factor factor value as factor
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnMul = (a: any, factor: any, n?: any, rounding?: any): string => {
  if (!a || (!factor && typeof factor !== "number")) {
    return "0";
  }
  const mulAmount = BnToDecimal(a, 0).mul(BnToDecimal(factor, 0));
  return BnFormat(mulAmount, n, rounding);
};

/**
 * calculate *`a * b * c * .... = res`* and format *`res`*
 * @param values values such as [a,b,c,...]
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnMulAll = ([...values], n?: any, rounding?: any): string => {
  let mulAmount: any = undefined;
  values.forEach(v => {
    if (v !== null && v !== undefined && ((typeof v === "string" && v.trim() !== "") || (typeof v !== "string" && v))) {
      try {
        if (mulAmount === undefined) {
          mulAmount = BnToDecimal(v);
        } else {
          mulAmount = mulAmount.mul(BnToDecimal(v, 1));
        }
      } catch (error) {
        console.error("mul error >> ", v, error);
      }
    }
  });

  return BnFormat(mulAmount, n, rounding);
};

/**
 * calculate *`a / b = res`* and format *`res`*
 * @param a first value as a
 * @param b denominator value as b
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnDiv = (a: any, b: any, n?: any, rounding?: any): string => {
  if (!b || b?.trim?.() === "" || b?.trim?.() === "0" || BnFormat(b) === "0") return "";
  const divAmount = BnToDecimal(a, 0).div(BnToDecimal(b));
  return BnFormat(divAmount, n, rounding);
};

/**
 * calculate *`(a0 * b0 * c0 * ....) / (A1 * B1 * C1 * ....) = res`* and format *`res`*
 * @param mulValues values such as [a0,b0,c0,...]
 * @param divValues values such as [A1,B1,C1,...]
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnDivAll = ([...mulValues], [...divValues], n?: any, rounding?: any): string => {
  let mulAmount: any = undefined;
  mulValues.forEach(v => {
    if (v !== null && v !== undefined && ((typeof v === "string" && v.trim() !== "") || (typeof v !== "string" && v))) {
      try {
        if (mulAmount === undefined) {
          mulAmount = BnToDecimal(v);
        } else {
          mulAmount = mulAmount.mul(BnToDecimal(v || 0));
        }
      } catch (error) {
        console.error("div mul mul error >> ", v, error);
      }
    }
  });

  let divAmount: any = undefined;
  divValues.forEach(v => {
    if (v !== null && v !== undefined && ((typeof v === "string" && v.trim() !== "") || (typeof v !== "string" && v))) {
      try {
        if (divAmount === undefined) {
          divAmount = BnToDecimal(v);
        } else {
          divAmount = divAmount.mul(BnToDecimal(v || 0));
        }
      } catch (error: any) {
        console.error("div mul div error >> ", v, error);
      }
    }
  });

  if (mulAmount === undefined || divAmount === undefined || BnComparedTo(divAmount, "0") === 0) {
    return "";
  }

  return BnFormat(mulAmount.div(divAmount), n, rounding);
};

/**
 * calculate *`a % b = res`* and format *`res`*
 * @param a first value as a
 * @param b second value as b
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnMod = (a: any, b: any, n?: any, rounding?: any): string => {
  return BnFormat(BnToDecimal(a).mod(BnToDecimal(b)), n, rounding);
};

/**
 * move the decimal point to the left,
 * such a:
 * `BnMovePointLeft(10000, 2) = 100`,
 * `BnMovePointLeft(10000, 4) = 1`,
 * @param a first value as a
 * @param mn number of move the decimal point as mn
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnMovePointLeft = (a: any, mn: any, n?: any, rounding?: any): string => {
  if (!a || a === "0") return "0";
  return BnDiv(a, BnToDecimal("10").toPower(mn), n, rounding);
};

/**
 * move the decimal point to the right,
 * such a:
 * `BnMovePointRight(1, 2) = 100`,
 * `BnMovePointRight(1, 4) = 10000`,
 * @param a first value as a
 * @param mn number of move the decimal point as mn
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnMovePointRight = (a: any, mn: any, n?: any, rounding?: any): string => {
  if (!a || a === "0") return "0";
  return BnMul(a, BnToDecimal("10").toPower(mn), n, rounding);
};

/**
 * Return:
 *  1    if the value of `a` is greater than the value of `b`,
 *  -1   if the value of `a` is less than the value of `b`,
 *  0    if they have the same value,
 *  undefined  if the value of either Decimal is NaN.
 * @param a first value as a
 * @param b second value as b
 * @param defaultValue default value
 * @return number
 */
export const BnComparedTo = (a: any, b: any, defaultValue?: number): number => {
  try {
    return BnToDecimal(a).comparedTo(BnToDecimal(b));
  } catch (error) {
    return defaultValue as unknown as number;
  }
};

/**
 * Return a new Decimal whose value is the minimum of the arguments.
 *
 * @param values arguments {number|string|Decimal}
 * @return number
 */
export const BnMin = (...values: any[]): string | undefined => {
  try {
    return BnFormat(Decimal.min(...values));
  } catch (error) {
    return undefined;
  }
};

/**
 * Return a new Decimal whose value is the maximum of the arguments.
 *
 * @param values arguments {number|string|Decimal}
 * @return Decimal
 */
export const BnMax = (...values: any[]): string | undefined => {
  try {
    return BnFormat(Decimal.max(...values));
  } catch (error) {
    return undefined;
  }
};

/**
 * calculate *`a^b = res`* and format *`res`*
 * @param a first value as a
 * @param b denominator value as b
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnPow = (a: any, b: any, n?: any, rounding?: any): string => {
  return BnFormat(BnToDecimal(a).toPower(BnToDecimal(b)), n, rounding);
};

/**
 * whether positive integer
 *
 * @param data arguments {number|string|Decimal}
 * @return Boolean
 */
export const BnIsPositiveInteger = (data: any): Boolean => {
  const numRegRule = /^[0-9]*$/;
  const numReg = new RegExp(numRegRule);
  return numReg.test(BnFormat(data));
};

/**
 * format and thousands separator,
 * such as: `1,000,000`
 * @param a first value as a
 * @param options
 * {
 *  n - fixed decimal places as n;
 *  rounding - rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 *  thousands - thousands, default `3`;
 *  separator - thousands separator, default `,`
 * }
 * @return string
 */
export function BnFormatAndSeparate<Options extends { n?: any; rounding?: any; separator?: string; thousands?: number }>(a: any, options?: Options): string {
  const value: string = BnFormat(a, options?.n, options?.rounding);

  const pointIndex: number = value.indexOf(".");
  const intPart: string = pointIndex >= 0 ? value.split(".")[0] : value;

  const intPartFormat = intPart.replace(new RegExp(`(\\d)(?=(?:\\d{${options?.thousands ?? 3}})+$)`, "g"), "$1" + (options?.separator || ","));
  if (pointIndex < 0) {
    return intPartFormat;
  }

  const floatPart: string = value.split(".")[1];
  return intPartFormat + "." + floatPart;
}

/**
 * thousands separator;
 * see BnFormatAndSeparate
 * @param a first value as a
 * @param separator thousands separator, default `,`
 * @return string
 */
export const BnSeparate = (a: any, separator: string = ","): string => {
  return BnFormatAndSeparate(a, { separator });
};

/**
 * format value with unit and thousands separator,
 * such as: `1024` -> `1K`, `1047552` -> `1,023K`
 * @param a first value as a
 * @param options
 * {
 *  unit - current value unit
 *  unitList - all available unit list, default `["", "K", "M", "G", "T", "P", "E", "Z", "Y", "B", "N", "D"]`
 *  unitInterval - The interval between two adjacent units, default `1024`
 *  n - fixed decimal places as n;
 *  rounding - rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 *  thousands - thousands, default `3`;
 *  separator - thousands separator, default `,`
 * }
 * @return { value: string, unit: string }
 */
export function BnFormatUnitObj<
  Options extends {
    unit?: string;
    unitList?: string[];
    unitInterval?: number;
    n?: any;
    rounding?: any;
    separator?: string;
    thousands?: number;
  }
>(a: any, options?: Options): { value: string; unit: string } {
  const unitList: string[] = options?.unitList ?? ["", "K", "M", "G", "T", "P", "E", "Z", "Y", "B", "N", "D"];
  const unit: string = options?.unit ?? unitList?.[0] ?? "";
  const unitInterval: number = options?.unitInterval ?? 1024;
  const unitIndex: number = unitList.findIndex(val => val === unit);
  a = BnToDecimal(a, 0);
  if (!Decimal.isDecimal(a)) {
    return {
      unit,
      value: "0"
    };
  }
  const data = BnFormat(a, options?.n, options?.rounding);
  const dataAbs = BnToDecimal(data).abs();
  if ((unitIndex <= 0 && BnComparedTo(dataAbs, unitInterval) < 0) || (unitIndex >= unitList.length - 1 && BnComparedTo(dataAbs, 1) >= 0) || (BnComparedTo(dataAbs, 1) >= 0 && BnComparedTo(dataAbs, unitInterval) < 0)) {
    return {
      unit,
      value: BnFormatAndSeparate(a, {
        n: options?.n,
        rounding: options?.rounding,
        separator: options?.separator,
        thousands: options?.thousands
      })
    };
  }
  if (BnComparedTo(dataAbs, 1) < 0) {
    return BnFormatUnitObj(BnMul(a, unitInterval), {
      unitList,
      unitInterval,
      n: options?.n,
      rounding: options?.rounding,
      separator: options?.separator,
      thousands: options?.thousands,
      unit: unitList.at(unitIndex - 1)
    });
  }
  return BnFormatUnitObj(BnDiv(a, unitInterval, 48), {
    unitList,
    unitInterval,
    n: options?.n,
    rounding: options?.rounding,
    separator: options?.separator,
    thousands: options?.thousands,
    unit: unitList.at(unitIndex + 1)
  });
}

/**
 * format value with unit and thousands separator,
 * such as: `1024` -> `1K`, `1047552` -> `1,023K`
 * @param a first value as a
 * @param options
 * {
 *  unit - current value unit
 *  unitList - all available unit list, default `["", "K", "M", "G", "T", "P", "E", "Z", "Y", "B", "N", "D"]`
 *  unitInterval - The interval between two adjacent units, default `1024`
 *  n - fixed decimal places as n;
 *  rounding - rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 *  thousands - thousands, default `3`;
 *  separator - thousands separator, default `,`
 *  slot - fill in between value and unit
 * }
 * @return string
 */
export function BnFormatUnit<
  Options extends {
    n?: any;
    rounding?: any;
    unit?: string;
    unitList?: string[];
    unitInterval?: number;
    separator?: string;
    thousands?: number;
    slot?: string;
  }
>(a: any, options?: Options): string {
  const obj = BnFormatUnitObj(a, options);
  return `${obj?.value}${options?.slot ?? ""}${obj?.unit}`;
}

/**
 * format value to percentage and convert to *`string`*
 * such as: `1` -> `100%`, `0.001` -> `0.1%`
 * @param a first value as a
 * @param n fixed decimal places as n
 * @param rounding rounding model when fixed decimal places as rounding, 0:UP;1:DOWN;2:CEIL;3:FLOOR;4:HALF_UP;5:HALF_DOWN;6:HALF_EVEN;7:HALF_CEIL;8:HALF_FLOOR;9:EUCLID;
 * @return string
 */
export const BnFormatPercentage = (a: any, n?: any, rounding?: any): string => {
  if (!a) return "0%";
  return `${BnFormat(BnMul(a, 100), n, rounding)}%`;
};

export interface CdBnProps {
  toDecimal: typeof BnToDecimal;
  toNumber: typeof BnToNumber;
  format: typeof BnFormat;
  decimalPlaces: typeof BnDecimalPlaces;
  dp: typeof BnDp;
  add: typeof BnAdd;
  addAll: typeof BnAddAll;
  sub: typeof BnSub;
  subAll: typeof BnSubAll;
  mul: typeof BnMul;
  mulAll: typeof BnMulAll;
  div: typeof BnDiv;
  divAll: typeof BnDivAll;
  mod: typeof BnMod;
  movePointLeft: typeof BnMovePointLeft;
  movePointRight: typeof BnMovePointRight;
  comparedTo: typeof BnComparedTo;
  min: typeof BnMin;
  max: typeof BnMax;
  pow: typeof BnPow;
  isPositiveInteger: typeof BnIsPositiveInteger;
  separate: typeof BnSeparate;
  formatAndSeparate: typeof BnFormatAndSeparate;
  formatUnitObj: typeof BnFormatUnitObj;
  formatUnit: typeof BnFormatUnit;
  formatPercentage: typeof BnFormatPercentage;
}

export const cdBn: CdBnProps = {
  toDecimal: BnToDecimal,
  toNumber: BnToNumber,
  format: BnFormat,
  decimalPlaces: BnDecimalPlaces,
  dp: BnDp,
  add: BnAdd,
  addAll: BnAddAll,
  sub: BnSub,
  subAll: BnSubAll,
  mul: BnMul,
  mulAll: BnMulAll,
  div: BnDiv,
  divAll: BnDivAll,
  mod: BnMod,
  movePointLeft: BnMovePointLeft,
  movePointRight: BnMovePointRight,
  comparedTo: BnComparedTo,
  min: BnMin,
  max: BnMax,
  pow: BnPow,
  isPositiveInteger: BnIsPositiveInteger,
  separate: BnSeparate,
  formatAndSeparate: BnFormatAndSeparate,
  formatUnitObj: BnFormatUnitObj,
  formatUnit: BnFormatUnit,
  formatPercentage: BnFormatPercentage
};
