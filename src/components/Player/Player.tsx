// src/components/Player/Player.tsx

import playerFront from '../../assets/player/player-front.png';
import playerBack from '../../assets/player/player-back.png';
import playerSide from '../../assets/player/player-side.png';
import './Player.css';

export type Direction = 'down' | 'up' | 'left' | 'right';

interface PlayerProps {
  x: number;
  y: number;
  direction: Direction;
}

function Player({ x, y, direction }: PlayerProps) {
  let sprite = playerFront;
  if (direction === 'up') sprite = playerBack;
  if (direction === 'left' || direction === 'right') sprite = playerSide;

  const isFlipped = direction === 'left';

  return (
    <img
      src={sprite}
      className="player"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scaleX(${isFlipped ? -1 : 1})`,
      }}
      alt=""
    />
  );
}

export default Player;