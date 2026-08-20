import type { ReactNode } from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const InfoCard = ({ title, description, icon, onClick, className }: InfoCardProps) => {
  return (
    <div
     className={`info-card ${onClick ? 'info-card--clickable' : ''} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <div className="info-card__icon">{icon}</div>}
      <h3 className="info-cardtitle">{title}</h3>
      <p className="info-card__description">{description}</p>
    </div>
  );
};

export default InfoCard;