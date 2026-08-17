import type { ReactNode } from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className="info-card">
      {icon && <div className="info-card__icon">{icon}</div>}
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__description">{description}</p>
    </div>
  );
};

export default InfoCard;