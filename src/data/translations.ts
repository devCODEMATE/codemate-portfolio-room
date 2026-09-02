// src/data/translations.ts

export type Language = 'en' | 'es';

export type ProjectItem = {
  name: string;
  tech: string;
  description: string;
  live?: string;
  github: string;
};

export type SkillGroup = {
  icon: string;
  title: string;
  items: string;
};

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
      close: 'Close',
      commits: 'commits',
    },
    modalPlaceholder: 'content coming soon.',
    content: {
      about:
        'Self-taught junior frontend developer proficient in JavaScript, HTML/CSS, React, TypeScript, and Python. Previously, over a decade of management and customer service experience in the public sector (ARBA), with measurable results in response-time reduction and customer satisfaction. I combine that analytical foundation with active technical training to add value from day one on a development team.',
      skills: [
        { icon: '🧠', title: 'Languages & Core', items: 'JavaScript (ES6+), HTML5, CSS3, Canvas API, React, TypeScript, Python' },
        { icon: '🛠️', title: 'Tools & Workflow', items: 'Git/GitHub, GitHub Actions (CI/CD), Node.js, Vitest' },
        { icon: '📊', title: 'Data & APIs', items: 'REST APIs, i18n, data pipeline architecture' },
        { icon: '🤖', title: 'AI Tools', items: 'Claude Code, ChatGPT, Gemini' },
        { icon: '🎨', title: 'Design', items: 'Canva' },
      ] as SkillGroup[],
      projects: [
        {
          name: 'CodeMate Sign Translator',
          tech: 'JavaScript, TensorFlow.js, Computer Vision',
          description: 'Browser-based Argentine Sign Language (LSA) translator using TensorFlow.js handpose and blazeface models, recognizing letters and courtesy words in real time with speech output.',
          live: 'devcodemate.github.io/sign-translator/translator.html',
          github: 'github.com/devCODEMATE/sign-translator',
        },
        {
          name: 'The Great Catscape',
          tech: 'JavaScript, HTML5 Canvas, Game Development',
          description: 'Pixel-art endless runner with a delta-time based game loop, AABB collision detection, and a 5-level progressive difficulty system — built without frameworks or external APIs.',
          live: 'devcodemate.github.io/the-great-catscape',
          github: 'github.com/devCODEMATE/the-great-catscape',
        },
        {
          name: 'CodeMate Pokedex Collection',
          tech: 'JavaScript, Node.js, REST API, i18n',
          description: 'Custom Node.js pipeline syncing 23,000+ cards from the TCGdex API in EN/ES, with 3D album-flip navigation and drag-and-drop reordering via Pointer Events.',
          live: 'devcodemate.github.io/codemate-pokedex-collection',
          github: 'github.com/devCODEMATE/codemate-pokedex-collection',
        },
        {
          name: 'CodeMate Deck Lab',
          tech: 'JavaScript, Data Processing, Probability',
          description: 'Pokémon TCG toolkit with a hand simulator based on hypergeometric probability and a damage calculator, prioritizing mathematical precision over a local data catalog.',
          live: 'devcodemate.github.io/codemate-deck-lab',
          github: 'github.com/devCODEMATE/codemate-deck-lab',
        },
        {
          name: 'CodeMate Weather',
          tech: 'JavaScript, REST API, Vitest, i18n',
          description: 'Dynamic background system adapting to time of day, weather, season, and hemisphere, with EN/ES i18n and unit tests written from the start.',
          live: 'devcodemate.github.io/codemate-weather-app',
          github: 'github.com/devCODEMATE/codemate-weather-app',
        },
        {
          name: 'World Cup 2026 Tracker',
          tech: 'JavaScript, GitHub Actions, CI/CD',
          description: 'Automated hourly GitHub Actions pipeline consuming live tournament data, calculating standings and the elimination bracket with no manual intervention.',
          live: 'devcodemate.github.io/world-cup-2026',
          github: 'github.com/devCODEMATE/world-cup-2026',
        },
      ] as ProjectItem[],
      contact: {
        email: 'dev.codemate@gmail.com',
        linkedin: 'linkedin.com/in/code-mate',
        github: 'github.com/devCODEMATE',
        location: 'La Plata, Buenos Aires, Argentina',
      },
    },
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
      close: 'Cerrar',
      commits: 'commits',
    },
    modalPlaceholder: 'contenido próximamente.',
    content: {
      about:
        'Desarrolladora frontend junior, autodidacta, con dominio de JavaScript, HTML/CSS, React, TypeScript y Python. Previamente, más de una década de experiencia en gestión y atención al cliente en el sector público (ARBA), con logros medibles en reducción de tiempos de respuesta y satisfacción del cliente. Combino esa base analítica con formación técnica activa para aportar valor desde el primer día en un equipo de desarrollo.',
      skills: [
        { icon: '🧠', title: 'Lenguajes y base', items: 'JavaScript (ES6+), HTML5, CSS3, Canvas API, React, TypeScript, Python' },
        { icon: '🛠️', title: 'Herramientas y flujo', items: 'Git/GitHub, GitHub Actions (CI/CD), Node.js, Vitest' },
        { icon: '📊', title: 'Datos y APIs', items: 'REST APIs, i18n, arquitectura de pipelines de datos' },
        { icon: '🤖', title: 'Herramientas IA', items: 'Claude Code, ChatGPT, Gemini' },
        { icon: '🎨', title: 'Diseño', items: 'Canva' },
      ] as SkillGroup[],
      projects: [
        {
          name: 'CodeMate Sign Translator',
          tech: 'JavaScript, TensorFlow.js, Visión por Computadora',
          description: 'Traductor de Lengua de Señas Argentina (LSA) en el navegador usando modelos handpose y blazeface de TensorFlow.js, reconociendo letras y palabras de cortesía en tiempo real con salida por voz.',
          live: 'devcodemate.github.io/sign-translator/translator.html',
          github: 'github.com/devCODEMATE/sign-translator',
        },
        {
          name: 'The Great Catscape',
          tech: 'JavaScript, HTML5 Canvas, Desarrollo de Juegos',
          description: 'Endless runner en pixel art con game loop basado en delta-time, detección de colisiones AABB y sistema de dificultad progresiva de 5 niveles — sin frameworks ni APIs externas.',
          live: 'devcodemate.github.io/the-great-catscape',
          github: 'github.com/devCODEMATE/the-great-catscape',
        },
        {
          name: 'CodeMate Pokedex Collection',
          tech: 'JavaScript, Node.js, REST API, i18n',
          description: 'Pipeline propio en Node.js que sincroniza más de 23.000 cartas de la API de TCGdex en EN/ES, con navegación tipo álbum 3D y reordenamiento drag-and-drop.',
          live: 'devcodemate.github.io/codemate-pokedex-collection',
          github: 'github.com/devCODEMATE/codemate-pokedex-collection',
        },
        {
          name: 'CodeMate Deck Lab',
          tech: 'JavaScript, Procesamiento de Datos, Probabilidad',
          description: 'Toolkit para TCG Pokémon con simulador de manos basado en probabilidad hipergeométrica y calculadora de daño, priorizando precisión matemática sobre un catálogo local de datos.',
          live: 'devcodemate.github.io/codemate-deck-lab',
          github: 'github.com/devCODEMATE/codemate-deck-lab',
        },
        {
          name: 'CodeMate Weather',
          tech: 'JavaScript, REST API, Vitest, i18n',
          description: 'Sistema de fondos dinámicos que se adapta a hora del día, clima, estación y hemisferio, con i18n EN/ES y tests unitarios desde el inicio del proyecto.',
          live: 'devcodemate.github.io/codemate-weather-app',
          github: 'github.com/devCODEMATE/codemate-weather-app',
        },
        {
          name: 'World Cup 2026 Tracker',
          tech: 'JavaScript, GitHub Actions, CI/CD',
          description: 'Pipeline automatizado por hora con GitHub Actions que consume datos en vivo del torneo, calculando posiciones y el cuadro de eliminación sin intervención manual.',
          live: 'devcodemate.github.io/world-cup-2026',
          github: 'github.com/devCODEMATE/world-cup-2026',
        },
      ] as ProjectItem[],
      contact: {
        email: 'dev.codemate@gmail.com',
        linkedin: 'linkedin.com/in/code-mate',
        github: 'github.com/devCODEMATE',
        location: 'La Plata, Buenos Aires, Argentina',
      },
    },
  },
} as const;