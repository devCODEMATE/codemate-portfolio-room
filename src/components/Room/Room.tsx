// src/components/Room/Room.tsx

import { useState, useEffect } from 'react';
import { stations } from '../../data/stations';
import type { Station } from '../../types/station';
import { translations, type Language } from '../../data/translations';
import { useKeyboard } from '../../hooks/useKeyboard';
import Player from '../Player/Player';
import roomBg from '../../assets/room/room-background.png';
import './Room.css';

const ROOM_WIDTH = 2556;
const ROOM_HEIGHT = 1900;
const SPEED = 12;

function Room() {
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [commits, setCommits] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 1200, y: 500 });
  const [nearbyStation, setNearbyStation] = useState<Station | null>(null);

  const keysPressed = useKeyboard();
  const t = translations[language];

  // loop de movimiento
  useEffect(() => {
    let frameId: number;

    function tick() {
      if (activeStation?.kind === 'panel') {
        frameId = requestAnimationFrame(tick);
        return;
      }

      setPlayerPos((prev) => {
        let { x, y } = prev;
        const keys = keysPressed.current;

        if (keys.has('w') || keys.has('arrowup')) y -= SPEED;
        if (keys.has('s') || keys.has('arrowdown')) y += SPEED;
        if (keys.has('a') || keys.has('arrowleft')) x -= SPEED;
        if (keys.has('d') || keys.has('arrowright')) x += SPEED;

        x = Math.max(0, Math.min(ROOM_WIDTH, x));
        y = Math.max(0, Math.min(ROOM_HEIGHT, y));

        return { x, y };
      });

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [keysPressed, activeStation]);

  // detectar cercania a una estacion
  useEffect(() => {
    const found = stations.find((station) => {
      const dx = station.position.x - playerPos.x;
      const dy = station.position.y - playerPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < station.hitboxRadius;
    });
    setNearbyStation(found ?? null);
  }, [playerPos]);

  // tecla E para interactuar
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'e' && nearbyStation) {
        setActiveStation(nearbyStation);
        setCommits((c) => c + 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyStation]);

  // tecla Escape o Espacio para cerrar el panel
  useEffect(() => {
    function handleClose(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setActiveStation(null);
      }
    }
    window.addEventListener('keydown', handleClose);
    return () => window.removeEventListener('keydown', handleClose);
  }, []);

  return (
    <div className="room-viewport">
      <div className="room" style={{ backgroundImage: `url(${roomBg})` }}>
        <Player x={playerPos.x} y={playerPos.y} />

        {nearbyStation && !activeStation && (
          <div
            className="interact-hint"
            style={{
              left: nearbyStation.position.x,
              top: nearbyStation.position.y - 90,
            }}
          >
            <kbd>E</kbd> {t.hud.interact}
          </div>
        )}

        {activeStation?.kind === 'easter-egg' && (
          <div
            className="speech-bubble"
            style={{
              left: activeStation.position.x,
              top: activeStation.position.y - 70,
            }}
            onAnimationEnd={() => setActiveStation(null)}
          >
            {t.stations[activeStation.id]}
          </div>
        )}

        {activeStation?.kind === 'panel' && (
          <div className="modal-overlay" onClick={() => setActiveStation(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveStation(null)}>×</button>
              <h2>{t.stations[activeStation.id]}</h2>
              <p>{t.stations[activeStation.id]} {t.modalPlaceholder}</p>
            </div>
          </div>
        )}
      </div>

      <div className="hud-controls">
        <span className="key-group">
          <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> {t.hud.move}
        </span>
        <span className="key-group">
          <kbd>E</kbd> {t.hud.interact}
        </span>
        <span className="key-group">
          <kbd>Space</kbd> {t.hud.close}
        </span>
      </div>

      <div className="hud-commits">
        <span className="commits-icon">{'</>'}</span> {commits} {t.hud.commits}
      </div>

      <div className="hud-language">
        <button
          className={language === 'en' ? 'lang-btn active' : 'lang-btn'}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
        <button
          className={language === 'es' ? 'lang-btn active' : 'lang-btn'}
          onClick={() => setLanguage('es')}
        >
          ES
        </button>
      </div>

      <div className="hud-brand">{'<CodeMate>'}</div>
    </div>
  );
}

export default Room;