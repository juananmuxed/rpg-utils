import { Constants } from "../utils/constants";
import { Dice } from "../interfaces/dice";

export class Rolling {
  private _faces: number;
  private _dices: Array<Dice>;

  constructor(Faces: number = 6) {
    this._faces = Faces;
    this._dices = Array<Dice>();
  }

  public get dices(): Array<Dice> {
    return this._dices;
  }

  public set dices(v: Array<Dice>) {
    this._dices = v;
  }

  public get faces(): number {
    return this._faces;
  }

  public set faces(v: number) {
    this._faces = v;
  }

  /**
   * Return a random number
   * PRIVATE
   *
   * @returns {number} Random number between 1 and Faces
   */
  private roll(): number {
    return Math.floor(Math.random() * this.faces + 1);
  }

  /**
   * Push rolls in the pool
   * PRIVATE
   *
   * @param {number} rolls Number of new rolls
   * @param Optional {number} faces Faces for this roll
   */
  private pushRolls(rolls: number = 1, faces: number = this.faces) {
    const oldFaces = this.faces;
    if (faces != this.faces) {
      this.faces = faces;
    }
    for (let i = 0; i < rolls; i++) {
      let roll = this.roll();
      this.dices.push({
        faces: this.faces,
        roll: roll,
        rollModified: roll,
        min: 1,
        max: this.faces,
      });
    }
    if (oldFaces != this.faces) {
      this.faces = oldFaces;
    }
  }

  /**
   * Set property by key
   * PRIVATE
   *
   * @param {number} key Key of the property
   * @param {number | boolean} value Value to the key
   */
  private setProp(key: string, value: number) {
    this.dices.forEach((dice, index) => {
      this.dices[index][key] = value;
    });
  }

  /**
   * Modify roll
   * PRIVATE
   *
   * @param {number} index Index to modify
   * @param {number} mod Modification to roll
   */
  private modifyRoll(index: number, mod: number) {
    this.dices[index].modificator = mod;
    this.dices[index].rollModified = this.dices[index].roll + mod;
    if (this.dices[index].max < this.dices[index].rollModified)
      this.dices[index].rollModified = this.dices[index].max;
    if (this.dices[index].min > this.dices[index].rollModified)
      this.dices[index].rollModified = this.dices[index].min;
  }

  /**
   * Map rolls by key
   * PRIVATE
   *
   * @param {number} key Number of new rolls
   * @returns {Array<number | undefined | boolean>} Array of maped values by key
   */
  protected mapRolls(key: string): Array<number | undefined> {
    return this.dices.map((dice) => {
      return dice[key];
    });
  }

  /**
   * Clean Pool of Dices
   */
  public cleanPoolOfDices() {
    this.dices = Array<Dice>();
  }

  /**
   * Return an array of random rolls
   *
   * @param {number} dices Number of dices to roll
   * @param Optional {number} faces Faces for this roll
   * @returns {Array<number | undefined | boolean>} Array of random rolls
   **/
  public rollDices(
    dices: number = 1,
    faces: number = this.faces
  ): Array<number | undefined> {
    this.cleanPoolOfDices();
    this.pushRolls(dices, faces);
    return this.mapRolls(Constants.ROL);
  }

  /**
   * Async return a Promise array of random rolls
   *
   * @param {number} dices Number of dices to roll
   * @param Optional {number} faces Faces for this roll
   * @returns {Promise<Array<number | undefined | boolean> | Error>} Promise of array of random rolls
   */
  public async rollDicesAsync(
    dices: number = 1,
    faces: number = this.faces
  ): Promise<Array<number | undefined> | Error> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const arrDices: Array<number | undefined | boolean> =
          this.rollDices(dices, faces);
        if (arrDices) resolve(arrDices);
        else reject(new Error(Constants.ERROR_NO_ROLL));
      } catch (error) {
        console.error(error);
        reject(new Error(Constants.ERROR_UNKNOW));
      }
    });
  }

  /**
   * Add new rolls to pool and return an array of rolls
   *
   * @params {number} dices Number of new rolls
   * @param Optional {number} faces Faces for this roll
   * @returns {Array<number | undefined | boolean>} Array of random rolls
   */
  public addNewRolls(
    dices: number = 1,
    faces: number = this.faces
  ): Array<number | undefined> {
    this.pushRolls(dices, faces);
    return this.mapRolls(Constants.ROL);
  }

  /**
   * Sum rolls
   *
   * @returns {number} Sum of all rolls in the pool
   */
  public sumRolls(): number | Error {
    return this.dices.length == 0
      ? new Error(Constants.ERROR_NO_DICES)
      : this.dices
          .map((dice) => {
            return dice.roll;
          })
          .reduce((prev, current) => {
            return (!prev ? 0 : prev) + (!current ? 0 : current);
          });
  }

  /**
   * Modify rolls
   *
   * @returns {Array<number | undefined | boolean> | Error} Array of random rolls modified
   * @params {number} mod Modificator for the roll
   */
  public modifyRolls(mod: number): Array<number | undefined> | Error {
    if (this.dices.length == 0)
      return new Error(Constants.ERROR_NO_DICES);
    for (let i = 0; i < this.dices.length; i++) {
      this.modifyRoll(i, mod);
    }
    return this.mapRolls(Constants.MODIFIED_ROL);
  }

  /**
   * Set Critical
   *
   * @params {number} roll Critical roll to check
   */
  public setCritical(roll: number) {
    this.setProp(Constants.CRITICAL, roll);
  }

  /**
   * Set Failure
   *
   * @params {number} roll Critical roll to check
   */
  public setFailure(roll: number) {
    this.setProp(Constants.FAILURE, roll);
  }
}
