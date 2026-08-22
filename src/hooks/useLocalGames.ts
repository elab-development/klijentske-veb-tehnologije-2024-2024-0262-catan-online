import { useState, useEffect, useCallback } from 'react';
import { getAllGames, createGame as createGameService, deleteGame as deleteGameService } from '../services/gameStorage';
import type { StoredGame } from '../services/gameStorage';

interface PlayerInput {
  name: string;
  avatar?: string;
}

export const useLocalGames = () => {
  const [games, setGames] = useState<StoredGame[]>([]);

  const refresh = useCallback(() => {
    setGames(getAllGames());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createGame = (name: string, players: PlayerInput[]) => {
    createGameService(name, players);
    refresh();
  };

  const deleteGame = (id: string) => {
    deleteGameService(id);
    refresh();
  };

  return { games, createGame, deleteGame };
};