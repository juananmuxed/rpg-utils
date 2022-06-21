import { RpgUtils } from "../src";
import { describe, expect, it } from "vitest";
import { Constants } from "../src/utils/constants";

describe("Head or tails", () => {
  it("Check head or tails", () => {
    const rollUtils = new RpgUtils();
    const arr = new Array(20).fill(2);
    arr.forEach((head) => {
      const rolls = rollUtils.headOrTails(head);
      const success = rolls.success;
      expect([
        Constants.TAILS,
        Constants.HEAD,
        Constants.TIE,
      ]).toContain(success);
    });
  });
});
describe("Check success", () => {
  it("Check success", () => {
    const rollUtils = new RpgUtils();
    const rolls = rollUtils.checkSuccess(3);
    expect([Constants.YES, Constants.NO]).toContain(rolls.success);

    const arr = new Array(5).fill(6);
    arr.forEach((dices) => {
      rollUtils.rollDices(10, 10);
      const rolls = rollUtils.checkSuccess(dices);
      expect([Constants.YES, Constants.NO]).toContain(rolls.success);
    });

    const arrFail = new Array(5).fill(1);
    arrFail.forEach((dices) => {
      rollUtils.rollDices(10, 10);
      const rolls = rollUtils.checkSuccess(dices, undefined, true);
      expect([Constants.YES, Constants.NO]).toContain(rolls.success);
    });

    const arrModified = new Array(5).fill(6);
    arrModified.forEach((dices) => {
      rollUtils.rollDices(10, 10);
      rollUtils.modifyRolls(2);
      const rolls = rollUtils.checkSuccess(dices, undefined, true);
      expect([Constants.YES, Constants.NO]).toContain(rolls.success);
    });
  });
});
