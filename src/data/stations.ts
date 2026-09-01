// src/data/stations.ts

import type { Station } from '../types/station';

export const stations: Station[] = [
  { id: 'about',    kind: 'panel',      position: { x: 517,  y: 1004 }, hitboxRadius: 90 },
  { id: 'skills',   kind: 'panel',      position: { x: 1280, y: 266 },  hitboxRadius: 90 },
  { id: 'projects', kind: 'panel',      position: { x: 2191, y: 366 },  hitboxRadius: 140 },
  { id: 'contact',  kind: 'panel',      position: { x: 1621, y: 954 },  hitboxRadius: 110 },
  { id: 'naga',     kind: 'easter-egg', position: { x: 718,  y: 414 },  hitboxRadius: 50 },
];