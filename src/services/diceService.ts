import { RandomOrgDiceRoller } from './RandomOrgDiceRoller';
import { LocalDiceRoller } from './LocalDiceRoller';
import type { DiceResult } from '../models/IDiceRoller';

export type DiceSource = 'random.org' | 'lokalno';

export const rollDiceWithFallback = async (): Promise<{ result: DiceResult; source: DiceSource }> => {
  try {
    const result = await new RandomOrgDiceRoller().roll();
    return { result, source: 'random.org' };
  } catch {
    const result = await new LocalDiceRoller().roll();
    return { result, source: 'lokalno' };
  }
};