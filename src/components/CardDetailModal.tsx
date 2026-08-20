import type { MouseEvent } from 'react';
import './CardDetailModal.css';

interface CardDetailModalProps {
  image: string;
  title: string;
  acquisition: string;
  purpose: string;
  onClose: () => void;
}

const CardDetailModal = ({ image, title, acquisition, purpose, onClose }: CardDetailModalProps) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="card-modal-overlay" onClick={handleOverlayClick}>
      <div className="card-modal">
        <button className="card-modalclose" onClick={onClose} aria-label="Zatvori">
          ✕
        </button>
        <div className="card-modalimage-side">
          <img src={image} alt={title} className="card-modalimage" />
        </div>
        <div className="card-modalinfo-side">
          <h2 className="card-modaltitle">{title}</h2>
          <p className="card-modallabel">Nabavka i osnovna funkcija resursa</p>
          <p className="card-modaltext">
            <strong>Dobijanje:</strong> {acquisition}
          </p>
          <p className="card-modaltext">
            <strong>Svrha:</strong> {purpose}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;