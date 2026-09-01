// src/data/stations.ts

import type { Station } from '../types/station';

export const stations: Station[] = [
  { id: 'about',    kind: 'panel',      position: { x: 545,  y: 950 }, hitboxRadius: 90 },
  { id: 'skills',   kind: 'panel',      position: { x: 1170, y: 210 }, hitboxRadius: 90 },
  { id: 'projects', kind: 'panel',      position: { x: 2050, y: 320 }, hitboxRadius: 100 },
  { id: 'contact',  kind: 'panel',      position: { x: 1630, y: 880 }, hitboxRadius: 80 },
  { id: 'naga',     kind: 'easter-egg', position: { x: 590,  y: 380 }, hitboxRadius: 70 },
];