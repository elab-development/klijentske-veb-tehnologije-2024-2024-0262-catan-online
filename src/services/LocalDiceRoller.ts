import type { IDiceRoller, DiceResult } from '../models/IDiceRoller';

export class LocalDiceRoller implements IDiceRoller {
  async roll(): Promise<DiceResult> {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    return { die1, die2, total: die1 + die2 };
  }
}