import { describe, expect, test } from "@jest/globals";
import { cdDay } from "../src";

describe("CD Day Test", (): void => {
  test("proper day format", (): void => {
    // expect(getDayFormat()).toBe("2000-01-01 00:00:00");
    expect(cdDay.getDayFormat(new Date("2000-01-01 00:00:00"))).toBe("2000-01-01 00:00:00");
  });

  test("proper day begin", (): void => {
    expect(cdDay.getDayFormat(cdDay.getDayBegin(0, "day", new Date("2000-12-25 12:30:30")))).toBe("2000-12-25 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayBegin(-1, "day", new Date("2000-12-25 12:30:30")))).toBe("2000-12-24 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayBegin(1, "day", new Date("2000-12-25 12:30:30")))).toBe("2000-12-26 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("day"))).toBe("2000-12-25 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("date"))).toBe("2000-12-25 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("year"))).toBe("2000-01-01 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("month"))).toBe("2000-12-01 00:00:00");
    // Sunday
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("week"))).toBe("2000-12-24 00:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("hour"))).toBe("2000-12-25 12:00:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("minute"))).toBe("2000-12-25 12:30:00");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).startOf("second"))).toBe("2000-12-25 12:30:30");
  });

  test("proper day end", (): void => {
    expect(cdDay.getDayFormat(cdDay.getDayEnd(0, "days", new Date("2000-12-25 12:30:30")), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-25 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayEnd(-1, "days", new Date("2000-12-25 12:30:30")), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-24 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayEnd(-1, "month", new Date("2000-12-25 12:30:30")), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-11-25 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayEnd(1, "days", new Date("2000-12-25 12:30:30")), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-26 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayEnd(1, "years", new Date("2000-12-25 12:30:30")), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2001-12-25 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("day"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-25 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("date"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-25 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("year"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-31 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("month"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-31 23:59:59.999");
    // Saturday
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("week"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-30 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("hour"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-25 12:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("minute"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-25 12:30:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-12-25 12:30:30.555")).endOf("second"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-12-25 12:30:30.999");

    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2000-02-25 12:30:30.555")).endOf("month"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2000-02-29 23:59:59.999");
    expect(cdDay.getDayFormat(cdDay.getDayjs(new Date("2001-02-25 12:30:30.555")).endOf("month"), "YYYY-MM-DD HH:mm:ss.SSS")).toBe("2001-02-28 23:59:59.999");
  });
});
