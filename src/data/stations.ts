// src/data/stations.ts

import type { Station } from '../types/station';

export const stations: Station[] = [
  { id: 'about',    label: 'Sobre mí', kind: 'panel',      position: { x: 545,  y: 950 }, hitboxRadius: 90 },
  { id: 'skills',   label: 'Skills',   kind: 'panel',      position: { x: 1170, y: 210 }, hitboxRadius: 90 },
  { id: 'projects', label: 'Proyectos',kind: 'panel',      position: { x: 2050, y: 320 }, hitboxRadius: 100 },
  { id: 'contact',  label: 'Contacto', kind: 'panel',      position: { x: 1630, y: 880 }, hitboxRadius: 80 },
  { id: 'naga',     label: '¡Miau!',   kind: 'easter-egg', position: { x: 590,  y: 380 }, hitboxRadius: 70 },
];