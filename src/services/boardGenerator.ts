import type { IHexTile, ResourceType } from '../models/BoardTypes';

const AXIAL_COORDINATES: Array<{ q: number; r: number }> = [
  { q: 0, r: -2 }, { q: 1, r: -2 }, { q: 2, r: -2 },
  { q: -1, r: -1 }, { q: 0, r: -1 }, { q: 1, r: -1 }, { q: 2, r: -1 },
  { q: -2, r: 0 }, { q: -1, r: 0 }, { q: 0, r: 0 }, { q: 1, r: 0 }, { q: 2, r: 0 },
  { q: -2, r: 1 }, { q: -1, r: 1 }, { q: 0, r: 1 }, { q: 1, r: 1 },
  { q: -2, r: 2 }, { q: -1, r: 2 }, { q: 0, r: 2 },
];

const RESOURCE_POOL: ResourceType[] = [
  'drvo', 'drvo', 'drvo', 'drvo',
  'cigla', 'cigla', 'cigla',
  'ruda', 'ruda', 'ruda',
  'zito', 'zito', 'zito', 'zito',
  'ovca', 'ovca', 'ovca', 'ovca',
  'pustinja',
];

const NUMBER_POOL = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getNeighbors(
  tile: { q: number; r: number },
  allTiles: { q: number; r: number; numberToken: number | null }[]
) {
  const directions = [
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 },
  ];
  return allTiles.filter((t) =>
    directions.some((d) => t.q === tile.q + d.q && t.r === tile.r + d.r)
  );
}

export function generateHexBoard(): IHexTile[] {
  const resources = shuffle(RESOURCE_POOL);

  const tiles: IHexTile[] = AXIAL_COORDINATES.map((coord, index) => ({
    id: `tile-${index}`,
    q: coord.q,
    r: coord.r,
    resource: resources[index],
    numberToken: null,
  }));

  const nonDesertTiles = tiles.filter((t) => t.resource !== 'pustinja');

  let attempts = 0;
  let valid = false;

  while (!valid && attempts < 50) {
    const numbers = shuffle(NUMBER_POOL);
    nonDesertTiles.forEach((tile, index) => {
      tile.numberToken = numbers[index];
    });

    valid = nonDesertTiles.every((tile) => {
      if (tile.numberToken !== 6 && tile.numberToken !== 8) return true;
      const neighbors = getNeighbors(tile, nonDesertTiles);
      return neighbors.every((n) => n.numberToken !== 6 && n.numberToken !== 8);
    });

    attempts++;
  }

  return tiles;
}