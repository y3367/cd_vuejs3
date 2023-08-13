import { BnAdd } from "../../src";

describe("My First Test", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });

  context("log", function () {
    it("can add numbers", function () {
      expect(BnAdd(1, 2)).to.eq(3);
    });
  });
});
