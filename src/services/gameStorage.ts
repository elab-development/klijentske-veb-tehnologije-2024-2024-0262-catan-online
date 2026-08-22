import { GameSession } from '../models/GameSession';
import type { IHexTile } from '../models/BoardTypes';
import type { DiceResult } from '../models/IDiceRoller';

export interface StoredPlayer {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  resources: Record<string, number>;
  victoryPoints: number;
  developmentCards: string[];
}

export interface StoredGame {
  id: string;
  name: string;
  board: IHexTile[];
  players: StoredPlayer[];
  rollHistory: DiceResult[];
  status: 'u toku' | 'zavrsena';
  currentPlayerIndex: number;
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

interface PlayerInput {
  name: string;
  avatar?: string;
}

export const createGame = (name: string, players: PlayerInput[]): StoredGame => {
  const colors = ['#C1652F', '#4A6741', '#8A8D91', '#E8B923'];
  const session = new GameSession(name);
  players.forEach((p, index) => session.addPlayer(p.name, colors[index % colors.length]));

  const stored: StoredGame = {
    id: session.id,
    name: session.name,
    board: session.board,
    players: session.players.map((p, index) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      avatar: players[index]?.avatar,
      resources: p.resources,
      victoryPoints: p.victoryPoints,
      developmentCards: [],
    })),
    rollHistory: session.rollHistory,
    status: session.status,
    currentPlayerIndex: session.currentPlayerIndex,
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