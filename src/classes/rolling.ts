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
    public rollDices() {
        this.rolls = Array.from({length:this.dices}).fill(1).map(() => {
            return new Dice(this.faces).launch();
        });
        return this.rolls;
    }
        
    /*
    * Async return a Promise array of random rolls
    * 
    * @returns {Array<number>} Array of random rolls
    */
    public async rollDicesAsync() {
        this.rolls = Array();
        return new Promise((resolve:Function, reject:Function) => {
            for (let i = 0; i < this.dices; i++) {
                new Dice(this.faces).asyncLaunch().then(res => {
                    this.addRoll(res);
                })
            }
            if(this.rolls) resolve(this.rolls);
            else reject(new Error('Error unknow'));
        })
    }
}