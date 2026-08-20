import './CardTile.css';

interface CardTileProps {
  image: string;
  title: string;
  acquisition: string;
  purpose: string;
  onClick?: () => void;
}

const CardTile = ({ image, title, acquisition, purpose, onClick }: CardTileProps) => {
  return (
    <div className="card-tile" onClick={onClick}>
      <img src={image} alt={title} className="card-tileimage" />
      <div className="card-tilebody">
        <h3 className="card-tiletitle">{title}</h3>
        <p className="card-tiletext">
          <strong>Dobijanje:</strong> {acquisition}
        </p>
        <p className="card-tile__text">
          <strong>Svrha:</strong> {purpose}
        </p>
      </div>
    </div>
  );
};

export default CardTile;