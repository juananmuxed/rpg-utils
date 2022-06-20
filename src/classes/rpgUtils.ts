import { Constants } from "../utils/constants";
import { ResponseRoll } from "../interfaces/responseRoll";
import { Rolling } from "./rolling";

export class RpgUtils extends Rolling {
  /**
   * Check down or up
   *
   * @param {boolean} down Is Down
   * @param {number} roll Roll
   * @param {number} check Roll test
   * @returns {boolean} Pass the test
   */
  private checkDownUp(
    down: boolean,
    roll: number,
    check: number | undefined
  ): boolean {
    return !check ? false : !down ? roll >= check : roll <= check;
  }

  /**
   * Modified or not
   *
   * @param {number} roll Roll
   * @param {number} check Modified roll
   * @returns {number} Pass the modified if is not equal
   */
  private isModified(
    roll: number,
    modified: number | undefined
  ): number {
    return modified && modified != roll ? modified : roll;
  }

  /**
   * Reduce custom for rolls
   *
   * @param {boolean} down Is down of up success
   * @param {number} success Success limit
   * @param {string | null} keyDiceProperty Optional key to check success
   * @returns {number} Sum of
   */
  private reduceDices(
    down: boolean,
    success: number,
    keyDiceProperty: string | null = null
  ): number {
    return this.dices.filter((dice) => {
      return this.checkDownUp(
        down,
        this.isModified(dice.roll, dice.rollModified),
        !keyDiceProperty ? success : dice[keyDiceProperty]
      );
    }).length;
  }

  /**
   * Coin launch any times
   *
   * @param {number} times Times of head and tails
   * @returns {ResponseRoll} Array of rolls and count
   */
  public headOrTails(times: number = 1): ResponseRoll {
    const arrRoll = this.rollDices(times, 2).map((v) => {
      return v != 1 ? Constants.TAILS : Constants.HEAD;
    });
    const countTails = arrRoll.filter(
      (v) => v == Constants.TAILS
    ).length;
    const countHead = arrRoll.filter(
      (v) => v == Constants.HEAD
    ).length;
    const success =
      countTails == countHead
        ? Constants.TIE
        : countTails > countHead
        ? Constants.TAILS
        : Constants.HEAD;
    const rolls: ResponseRoll = {
      rolls: arrRoll,
      success: success,
      countSuccess:
        success == Constants.TAILS ? countTails : countHead,
      countFail: success != Constants.TAILS ? countTails : countHead,
    };
    return rolls;
  }

  /**
   * Check success
   *
   * @param {number} success Roll limit to check
   * @param {number} dicesSuccess Number of rolls needed for success
   * @param {boolean} Optional down Check up or down
   * @returns {ResponseRoll} Array of rolls and counters
   */
  public checkSuccess(
    success: number,
    dicesSuccess: number = 1,
    down: boolean = false
  ): ResponseRoll | Error {
    if (this.dices.length == 0)
      return new Error(Constants.ERROR_NO_DICES);
    const response: ResponseRoll = {
      rolls: this.mapRolls(Constants.ROL),
      modifiedRolls: this.mapRolls(Constants.MODIFIED_ROL),
      success:
        this.reduceDices(down, success) >= dicesSuccess
          ? Constants.YES
          : Constants.NO,
      countSuccess: this.reduceDices(down, success),
      countFail: this.dices.length - this.reduceDices(down, success),
      countCritical: this.reduceDices(
        down,
        success,
        Constants.CRITICAL
      ),
      countFailure: this.reduceDices(
        !down,
        success,
        Constants.FAILURE
      ),
    };
    return response;
  }
}
