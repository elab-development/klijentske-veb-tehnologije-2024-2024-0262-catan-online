import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGameById } from '../services/gameStorage';
import type { StoredGame } from '../services/gameStorage';
import HexBoard from '../components/HexBoard';
import './GameBoard.css';

const GameBoard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<StoredGame | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = getGameById(id);
    if (found) {
      setGame(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

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

  return (
    <div className="board-page">
      <div className="board-header">
        <button className="board-back" onClick={() => navigate('/partije')}>
          ← Nazad na partije
        </button>
        <h1 className="board-title">{game.name}</h1>
      </div>

      <div className="board-layout">
        <div className="board-canvas">
          <HexBoard tiles={game.board} />
        </div>

        <div className="board-players">
          <h2 className="board-players__title">Igrači</h2>
          {game.players.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-card__header">
                <span className="player-card__dot" style={{ backgroundColor: player.color }} />
                <span className="player-card__name">{player.name}</span>
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
    </div>
  );
};

export default GameBoard;