import { Dice } from "../src";

const rolls = [
    { faces: 6, min: 1, max: 6},
    { faces: 20, min: 1, max: 20}
]

describe('Checking roll random range', () => {
    rolls.forEach(test => {
        const rolls = new Dice(test.faces);
        it('Check roll d' + test.faces + ' expecting range 1-' + test.faces, () =>{
            rolls.launch()
            expect(test.faces).toBeGreaterThanOrEqual(test.min);
            expect(test.faces).toBeLessThanOrEqual(test.max);
        });
    });
});