export interface DiceResult {
  die1: number;
  die2: number;
  total: number;
}

export interface IDiceRoller {
  roll(): Promise<DiceResult>;
}