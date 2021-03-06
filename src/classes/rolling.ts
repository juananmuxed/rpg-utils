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
   * @param {number} faces Faces for this roll
   */
  private pushRolls(
    rolls: number = 1,
    faces: number = this.faces
  ): void {
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
  private setProp(key: string, value: number): void {
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
  private modifyRoll(index: number, mod: number): void {
    this.dices[index].modification = mod;
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
   * @returns {Array<number | undefined >} Array of mapped values by key
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
   * @param {number} faces Faces for this roll
   * @returns {Array<number | undefined>} Array of random rolls
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
   * @param {number} faces Faces for this roll
   * @returns {Promise<Array<number | undefined>>} Promise of array of random rolls
   */
  public async rollDicesAsync(
    dices: number = 1,
    faces: number = this.faces
  ): Promise<Array<number | undefined>> {
    return new Promise((resolve: Function) => {
      resolve(this.rollDices(dices, faces));
    });
  }

  /**
   * Add new rolls to pool and return an array of rolls
   *
   * @params {number} dices Number of new rolls
   * @param {number} faces Faces for this roll
   * @returns {Array<number | undefined>} Array of random rolls
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
  public sumRolls(): number | undefined {
    if (this.dices.length == 0) return undefined;

    const mapped = this.mapRolls(Constants.ROL);
    return mapped.reduce((prev, current) => {
      return ((prev as number) += current as number);
    });
  }

  /**
   * Modify rolls
   *
   * @params {number} mod Modification for the roll
   * @returns {Array<number | undefined>} Array of random rolls modified or empty array if not set
   */
  public modifyRolls(mod: number): Array<number | undefined> {
    if (this.dices.length == 0) return [];
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
