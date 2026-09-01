// src/components/TouchControls/TouchControls.tsx

import type { RefObject } from 'react';
import './TouchControls.css';

type Props = {
  keysPressed: RefObject<Set<string>>;
  onInteract: () => void;
};

const DIRECTIONS = [
  { key: 'w', label: '↑', className: 'dpad-up' },
  { key: 'a', label: '←', className: 'dpad-left' },
  { key: 's', label: '↓', className: 'dpad-down' },
  { key: 'd', label: '→', className: 'dpad-right' },
];

function TouchControls({ keysPressed, onInteract }: Props) {
  function press(key: string) {
    keysPressed.current.add(key);
  }
  function release(key: string) {
    keysPressed.current.delete(key);
  }

  return (
    <div className="touch-controls">
      <div className="dpad">
        {DIRECTIONS.map(({ key, label, className }) => (
          <button
            key={key}
            className={`dpad-btn ${className}`}
            onTouchStart={(e) => { e.preventDefault(); press(key); }}
            onTouchEnd={(e) => { e.preventDefault(); release(key); }}
            onTouchCancel={() => release(key)}
            onContextMenu={(e) => e.preventDefault()}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        className="interact-btn"
        onTouchStart={(e) => { e.preventDefault(); onInteract(); }}
        onContextMenu={(e) => e.preventDefault()}
      >
        E
      </button>
    </div>
  );
}

export default TouchControls;