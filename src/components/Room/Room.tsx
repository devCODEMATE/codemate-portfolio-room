// src/components/Room/Room.tsx

import { useState, useEffect } from 'react';
import { stations } from '../../data/stations';
import type { Station } from '../../types/station';
import { translations, type Language } from '../../data/translations';
import { useKeyboard } from '../../hooks/useKeyboard';
import Player, { type Direction } from '../Player/Player';
import roomBg from '../../assets/room/room-background.png';
import './Room.css';
import TouchControls from '../TouchControls/TouchControls';

const ROOM_WIDTH = 2556;
const ROOM_HEIGHT = 1900;
const SPEED = 7;

type Point = { x: number; y: number };

const WALKABLE_BOUNDARY: Point[] = [
  { x: 2250, y: 1269 }, { x: 1030, y: 1269 }, { x: 1030, y: 1624 },
  { x: 720, y: 1656 }, { x: 718, y: 1298 }, { x: 228, y: 1282 },
  { x: 255, y: 30 }, { x: 2398, y: 30 }, { x: 2395, y: 1266 },
];
const OBSTACLE_POLYGONS: Point[][] = [
  [
    { x: 2011, y: 140 }, { x: 2022, y: 430 }, { x: 2360, y: 449 }, { x: 2352, y: 167 },
  ],
  [
    { x: 858, y: 226 }, { x: 847, y: 333 }, { x: 640, y: 331 },
    { x: 642, y: 427 }, { x: 610, y: 487 }, { x: 245, y: 489 }, { x: 255, y: 153 },
  ],
];

const OBSTACLE_RECTS = [
  { xMin: 231, xMax: 863, yMin: 516, yMax: 755 },     // estante decorativo
  { xMin: 374, xMax: 683, yMin: 882, yMax: 1086 },    // mesa de comedor + sillas
  { xMin: 2263, xMax: 2427, yMin: 1000, yMax: 1282 }, // lámpara + planta esquina
  { xMin: 1046, xMax: 1511, yMin: 51, yMax: 336 },    // biblioteca
  { xMin: 1384, xMax: 1637, yMin: 516, yMax: 876 },   // mesita teléfono - parte vertical (planta)
  { xMin: 1516, xMax: 1890, yMin: 801, yMax: 1046 },  // mesita teléfono - parte horizontal (corregida)
];

const WALL_RECTS = [
  { xMin: 1513, xMax: 1632, yMin: 27, yMax: 347 }, // biombo/divisor junto a biblioteca
];

function isPointInPolygon(x: number, y: number, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isWalkable(x: number, y: number): boolean {
  if (!isPointInPolygon(x, y, WALKABLE_BOUNDARY)) return false;

  for (const poly of OBSTACLE_POLYGONS) {
    if (isPointInPolygon(x, y, poly)) return false;
  }

  for (const r of OBSTACLE_RECTS) {
    if (x >= r.xMin && x <= r.xMax && y >= r.yMin && y <= r.yMax) return false;
  }

  for (const r of WALL_RECTS) {
    if (x >= r.xMin && x <= r.xMax && y >= r.yMin && y <= r.yMax) return false;
  }

  return true;
}

function Room() {
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [commits, setCommits] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 1200, y: 500 });
  const [direction, setDirection] = useState<Direction>('down');
  const [nearbyStation, setNearbyStation] = useState<Station | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugLog, setDebugLog] = useState<{ x: number; y: number }[]>([]);

  const keysPressed = useKeyboard();
  const t = translations[language];

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

        let nextX = x;
        let nextY = y;

        if (keys.has('w') || keys.has('arrowup')) { nextY -= SPEED; setDirection('up'); }
        if (keys.has('s') || keys.has('arrowdown')) { nextY += SPEED; setDirection('down'); }
        if (keys.has('a') || keys.has('arrowleft')) { nextX -= SPEED; setDirection('left'); }
        if (keys.has('d') || keys.has('arrowright')) { nextX += SPEED; setDirection('right'); }

        if (isWalkable(nextX, y)) x = nextX;
        if (isWalkable(x, nextY)) y = nextY;

        return { x, y };
      });

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [keysPressed, activeStation]);

  useEffect(() => {
    const found = stations.find((station) => {
      const dx = station.position.x - playerPos.x;
      const dy = station.position.y - playerPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < station.hitboxRadius;
    });
    setNearbyStation(found ?? null);
  }, [playerPos]);

  function interact() {
    if (nearbyStation) {
      setActiveStation(nearbyStation);
      setCommits((c) => c + 1);
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'e') interact();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyStation]);

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

  useEffect(() => {
    function toggleDebug(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'o') {
        setDebugMode((d) => !d);
      }
    }
    window.addEventListener('keydown', toggleDebug);
    return () => window.removeEventListener('keydown', toggleDebug);
  }, []);

  function handleRoomClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!debugMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = rect.width / ROOM_WIDTH;
    const x = Math.round((e.clientX - rect.left) / scale);
    const y = Math.round((e.clientY - rect.top) / scale);
    setDebugLog((log) => [...log, { x, y }]);
  }

  return (
    <>
      <div className="room-viewport">
        <div
          className="room"
          style={{ backgroundImage: `url(${roomBg})` }}
          onClick={handleRoomClick}
        >
          <Player x={playerPos.x} y={playerPos.y} direction={direction} />

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

          {debugMode && debugLog.length > 0 && (
            <div
              className="debug-marker"
              style={{
                left: debugLog[debugLog.length - 1].x,
                top: debugLog[debugLog.length - 1].y,
              }}
            >
              #{debugLog.length}
            </div>
          )}

          {debugMode && (
            <svg
              className="debug-svg"
              viewBox={`0 0 ${ROOM_WIDTH} ${ROOM_HEIGHT}`}
            >
              <polygon
                points={WALKABLE_BOUNDARY.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="rgba(0,255,0,0.15)"
                stroke="lime"
                strokeWidth={6}
              />
              {OBSTACLE_POLYGONS.map((poly, i) => (
                <polygon
                  key={i}
                  points={poly.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="rgba(255,0,0,0.4)"
                  stroke="red"
                  strokeWidth={4}
                />
              ))}
              {OBSTACLE_RECTS.map((r, i) => (
                <rect
                  key={i}
                  x={r.xMin}
                  y={r.yMin}
                  width={r.xMax - r.xMin}
                  height={r.yMax - r.yMin}
                  fill="rgba(255,140,0,0.4)"
                  stroke="orange"
                  strokeWidth={4}
                />
              ))}
              {WALL_RECTS.map((r, i) => (
                <rect
                  key={`wall-${i}`}
                  x={r.xMin}
                  y={r.yMin}
                  width={r.xMax - r.xMin}
                  height={r.yMax - r.yMin}
                  fill="rgba(80,80,255,0.4)"
                  stroke="blue"
                  strokeWidth={4}
                />
              ))}
              {stations.map((station) => (
                <circle
                  key={station.id}
                  cx={station.position.x}
                  cy={station.position.y}
                  r={station.hitboxRadius}
                  fill="rgba(0,200,255,0.15)"
                  stroke="cyan"
                  strokeWidth={4}
                />
              ))}
            </svg>
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
        <TouchControls keysPressed={keysPressed} onInteract={interact} />
      </div>

      {debugMode && (
        <div className="debug-log">
          <strong>Clicks registrados:</strong>
          <ol>
            {debugLog.map((p, i) => (
              <li key={i}>{p.x}, {p.y}</li>
            ))}
          </ol>
          <button onClick={() => setDebugLog([])}>Limpiar</button>
        </div>
      )}
    </>
  );
}

export default Room;