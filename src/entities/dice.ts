export class Dice {
    private _faces: number;
    private _roll:number;
    constructor(Faces: number = 6, Roll: number = 1) {
        this._faces = Faces;
        this._roll = Roll;
    }

    public get faces() : number {
        return this._faces;
    }
    
    public set faces(value : number) {
        this._faces = value;
    }

    public get roll() : number {
        return this._roll;
    }
    
    public set roll(value : number) {
        this._roll = value;
    }
    
    /*
    * Return a random roll for the Dice
    * 
    * @params {number} mod Modificator for the launch, default 0
    * @params {number} min Min roll, default null
    * @params {number} max Max roll, default null
    * @returns {number} Random number for the Dice
    */
    public launch(mod:number = 0, min:number | null = null, max:number | null = null):number {
        this.roll = Math.floor((Math.random() * this.faces) + 1);
        this.modificateRoll(mod,min,max);
        return this.roll;
    }
    /*
    * Async Return a random roll for the Dice
    * 
    * @params {number} mod Modificator for the launch, default 0
    * @params {number} min Min roll, default null
    * @params {number} max Max roll, default null
    * @returns {Promise} Random number for the Dice
    */
    public async asyncLaunch(mod:number = 0, min:number | null = null, max:number | null = null):Promise<number> {
        return new Promise((resolve:Function, reject:Function) => {
            try {
                const dice = this.launch(mod,min,max);
                if(dice) resolve(dice);
                else reject(new Error('No roll'));
            } catch (error) {
                reject(error);
            }
        });
    }
    /*
    * Modificate Roll
    * 
    * @params {number} mod Modificator for the launch
    * @params {number} min Min roll, default null
    * @params {number} max Max roll, default null
    * @returns {number} Modificated roll
    */
    public modificateRoll(mod:number, min:number | null = null, max:number | null = null):number {
        this.roll += mod;
        if(min && this.roll < min) this.roll = min;
        if(max && this.roll > max) this.roll = max;
        return this.roll;
    }

    /*
    * Check Success of a roll
    * 
    * @param {number} limit Limit to check
    * @param {Boolean} low Above or under, default false
    * @returns {Object} success and the difference between limit and roll
    */
    public checkSuccess(limit: number, low: Boolean = false): Object {
        return {
            success: !low ? this.roll >= limit : this.roll <= limit,
            rollSuccess: !low ? this.roll - limit : limit - this.roll
        }
    }
}