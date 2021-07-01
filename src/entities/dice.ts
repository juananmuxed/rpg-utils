export class Dice {
    private _faces: number;
    private _roll:number;
    constructor(Faces: number) {
        this._faces = Faces;
        this._roll = 1;
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
    * @params {number} mod Modificator for the launch
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
    * @returns {Promise} Random number for the Dice
    */
    public async asyncLaunch(mod:number = 0, min:number | null = null, max:number | null = null):Promise<number> {
        return new Promise((resolve:Function, reject:Function) => {
            let dice = this.launch(mod,min,max);
            if(dice) resolve(dice);
            else reject(new Error('Error unknow'));
        });
    }
    /*
    * Modificate Roll
    * 
    * @returns {number} Modificated roll
    */
    public modificateRoll(mod:number, min:number | null = null, max:number | null = null):number {
        this.roll += mod;
        if(min && this.roll < min) this.roll = min;
        if(max && this.roll > max) this.roll = max;
        return this.roll;
    }
}