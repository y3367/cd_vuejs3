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

export const BnToNumber = (a: any, n?: any, rounding?: any): number => {
  if (!a) return 0;
  return new Decimal(new Decimal(a).toFixed(n, rounding)).toNumber();
};

export const BnFormat = (a: any, n?: any, rounding?: any): string => {
  if (!a) return "0";
  return new Decimal(new Decimal(a).toFixed(n, rounding)).toString();
};

export const BnDecimalPlaces = (a: any, n?: any, rounding?: any): number => {
  if (!a) return 0;
  return new Decimal(BnFormat(a, n, rounding)).decimalPlaces();
};

export const BnDp = (a: any, n?: any, rounding?: any): number => {
  if (!a) return 0;
  return new Decimal(BnFormat(a, n, rounding)).dp();
};

export const BnAdd = (a: any, b: any, n?: any, rounding?: any): string => {
  if (!a && !b) return "0";
  const addAmount = new Decimal(a || 0).add(b || 0);
  return BnFormat(addAmount, n, rounding);
};

export const BnAddAll = ([...values], n?: any, rounding?: any): string => {
  let addAmount = new Decimal(0);
  values.forEach(v => {
    if (v) {
      try {
        addAmount = addAmount.add(new Decimal(v));
      } catch (error) {
        console.error("add error >> ", v, error);
      }
    }
  });
  return BnFormat(addAmount, n, rounding);
};

export const BnSub = (a: any, b: any, n?: any, rounding?: any): string => {
  if (!a && !b) return "0";
  const subAmount = new Decimal(a || 0).sub(b || 0);
  return BnFormat(subAmount, n, rounding);
};

export const BnSubAll = ([...addValues], [...subValues], n?: any, rounding?: any): string => {
  let addAmount = new Decimal(0);
  addValues.forEach(v => {
    if (v) {
      try {
        addAmount = addAmount.add(new Decimal(v));
      } catch (error) {
        console.error("sub add add error >> ", v, error);
      }
    }
  });

  let subAmount = new Decimal(0);
  subValues.forEach(v => {
    if (v) {
      try {
        subAmount = subAmount.add(new Decimal(v));
      } catch (error) {
        console.error("sub add sub error >> ", v, error);
      }
    }
  });

  return BnFormat(addAmount.sub(subAmount), n, rounding);
};

export const BnMul = (a: any, factor: any, n?: any, rounding?: any): string => {
  if (!a || (!factor && typeof factor !== "number")) {
    return "0";
  }
  const mulAmount = new Decimal(a || 0).mul(factor || 0);
  return BnFormat(mulAmount, n, rounding);
};

export const BnMulAll = ([...values], n?: any, rounding?: any): string => {
  let mulAmount: any = undefined;
  values.forEach(v => {
    if (v !== null && v !== undefined && v !== "") {
      try {
        if (mulAmount == undefined) {
          mulAmount = new Decimal(v);
        } else {
          mulAmount = mulAmount.mul(new Decimal(v || 0));
        }
      } catch (error) {
        console.error("mul error >> ", v, error);
      }
    }
  });

  return BnFormat(mulAmount, n, rounding);
};

export const BnDiv = (a: any, b: any, n?: any, rounding?: any): string => {
  if (!b || b == "0") return "";
  const divAmount = new Decimal(a || 0).div(b);
  return BnFormat(divAmount, n, rounding);
};

export const BnDivAll = ([...mulValues], [...divValues], n?: any, rounding?: any): string => {
  let mulAmount: any = undefined;
  mulValues.forEach(v => {
    if (v !== null && v !== undefined && v !== "") {
      try {
        if (mulAmount == undefined) {
          mulAmount = new Decimal(v);
        } else {
          mulAmount = mulAmount.mul(new Decimal(v || 0));
        }
      } catch (error) {
        console.error("div mul mul error >> ", v, error);
      }
    }
  });

  let divAmount: any = undefined;
  divValues.forEach(v => {
    if (v !== null && v !== undefined && v !== "") {
      try {
        if (divAmount == undefined) {
          divAmount = new Decimal(v);
        } else {
          divAmount = divAmount.mul(new Decimal(v || 0));
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

export const BnMovePointLeft = (a: any, mn: any, n?: any, rounding?: any): string => {
  if (!a || a == "0") return "0";
  return BnDiv(a, new Decimal("10").toPower(mn), n, rounding);
};

export const BnMovePointRight = (a: any, mn: any, n?: any, rounding?: any): string => {
  if (!a || a == "0") return "0";
  return BnMul(a, new Decimal("10").toPower(mn), n, rounding);
};

export const BnComparedTo = (a: any, b: any): number | undefined => {
  try {
    return new Decimal(a).comparedTo(new Decimal(b));
  } catch (error) {
    return undefined;
  }
};

export const BnMin = (...values: any[]): Decimal | undefined => {
  try {
    return Decimal.min(...values);
  } catch (error) {
    return undefined;
  }
};

export const BnMax = (...values: any[]): Decimal | undefined => {
  try {
    return Decimal.max(...values);
  } catch (error) {
    return undefined;
  }
};

export const BnIsPositiveInteger = (data: any): Boolean => {
  const numRegRule = /^[0-9]*$/;
  const numReg = new RegExp(numRegRule);
  return numReg.test(data);
};

/**
 * thousands separator
 */
export const BnSeparate = (a: any, separator: string = ","): string => {
  return BnFormatAndSeparate(a, undefined, undefined, separator);
};

/**
 * format and thousands separator
 */
export const BnFormatAndSeparate = (a: any, n?: any, rounding?: any, separator: string = ","): string => {
  const value: string = BnFormat(a, n, rounding);

  const pointIndex: number = value.indexOf(".");
  const intPart: string = pointIndex >= 0 ? value.split(".")[0] : value;
  const intPartFormat = intPart.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + separator);
  if (pointIndex < 0) {
    return intPartFormat;
  }

  const floatPart: string = value.split(".")[1];
  return intPartFormat + "." + floatPart;
};

export const BnPow = (a: any, b: Decimal.Value, n?: any, rounding?: any): string => {
  return BnFormat(new Decimal(a).toPower(b), n, rounding);
};
