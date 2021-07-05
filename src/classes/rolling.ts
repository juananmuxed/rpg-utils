import { Dice } from "../entities/dice";

export class Rolling {
    private _faces:number;
    private _dices:number;
    private _rolls:Array<number>;

    constructor(Faces:number = 6,Dices:number = 1) {
        this._faces = Faces;
        this._dices = Dices;
        this._rolls = new Array()
    }

    public get dices() : number {
        return this._dices
    }
    
    public set dices(v : number) {
        this._dices = v;
    }

    public get faces() : number {
        return this._faces
    }
    
    public set faces(v : number) {
        this._faces = v;
    }
    
    public get rolls() : Array<number> {
        return this._rolls
    }
    
    public set rolls(v : Array<number>) {
        this._rolls = v;
    }
        
    /*
    * Add a roll to Pool of Rolls
    * PRIVATE
    * 
    * @param {number} roll Roll to add to Pool
    */
    private addRoll(roll:number) {
        this.rolls.push(roll);
    }
        
    /*
    * Return an array of random rolls
    * 
    * @returns {Array<number>} Array of random rolls
    */
    public rollDices(mod:number = 0, min:number | null = null, max:number | null = null) {
        this.rolls = Array.from({length:this.dices}).fill(1).map(() => {
            return new Dice(this.faces).launch(mod, min, max);
        });
        return this.rolls;
    }
        
    /*
    * Async return a Promise array of random rolls
    * 
    * @returns {Array<number>} Array of random rolls
    */
    public async rollDicesAsync(mod:number = 0, min:number | null = null, max:number | null = null) {
        this.rolls = Array();
        return new Promise((resolve:Function, reject:Function) => {
            try {
                for (let i = 0; i < this.dices; i++) {
                    new Dice(this.faces).asyncLaunch(mod, min, max).then(res => {
                        this.addRoll(res);
                    })
                }
                if(this.rolls) resolve(this.rolls);
                else reject(new Error('No rolls'));
            } catch (error) {
                reject(error);
            }
        })
    }

    /*
    * Add new rolls to pool and return an array of rolls
    * 
    * @returns {Array<number>} Array of random rolls
    * @params {number} dices Number of new rolls
    */
    public addNewRolls(dices: number = 1) {
        for (let i = 0; i < dices; i++) {
            this.addRoll(new Dice(this.faces).launch());
        }
        return this.rolls;
    }

    /*
    * Async add new rolls to pool and return an array of rolls
    * 
    * @returns {Array<number>} Array of random rolls
    * @params {number} dices Number of new rolls
    */
    public async addNewRollsAsync(dices: number = 1) {
        return new Promise((resolve:Function, reject:Function) => {
            try {                
                for (let i = 0; i < dices; i++) {
                    new Dice(this.faces).asyncLaunch().then(res => {
                        this.addRoll(res);
                    })
                }
                if(this.rolls) resolve(this.rolls);
                else reject(new Error('No rolls'));
            } catch (error) {
                reject(error);
            }
        })
    }
        
    /*
    * Modify roll from a specific position
    * 
    * @returns {Array<number>} Array of random rolls
    * @params {number} index Position of the array
    * @params {number} mod Modificator for the launch
    * @params {number} min Min roll, default null
    * @params {number} max Max roll, default null
    */
    public modifyRoll(index: number, mod:number, min:number | null = null, max:number | null = null):Array<number> {
        const dice = new Dice(this.faces, this.rolls[index])
        dice.modificateRoll(mod, min, max);
        this.rolls[index] = dice.roll;
        return this.rolls;
    }
        
    /*
    * Modify rolls
    * 
    * @returns {Array<number>} Array of random rolls
    * @params {number} mod Modificator for the launch
    * @params {number} min Min roll, default null
    * @params {number} max Max roll, default null
    */
    public modifyAllRolls(mod:number, min:number | null = null, max:number | null = null):Array<number> {
        this.rolls.forEach((v,i) => {
            this.modifyRoll(i,mod,min,max)
        });
        return this.rolls;
    }

    /*
    * Sum rolls
    * 
    * @returns {number} Sum of all rolls in the pool
    */
    public sumRolls():number {
        return this.rolls.reduce((a,v) => {
            return a + v;
        });
    }

    /*
    * Check success
    * 
    * @returns {Array<Objects>} Array of all success
    * @param {number} limit Limit to check
    * @param {Boolean} low Above or under, default false
    */
    public checkAllSuccess(limit: number, low: Boolean = false): Array<Object> {
        return this.rolls.map(v => {
            return new Dice(this.faces, v).checkSuccess(limit,low);
        });
    }
}