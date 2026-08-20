import { GameSession } from '../models/GameSession';
import type { IHexTile } from '../models/BoardTypes';
import type { DiceResult } from '../models/IDiceRoller';

export interface StoredPlayer {
  id: string;
  name: string;
  color: string;
  resources: Record<string, number>;
  victoryPoints: number;
}

export interface StoredGame {
  id: string;
  name: string;
  board: IHexTile[];
  players: StoredPlayer[];
  rollHistory: DiceResult[];
  status: 'u toku' | 'zavrsena';
  createdAt: string;
}

const GAMES_KEY = 'catan_games';

const getGames = (): StoredGame[] => {
  const raw = localStorage.getItem(GAMES_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveGames = (games: StoredGame[]) => {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
};

export const getAllGames = (): StoredGame[] => getGames();

export const getGameById = (id: string): StoredGame | undefined =>
  getGames().find((g) => g.id === id);

export const createGame = (name: string, playerNames: string[]): StoredGame => {
  const colors = ['#C1652F', '#4A6741', '#8A8D91', '#E8B923'];
  const session = new GameSession(name);
  playerNames.forEach((playerName, index) => session.addPlayer(playerName, colors[index % colors.length]));

  const stored: StoredGame = {
    id: session.id,
    name: session.name,
    board: session.board,
    players: session.players.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      resources: p.resources,
      victoryPoints: p.victoryPoints,
    })),
    rollHistory: session.rollHistory,
    status: session.status,
    createdAt: session.createdAt,
  };

  saveGames([...getGames(), stored]);
  return stored;
};

export const deleteGame = (id: string) => {
  saveGames(getGames().filter((g) => g.id !== id));
};

export const updateGame = (updated: StoredGame) => {
  saveGames(getGames().map((g) => (g.id === updated.id ? updated : g)));
};