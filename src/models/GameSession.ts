import { Player } from './Player';
import type { IHexTile } from './BoardTypes';
import type { IDiceRoller, DiceResult } from './IDiceRoller';
import { generateHexBoard } from '../services/boardGenerator';

export type GameStatus = 'u toku' | 'zavrsena';

export class GameSession {
  id: string;
  name: string;
  board: IHexTile[];
  players: Player[];
  rollHistory: DiceResult[];
  status: GameStatus;
  createdAt: string;

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.board = generateHexBoard();
    this.players = [];
    this.rollHistory = [];
    this.status = 'u toku';
    this.createdAt = new Date().toISOString();
  }

  addPlayer(name: string, color: string) {
    this.players.push(new Player(name, color));
  }

  async rollDice(roller: IDiceRoller): Promise<DiceResult> {
    const result = await roller.roll();
    this.rollHistory.push(result);
    return result;
  }

  getVictoryLeader(): Player | null {
    if (this.players.length === 0) return null;
    return [...this.players].sort((a, b) => b.victoryPoints - a.victoryPoints)[0];
  }

  finish() {
    this.status = 'zavrsena';
  }
}

export default GameSession;