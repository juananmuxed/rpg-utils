export interface ResponseRoll {
    rolls: Array<number | string | undefined>,
    modifiedRolls?: Array<number | string | undefined>,
    success:string,
    countSuccess: number,
    countFail: number,
    countCritical?: number,
    countFailure?: number
}