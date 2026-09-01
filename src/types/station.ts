// src/types/station.ts

export type StationId = 'about' | 'projects' | 'skills' | 'contact' | 'naga';
export type StationKind = 'panel' | 'easter-egg';

export interface Position {
  x: number;
  y: number;
}

export interface Station {
  id: StationId;
  kind: StationKind;
  position: Position;
  hitboxRadius: number;
}