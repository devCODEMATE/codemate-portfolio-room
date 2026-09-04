import type { Station } from '../types/station';

export const stations: Station[] = [
  { id: 'about',    kind: 'panel',      position: { x: 412, y: 1103 }, hitboxRadius: 192 },
  { id: 'skills',   kind: 'panel',      position: { x: 1340, y: 265 }, hitboxRadius: 212 },
  { id: 'projects', kind: 'panel',      position: { x: 2259, y: 318 }, hitboxRadius: 270 },
  { id: 'contact',  kind: 'panel',      position: { x: 1702, y: 1099 }, hitboxRadius: 220 },
  { id: 'naga',     kind: 'easter-egg', position: { x: 670, y: 391 }, hitboxRadius: 139 },
];