//TODO: Update test
import { RpgUtils } from "../src";

const rolls = [
  { dices: 1, faces: 6, min: 1, max: 6 },
  { dices: 10, faces: 20, min: 1, max: 20 },
  { dices: -1, faces: 20, min: 1, max: 20 },
];

import { describe, expect, it } from "vitest";

describe("Checking roll random range", () => {
  rolls.forEach((test) => {
    const rolls = new RpgUtils(test.faces);
    it(
      "Check roll " +
        test.dices +
        "d" +
        test.faces +
        " expecting range 1-" +
        test.faces,
      () => {
        rolls.rollDices(test.dices).forEach((roll) => {
          expect(roll).toBeGreaterThanOrEqual(1);
          expect(roll).toBeLessThanOrEqual(test.faces);
        });
      }
    );
  });
});
