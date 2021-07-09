import { RpgUtils } from "../src";

const rolls = [
    {dices: 1, faces: 6, min: 1, max: 6},
    {dices: 10, faces: 20, min: 1, max: 20}
]

describe('Checking roll length', () => {
    rolls.forEach(test => {
        const rolls = new Rolling(test.faces,test.dices);
        it('Check roll ' + test.dices + 'd' + test.faces + ' expecting length of ' + test.dices, () =>{
            expect(rolls.rollDices().length).toBe(test.dices);
        });
    });
});

describe('Checking roll random range', () => {
    rolls.forEach(test => {
        const rolls = new Rolling(test.faces,test.dices);
        it('Check roll ' + test.dices + 'd' + test.faces + ' expecting range 1-' + test.faces, () =>{
            rolls.rollDices().forEach(roll => {
                expect(roll).toBeGreaterThanOrEqual(1);
                expect(roll).toBeLessThanOrEqual(test.faces)
            });
        });
    });
});