import type { IDiceRoller, DiceResult } from '../models/IDiceRoller';

export class RandomOrgDiceRoller implements IDiceRoller {
  async roll(): Promise<DiceResult> {
    const response = await fetch(
      'https://www.random.org/integers/?num=2&min=1&max=6&col=1&base=10&format=plain&rnd=new'
    );

    if (!response.ok) {
      throw new Error('Random.org API nije dostupan.');
    }

    const text = await response.text();
    const numbers = text
      .trim()
      .split('\n')
      .map((n) => parseInt(n.trim(), 10));

    const [die1, die2] = numbers;
    return { die1, die2, total: die1 + die2 };
  }
}