export type ResourceType = 'drvo' | 'cigla' | 'zito' | 'ovca' | 'ruda' | 'pustinja';

export interface IHexTile {
  id: string;
  q: number;
  r: number;
  resource: ResourceType;
  numberToken: number | null;
}