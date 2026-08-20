import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalGames } from '../hooks/useLocalGames';
import GameCard from '../components/GameCard';
import FormField from '../components/FormField';
import Button from '../components/Button';
import './Games.css';

const ITEMS_PER_PAGE = 4;

const Games = () => {
  const { games, createGame, deleteGame } = useLocalGames();
  const navigate = useNavigate();

  const [newGameName, setNewGameName] = useState('');
  const [playerCount, setPlayerCount] = useState(3);

  const [statusFilter, setStatusFilter] = useState<'sve' | 'u toku' | 'zavrsena'>('sve');
  const [playerFilter, setPlayerFilter] = useState<'svi' | '2' | '3' | '4'>('svi');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName.trim()) return;

    const playerNames = Array.from({ length: playerCount }, (_, i) => `Igrač ${i + 1}`);
    createGame(newGameName.trim(), playerNames);
    setNewGameName('');
    setCurrentPage(1);
  };

  const filteredGames = games.filter((game) => {
    const statusMatch = statusFilter === 'sve' || game.status === statusFilter;
    const playerMatch = playerFilter === 'svi' || game.players.length === Number(playerFilter);
    return statusMatch && playerMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="games-page">
      <h1 className="games-title">Lokalne partije</h1>

      <form className="games-create" onSubmit={handleCreate}>
        <FormField
          id="gameName"
          label="Naziv partije"
          type="text"
          value={newGameName}
          onChange={(e) => setNewGameName(e.target.value)}
        />
        <div className="games-create__players">
          <label className="form-field__label">Broj igrača</label>
          <select
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="games-create__select"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <Button type="submit">Nova partija</Button>
      </form>

      <div className="games-filters">
        <div className="games-filters__group">
          <label className="form-field__label">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as typeof statusFilter);
              setCurrentPage(1);
            }}
          >
            <option value="sve">Sve</option>
            <option value="u toku">U toku</option>
            <option value="zavrsena">Završene</option>
          </select>
        </div>

        <div className="games-filters__group">
          <label className="form-field__label">Broj igrača</label>
          <select
            value={playerFilter}
            onChange={(e) => {
              setPlayerFilter(e.target.value as typeof playerFilter);
              setCurrentPage(1);
            }}
          >
            <option value="svi">Svi</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="games-list">
        {paginatedGames.length === 0 && (
          <p className="games-empty">Nema partija koje odgovaraju filterima.</p>
        )}
        {paginatedGames.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            playerCount={game.players.length}
            status={game.status}
            createdAt={game.createdAt}
            onOpen={() => navigate(`/partije/${game.id}`)}
            onDelete={() => deleteGame(game.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="games-pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            ← Prethodna
          </button>
          <span>Strana {currentPage} od {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Sledeća →
          </button>
        </div>
      )}
    </div>
  );
};

export default Games;