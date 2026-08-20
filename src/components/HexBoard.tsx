import { Stage, Layer, Group, RegularPolygon, Circle, Text } from 'react-konva';
import type { IHexTile } from '../models/BoardTypes';

const HEX_SIZE = 50;

const RESOURCE_COLORS: Record<string, string> = {
  drvo: '#4A6741',
  cigla: '#C1652F',
  zito: '#E8B923',
  ovca: '#8FB93E',
  ruda: '#8A8D91',
  pustinja: '#E8D8B0',
};

function axialToPixel(q: number, r: number, size: number) {
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * 1.5 * r;
  return { x, y };
}

interface HexBoardProps {
  tiles: IHexTile[];
}

const HexBoard = ({ tiles }: HexBoardProps) => {
  const stageSize = 560;
  const center = stageSize / 2;

  return (
    <Stage width={stageSize} height={stageSize}>
      <Layer>
        {tiles.map((tile) => {
          const { x, y } = axialToPixel(tile.q, tile.r, HEX_SIZE);
          const posX = center + x;
          const posY = center + y;

          return (
            <Group key={tile.id}>
              <RegularPolygon
                x={posX}
                y={posY}
                sides={6}
                radius={HEX_SIZE}
                fill={RESOURCE_COLORS[tile.resource]}
                stroke="#3A1F12"
                strokeWidth={2}
              />
              {tile.numberToken && (
                <>
                  <Circle
                    x={posX}
                    y={posY}
                    radius={16}
                    fill="#FAF6EF"
                    stroke="#5B2A06"
                    strokeWidth={1.5}
                  />
                  <Text
                    x={posX - 16}
                    y={posY - 9}
                    width={32}
                    align="center"
                    text={String(tile.numberToken)}
                    fontSize={16}
                    fontStyle="bold"
                    fill="#5B2A06"
                  />
                </>
              )}
            </Group>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default HexBoard;