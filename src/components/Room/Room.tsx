// src/components/Room/Room.tsx

import { useState } from 'react';
import { stations } from '../../data/stations';
import type { Station } from '../../types/station';
import { translations, type Language } from '../../data/translations';
import roomBg from '../../assets/room/room-background.png';
import './Room.css';

function Room() {
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [commits, setCommits] = useState(0);

  const t = translations[language];

  function handleInteract(station: Station) {
    setActiveStation(station);
    setCommits((c) => c + 1);
  }

  return (
    <div className="room-viewport">
      <div className="room" style={{ backgroundImage: `url(${roomBg})` }}>
        {stations.map((station) => (
          <button
            key={station.id}
            className={`hotspot hotspot--${station.kind}`}
            style={{
              left: station.position.x - station.hitboxRadius,
              top: station.position.y - station.hitboxRadius,
              width: station.hitboxRadius * 2,
              height: station.hitboxRadius * 2,
            }}
            onClick={() => handleInteract(station)}
            aria-label={t.stations[station.id]}
          />
        ))}

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

      {/* HUD: controles abajo a la izquierda */}
      <div className="hud-controls">
        <span className="key-group">
          <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> {t.hud.move}
        </span>
        <span className="key-group">
          <kbd>E</kbd> {t.hud.interact}
        </span>
      </div>

      {/* HUD: contador de commits arriba a la derecha */}
      <div className="hud-commits">
        <span className="commits-icon">{'</>'}</span> {commits} {t.hud.commits}
      </div>

      {/* Selector de idioma, arriba a la izquierda */}
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

      {/* Marca CodeMate, abajo a la derecha */}
      <div className="hud-brand">{'<CodeMate>'}</div>
    </div>
  );
}

export default Room;