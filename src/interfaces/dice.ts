export interface Dice {
    [index: string]: number | undefined,
    faces: number,
    roll: number,
    rollModified: number,
    modificator?: number,
    critical?: number,
    failure?:number,
    min: number,
    max: number
}