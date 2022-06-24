import { RpgUtils } from "../src";
import { describe, expect, it } from "vitest";
import { Constants } from "../src/utils/constants";

const rollsMock = [
  { dices: 1, faces: 6, min: 1, max: 6 },
  { dices: 10, faces: 20, min: 1, max: 20 },
  { dices: -1, faces: 20, min: 1, max: 20 },
];

describe("Checking roll random range", () => {
  rollsMock.forEach((test) => {
    const rolls = new RpgUtils(test.faces);
    const title = `Check ${test.dices}d${test.faces}`;
    it(title, () => {
      rolls.rollDices(test.dices).forEach((roll) => {
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(test.faces);
      });
    });
  });
});

describe("Check change face", () => {
  it("Check faces", () => {
    const roll = new RpgUtils(rollsMock[0].faces);
    roll.faces = 10;
    roll.rollDices().forEach((roll) => {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(10);
    });
  });
});

describe("Check async roll", () => {
  it("Check async", async () => {
    const roll = new RpgUtils();

    await roll.rollDicesAsync(2, 8);

    roll.dices.forEach((dice) => {
      expect(dice.roll).toBeGreaterThanOrEqual(dice.min);
      expect(dice.roll).toBeLessThanOrEqual(dice.max);
    });
  });
});

describe("Add rolls", () => {
  it("Check add rolls", () => {
    const roll = new RpgUtils();
    roll.rollDices(2, 8);
    roll.addNewRolls(1, 20);

    roll.dices.forEach((dice) => {
      expect(dice.roll).toBeGreaterThanOrEqual(dice.min);
      expect(dice.roll).toBeLessThanOrEqual(dice.max);
    });
  });
});

describe("Sum rolls", () => {
  it("Check sum rolls", () => {
    const roll = new RpgUtils();
    expect(roll.sumRolls()).toBe(undefined);
    const DICES = 20;
    const FACES = 10;

    roll.rollDices(DICES, FACES);

    expect(roll.sumRolls()).toBeGreaterThanOrEqual(DICES);
    expect(roll.sumRolls()).toBeLessThanOrEqual(DICES * FACES);
  });
});

describe("Modify rolls", () => {
  it("Check modify rolls", () => {
    const roll = new RpgUtils();
    expect(roll.modifyRolls(2)).toStrictEqual([]);

    const MODIFICATION = 2;
    const DICES = 20;
    const FACES = 10;

    roll.rollDices(DICES, FACES);

    roll.modifyRolls(MODIFICATION);

    roll.dices.forEach((dice) => {
      expect(dice.modification).toBe(MODIFICATION);
      expect(dice.rollModified).toBeGreaterThanOrEqual(
        1 + MODIFICATION
      );
      expect(dice.rollModified).toBeLessThanOrEqual(FACES);
    });

    roll.rollDices(DICES, FACES);

    roll.modifyRolls(-120);
    roll.dices.forEach((dice) => {
      expect(dice.rollModified).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("Set critical", () => {
  it("Check critical change", () => {
    const roll = new RpgUtils(rollsMock[0].faces);
    roll.rollDices();

    roll.dices.forEach((dice) => {
      expect(dice.critical).toBeFalsy();
    });

    roll.setCritical(5);

    roll.dices.forEach((dice) => {
      expect(dice.critical).toBe(5);
    });
  });
});

describe("Set failure", () => {
  it("Check failure change", () => {
    const roll = new RpgUtils(rollsMock[0].faces);
    roll.rollDices();

    roll.dices.forEach((dice) => {
      expect(dice.failure).toBeFalsy();
    });

    roll.setFailure(2);

    roll.dices.forEach((dice) => {
      expect(dice.failure).toBe(2);
    });
  });
});
