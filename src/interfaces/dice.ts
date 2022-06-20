export interface Dice {
  [index: string]: number | undefined;
  faces: number;
  roll: number;
  rollModified: number;
  modification?: number;
  critical?: number;
  failure?: number;
  min: number;
  max: number;
}
