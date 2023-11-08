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
 * console.log("new Decimal(0.938044659618614761):" + new Decimal(0.938044659618614761))
 * console.log("new Decimal('0.938044659618614761'):" + new Decimal('0.938044659618614761'))
 *
 * new Decimal(0.938044659618614761):0.9380446596186147
 * new Decimal('0.938044659618614761'):0.938044659618614761
 *
 * console.log("new Decimal(0.938044659618614773):" + new Decimal(0.938044659618614773))
 * console.log("new Decimal(0.938044659618614774):" + new Decimal(0.938044659618614774))
 *
 * new Decimal(0.938044659618614773):0.9380446596186147
 * new Decimal(0.938044659618614773):0.9380446596186148
 *
 */

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
 * @return number
 */
export const BnComparedTo = (a: any, b: any): number | undefined => {
  try {
    return BnToDecimal(a).comparedTo(BnToDecimal(b));
  } catch (error) {
    return undefined;
  }
};

/**
 * Return a new Decimal whose value is the minimum of the arguments.
 *
 * @param values arguments {number|string|Decimal}
 * @return number
 */
export const BnMin = (...values: any[]): Decimal | undefined => {
  try {
    return Decimal.min(...values);
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
export const BnMax = (...values: any[]): Decimal | undefined => {
  try {
    return Decimal.max(...values);
  } catch (error) {
    return undefined;
  }
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
export function BnFormatAndSeparate<P extends { n?: any; rounding?: any; separator?: string; thousands?: number }>(a: any, options?: P): string {
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
  movePointLeft: typeof BnMovePointLeft;
  movePointRight: typeof BnMovePointRight;
  comparedTo: typeof BnComparedTo;
  min: typeof BnMin;
  max: typeof BnMax;
  isPositiveInteger: typeof BnIsPositiveInteger;
  separate: typeof BnSeparate;
  formatAndSeparate: typeof BnFormatAndSeparate;
  pow: typeof BnPow;
}

export const CdBn: CdBnProps = {
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
  movePointLeft: BnMovePointLeft,
  movePointRight: BnMovePointRight,
  comparedTo: BnComparedTo,
  min: BnMin,
  max: BnMax,
  isPositiveInteger: BnIsPositiveInteger,
  separate: BnSeparate,
  formatAndSeparate: BnFormatAndSeparate,
  pow: BnPow
};
