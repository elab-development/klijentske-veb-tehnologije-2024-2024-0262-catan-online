import './GameCard.css';

interface GameCardProps {
  name: string;
  playerCount: number;
  status: 'u toku' | 'zavrsena';
  createdAt: string;
  onOpen: () => void;
  onDelete: () => void;
}

const GameCard = ({ name, playerCount, status, createdAt, onOpen, onDelete }: GameCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('sr-RS');

  return (
    <div className="game-card">
      <div className="game-cardinfo">
        <h3 className="game-cardname">{name}</h3>
        <p className="game-cardmeta">{playerCount} igrača · {formattedDate}</p>
        <span className={`game-cardstatus game-cardstatus--${status === 'u toku' ? 'active' : 'done'}`}>
          {status === 'u toku' ? 'U toku' : 'Završena'}
        </span>
      </div>
      <div className="game-cardactions">
        <button className="game-cardopen" onClick={onOpen}>Otvori</button>
        <button className="game-carddelete" onClick={onDelete}>Obriši</button>
      </div>
    </div>
  );
};

export default GameCard;