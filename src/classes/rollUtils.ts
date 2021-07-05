import { Dice } from "../entities/dice";

export class RollUtils {
            
    /*
    * Coin launch
    * 
    * @returns {String} String HEAD or TAILS
    */
    public headOrTails():String {
        return new Dice(2).launch() != 1 ? 'HEAD' : 'TAILS';
    }
} 