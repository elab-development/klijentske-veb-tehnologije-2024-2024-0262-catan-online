export type DevelopmentCardType = 'action' | 'pobednicki-poen';

export interface DevelopmentCardDefinition {
  title: string;
  type: DevelopmentCardType;
}

export const DEVELOPMENT_CARD_POOL: DevelopmentCardDefinition[] = [
  { title: 'Vitez', type: 'action' },
  { title: 'Vitez', type: 'action' },
  { title: 'Vitez', type: 'action' },
  { title: 'Vitez', type: 'action' },
  { title: 'Godina izobilja', type: 'action' },
  { title: 'Godina izobilja', type: 'action' },
  { title: 'Monopol', type: 'action' },
  { title: 'Monopol', type: 'action' },
  { title: 'Gradnja puteva', type: 'action' },
  { title: 'Gradnja puteva', type: 'action' },
  { title: 'Univerzitet', type: 'pobednicki-poen' },
  { title: 'Biblioteka', type: 'pobednicki-poen' },
  { title: 'Market', type: 'pobednicki-poen' },
  { title: 'Velika dvorana', type: 'pobednicki-poen' },
  { title: 'Kapela', type: 'pobednicki-poen' },
];

export const drawRandomDevelopmentCard = (): DevelopmentCardDefinition => {
  const index = Math.floor(Math.random() * DEVELOPMENT_CARD_POOL.length);
  return DEVELOPMENT_CARD_POOL[index];
};