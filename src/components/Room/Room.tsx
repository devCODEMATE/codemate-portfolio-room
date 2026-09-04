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
import StationPanel from '../StationPanel/StationPanel';

const ROOM_WIDTH = 2556;
const ROOM_HEIGHT = 1900;
const SPEED = 7;

type Point = { x: number; y: number };

const WALKABLE_BOUNDARY: Point[] = [
  { x: 2491, y: 86 }, { x: 2483, y: 1410 }, { x: 1065, y: 1410 },
  { x: 1047, y: 1657 }, { x: 479, y: 1649 }, { x: 500, y: 1410 },
  { x: 54, y: 1396 }, { x: 78, y: 32 }, { x: 2489, y: 24 },
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
  { xMin: 253, xMax: 570, yMin: 995, yMax: 1211 },    // mesa (about)
  { xMin: 2330, xMax: 2497, yMin: 1119, yMax: 1407 }, // lámpara + planta esquina
  { xMin: 1195, xMax: 1485, yMin: 110, yMax: 420 },   // biblioteca
  { xMin: 1496, xMax: 1908, yMin: 1022, yMax: 1176 }, // aparador (reemplaza mesita teléfono)
];

const WALL_RECTS = [
  { xMin: 1496, xMax: 1628, yMin: 40, yMax: 417 }, // biombo/divisor junto a biblioteca (actualizado)
];

const WALL_POLYGONS: Point[][] = [
  [
    { x: 1359, y: 581 }, { x: 1364, y: 979 }, { x: 1900, y: 990 },
    { x: 1902, y: 837 }, { x: 1639, y: 837 }, { x: 1620, y: 570 },
  ],
  [
    { x: 823, y: 309 }, { x: 839, y: 54 }, { x: 94, y: 126 },
    { x: 86, y: 484 }, { x: 608, y: 471 }, { x: 613, y: 331 },
  ],
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

  for (const poly of WALL_POLYGONS) {
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
  const [playerPos, setPlayerPos] = useState({ x: 855, y: 1376 });
  const [direction, setDirection] = useState<Direction>('up');
  const [nearbyStation, setNearbyStation] = useState<Station | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugLog, setDebugLog] = useState<{ x: number; y: number }[]>([]);
  const [roomScale, setRoomScale] = useState(1);

  const keysPressed = useKeyboard();
  const t = translations[language];

  useEffect(() => {
    function updateScale() {
      const horizontalPadding = 32;
      const available = Math.min(950, window.innerWidth - horizontalPadding);
      setRoomScale(available / ROOM_WIDTH);
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
    if (!import.meta.env.DEV) return;

    function toggleDebug(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'o') {
        setDebugMode((d) => !d);
      }
    }
    window.addEventListener('keydown', toggleDebug);
    return () => window.removeEventListener('keydown', toggleDebug);
  }, []);

  function handleRoomClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!import.meta.env.DEV || !debugMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = rect.width / ROOM_WIDTH;
    const x = Math.round((e.clientX - rect.left) / scale);
    const y = Math.round((e.clientY - rect.top) / scale);
    setDebugLog((log) => [...log, { x, y }]);
  }

  return (
    <>
      <div className="hud-header">
        <span className="hud-header-prompt">&gt;</span> Lia Florencia Cervini — Frontend Developer
      </div>

      <div
        className="room-viewport"
        style={{ width: ROOM_WIDTH * roomScale, height: ROOM_HEIGHT * roomScale }}
      >
        <div
          className="room"
          style={{ backgroundImage: `url(${roomBg})`, transform: `scale(${roomScale})` }}
          onClick={handleRoomClick}
        >
          <Player x={playerPos.x} y={playerPos.y} direction={direction} />

          <svg className="room-outline" viewBox={`0 0 ${ROOM_WIDTH} ${ROOM_HEIGHT}`}>
            <polygon
              points={WALKABLE_BOUNDARY.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#ffd166"
              strokeWidth={12}
            />
          </svg>

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
              {WALL_POLYGONS.map((poly, i) => (
                <polygon
                  key={`wallpoly-${i}`}
                  points={poly.map((p) => `${p.x},${p.y}`).join(' ')}
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

      {activeStation?.kind === 'panel' && (
        <div className="modal-overlay" onClick={() => setActiveStation(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveStation(null)}>×</button>
            <h2>{t.stations[activeStation.id]}</h2>
            <StationPanel station={activeStation} language={language} />
          </div>
        </div>
      )}

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