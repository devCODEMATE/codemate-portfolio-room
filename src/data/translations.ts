// src/data/translations.ts

export type Language = 'en' | 'es';

export const translations = {
  en: {
    stations: {
      about: 'About me',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      naga: 'Meow!',
    },
    hud: {
      move: 'Move',
      interact: 'Interact',
      commits: 'commits',
    },
    modalPlaceholder: 'content coming soon.',
  },
  es: {
    stations: {
      about: 'Sobre mí',
      skills: 'Skills',
      projects: 'Proyectos',
      contact: 'Contacto',
      naga: '¡Miau!',
    },
    hud: {
      move: 'Moverse',
      interact: 'Interactuar',
      commits: 'commits',
    },
    modalPlaceholder: 'contenido próximamente.',
  },
} as const;