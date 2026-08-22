import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGameById, updateGame } from '../services/gameStorage';
import type { StoredGame, StoredPlayer } from '../services/gameStorage';
import { rollDiceWithFallback } from '../services/diceService';
import type { DiceResult } from '../models/IDiceRoller';
import HexBoard from '../components/HexBoard';
import Button from '../components/Button';
import WinnerModal from '../components/WinnerModal';
import './GameBoard.css';

const MAX_ROLLS_PER_PLAYER = 15;

const getTotalResources = (player: StoredPlayer): number =>
  Object.values(player.resources).reduce((sum, count) => sum + count, 0);

const getWinner = (players: StoredPlayer[]): StoredPlayer | null => {
  if (players.length === 0) return null;
  return [...players].sort((a, b) => getTotalResources(b) - getTotalResources(a))[0];
};

const GameBoard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<StoredGame | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<DiceResult | null>(null);
  const [rollSource, setRollSource] = useState<'random.org' | 'lokalno' | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = getGameById(id);
    if (found) {
      setGame(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleRoll = async () => {
    if (!game || game.status === 'zavrsena') return;
    setRolling(true);

    const { result, source } = await rollDiceWithFallback();
    setLastRoll(result);
    setRollSource(source);

    const updatedPlayers = game.players.map((p) => ({ ...p, resources: { ...p.resources } }));
    const currentPlayer = updatedPlayers[game.currentPlayerIndex ?? 0];

    const matchingTiles = game.board.filter(
      (tile) => tile.numberToken === result.total && tile.resource !== 'pustinja'
    );

    matchingTiles.forEach((tile) => {
      const key = tile.resource;
      currentPlayer.resources[key] = (currentPlayer.resources[key] || 0) + 1;
    });

    const newRollHistory = [...game.rollHistory, result];
    const nextPlayerIndex = (game.currentPlayerIndex + 1) % updatedPlayers.length;
    const maxTotalRolls = MAX_ROLLS_PER_PLAYER * updatedPlayers.length;
    const isGameOver = newRollHistory.length >= maxTotalRolls;

    const updated: StoredGame = {
      ...game,
      players: updatedPlayers,
      rollHistory: newRollHistory,
      currentPlayerIndex: nextPlayerIndex,
      status: isGameOver ? 'zavrsena' : 'u toku',
    };

    updateGame(updated);
    setGame(updated);
    setRolling(false);

    if (isGameOver) {
      setShowWinnerModal(true);
    }
  };

  if (notFound) {
    return (
      <div className="board-page">
        <p>Partija nije pronađena.</p>
        <Link to="/partije">Nazad na partije</Link>
      </div>
    );
  }

  if (!game) {
    return <div className="board-page">Učitavanje...</div>;
  }

  const currentPlayer = game.players[game.currentPlayerIndex ?? 0];
  const isFinished = game.status === 'zavrsena';
  const winner = isFinished ? getWinner(game.players) : null;
  const currentRound = Math.min(
    Math.floor(game.rollHistory.length / game.players.length) + 1,
    MAX_ROLLS_PER_PLAYER
  );

  return (
    <div className="board-page">
      <div className="board-header">
        <button className="board-back" onClick={() => navigate('/partije')}>
          ← Nazad na partije
        </button>
        <h1 className="board-title">{game.name}</h1>
      </div>

      {isFinished && winner && (
        <div className="game-over-banner">
          🏆 Partija je završena! Pobednik: <strong>{winner.name}</strong> ({getTotalResources(winner)} resursa)
          <button className="game-over-banner__replay" onClick={() => setShowWinnerModal(true)}>
            Prikaži ponovo 🎉
          </button>
        </div>
      )}

      <div className="board-layout">
        <div>
          <div className="board-canvas">
            <HexBoard tiles={game.board} />
          </div>

          <div className="dice-section">
            {!isFinished ? (
              <div>
                <p className="current-turn">
                  Na potezu: <strong>{currentPlayer?.name}</strong> · runda {currentRound} od {MAX_ROLLS_PER_PLAYER}
                </p>
                <Button onClick={handleRoll} disabled={rolling}>
                  {rolling ? 'Bacanje...' : 'Baci kockice'}
                </Button>
              </div>
            ) : (
              <p className="current-turn">Partija je završena.</p>
            )}
            {lastRoll && (
              <div className="dice-result">
                <span className="dice-face">{lastRoll.die1}</span>
                <span className="dice-face">{lastRoll.die2}</span>
                <span className="dice-total">= {lastRoll.total}</span>
                <span className="dice-source">
                  ({rollSource === 'random.org' ? 'Random.org' : 'lokalno generisano'})
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="board-players">
          <h2 className="board-players__title">Igrači</h2>
          {game.players.map((player, index) => (
            <div
              key={player.id}
              className={`player-card ${!isFinished && index === game.currentPlayerIndex ? 'player-card--active' : ''} ${isFinished && winner?.id === player.id ? 'player-card--winner' : ''}`}
            >
              <div className="player-card__header">
                <span className="player-card__dot" style={{ backgroundColor: player.color }} />
                <span className="player-card__name">{player.name}</span>
                {!isFinished && index === game.currentPlayerIndex && (
                  <span className="player-card__turn-badge">na potezu</span>
                )}
                {isFinished && winner?.id === player.id && (
                  <span className="player-card__turn-badge">🏆 pobednik</span>
                )}
              </div>
              <div className="player-card__resources">
                <span>Drvo: {player.resources.drvo}</span>
                <span>Cigla: {player.resources.cigla}</span>
                <span>Žito: {player.resources.zito}</span>
                <span>Ovca: {player.resources.ovca}</span>
                <span>Ruda: {player.resources.ruda}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showWinnerModal && winner && (
        <WinnerModal
          winnerName={winner.name}
          totalResources={getTotalResources(winner)}
          onClose={() => setShowWinnerModal(false)}
        />
      )}
    </div>
  );
};

export default GameBoard;