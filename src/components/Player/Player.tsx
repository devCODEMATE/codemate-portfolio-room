// src/components/Player/Player.tsx

import './Player.css';

interface PlayerProps {
  x: number;
  y: number;
}

function Player({ x, y }: PlayerProps) {
  return (
    <div
      className="player"
      style={{ left: x, top: y }}
    />
  );
}

export default Player;