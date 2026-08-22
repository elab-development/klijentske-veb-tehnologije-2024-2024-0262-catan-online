import { useState, useEffect } from 'react';
import { useLocalGames } from '../hooks/useLocalGames';
import BarChart from '../components/BarChart';
import './Statistics.css';

const RESOURCE_LABELS: Record<string, string> = {
  drvo: 'Drvo',
  cigla: 'Cigla',
  zito: 'Žito',
  ovca: 'Ovca',
  ruda: 'Ruda',
};

const Statistics = () => {
  const { games } = useLocalGames();
  const [selectedGameId, setSelectedGameId] = useState('');

  useEffect(() => {
    if (!selectedGameId && games.length > 0) {
      setSelectedGameId(games[0].id);
    }
  }, [games, selectedGameId]);

  const selectedGame = games.find((g) => g.id === selectedGameId) ?? null;

  if (games.length === 0) {
    return (
      <div className="stats-page">
        <h1 className="stats-title">Statistika partije</h1>
        <p className="stats-empty">Nema sačuvanih partija. Napravi partiju da vidiš statistiku.</p>
      </div>
    );
  }

  const rollCounts = Array.from({ length: 11 }, (_, i) => {
    const sum = i + 2;
    const count = selectedGame?.rollHistory.filter((r) => r.total === sum).length ?? 0;
    return { label: String(sum), value: count };
  });

  const resourceTotals = Object.keys(RESOURCE_LABELS).map((key) => {
    const total = selectedGame?.players.reduce(
      (sum, player) => sum + (player.resources[key] || 0),
      0
    ) ?? 0;
    return { label: RESOURCE_LABELS[key], value: total };
  });

  const playerTotals = selectedGame?.players.map((player) => ({
    label: player.name,
    value: Object.values(player.resources).reduce((sum, count) => sum + count, 0),
  })) ?? [];

  const mostCommonRoll = rollCounts.reduce(
    (max, item) => (item.value > max.value ? item : max),
    rollCounts[0]
  );

  return (
    <div className="stats-page">
      <h1 className="stats-title">Statistika partije</h1>

      <div className="stats-select-wrapper">
        <label className="form-field__label">Izaberi partiju</label>
        <select
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="stats-select"
        >
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name} ({new Date(game.createdAt).toLocaleDateString('sr-RS')})
            </option>
          ))}
        </select>
      </div>

      {selectedGame && (
        <>
          <div className="stats-summary">
            <div className="stats-summary__item">
              <span className="stats-summary__value">{selectedGame.rollHistory.length}</span>
              <span className="stats-summary__label">Ukupno bacanja</span>
            </div>
            <div className="stats-summary__item">
              <span className="stats-summary__value">{mostCommonRoll.label}</span>
              <span className="stats-summary__label">Najčešći zbir</span>
            </div>
            <div className="stats-summary__item">
              <span className="stats-summary__value">{selectedGame.status === 'u toku' ? 'U toku' : 'Završena'}</span>
              <span className="stats-summary__label">Status partije</span>
            </div>
          </div>

          <div className="stats-section">
            <h2 className="stats-section__title">Raspodela bacanja kockica</h2>
            <BarChart data={rollCounts} />
          </div>

          <div className="stats-section">
            <h2 className="stats-section__title">Ukupni resursi po tipu</h2>
            <BarChart data={resourceTotals} color="#4A6741" />
          </div>

          <div className="stats-section">
            <h2 className="stats-section__title">Ukupni resursi po igraču</h2>
            <BarChart data={playerTotals} color="#C1652F" />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;