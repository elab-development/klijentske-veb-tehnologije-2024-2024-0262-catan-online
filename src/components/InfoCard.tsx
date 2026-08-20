import type { ReactNode } from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const InfoCard = ({ title, description, icon, onClick }: InfoCardProps) => {
  return (
    <div
      className={`info-card ${onClick ? 'info-card--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <div className="info-card__icon">{icon}</div>}
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__description">{description}</p>
    </div>
  );
};

export default InfoCard;