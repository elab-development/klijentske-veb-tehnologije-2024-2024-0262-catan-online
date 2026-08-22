import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Button from './Button';
import './WinnerModal.css';

interface WinnerModalProps {
  winnerName: string;
  victoryPoints: number;
  totalResources: number;
  onClose: () => void;
}

const WinnerModal = ({ winnerName, victoryPoints, totalResources, onClose }: WinnerModalProps) => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="winner-modal-overlay">
      <div className="winner-modal">
        <div className="winner-modal__trophy">🏆</div>
        <h2 className="winner-modal__title">Partija je završena!</h2>
        <p className="winner-modal__winner-name">{winnerName}</p>
        <p className="winner-modal__subtitle">
          {victoryPoints} pobedničkih poena · {totalResources} sakupljenih resursa
        </p>
        <Button onClick={onClose}>Odlično!</Button>
      </div>
    </div>
  );
};

export default WinnerModal;