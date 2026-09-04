// src/components/StationPanel/StationPanel.tsx

import type { Station } from '../../types/station';
import type { Language } from '../../data/translations';
import { translations } from '../../data/translations';

const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.14 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

type Props = {
  station: Station;
  language: Language;
};

function StationPanel({ station, language }: Props) {
  const t = translations[language];
  const c = t.content;

  if (station.id === 'about') {
    return (
      <div className="panel-text">
        {c.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (station.id === 'skills') {
    return (
      <div className="panel-skills">
        {c.skills.map((group) => (
          <div key={group.title} className="skill-group">
            <h3>{group.icon} {group.title}</h3>
            <p>{group.items}</p>
          </div>
        ))}
      </div>
    );
  }

  if (station.id === 'projects') {
    return (
      <div className="panel-projects">
        {c.projects.map((project) => (
          <div key={project.name} className="project-card">
            <h3>{project.name}</h3>
            <span className="project-tech">{project.tech}</span>
            <p>{project.description}</p>
            <div className="project-links">
              {project.live && (
                <a href={`https://${project.live}`} target="_blank" rel="noopener noreferrer" className="link-live">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79l4.79 4.79v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H9v-2h2c.55 0 1-.45 1-1V9h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 1.52-.43 2.94-1.18 4.15z" />
                  </svg>
                  Live
                </a>
              )}
              <a href={`https://${project.github}`} target="_blank" rel="noopener noreferrer" className="link-github">
                {GITHUB_ICON}
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (station.id === 'contact') {
    return (
      <div className="panel-contact">
        <div className="contact-row">
          <span className="contact-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M2 4h20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01l10 6.24 10-6.24V6H2zm20 2.76l-8.97 5.61c-.63.4-1.43.4-2.06 0L2 8.76V18h20V8.76z" />
            </svg>
          </span>
          <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
        </div>
        <div className="contact-row">
          <span className="contact-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5v-9h3v9zM6.5 8.72c-.97 0-1.75-.78-1.75-1.75S5.53 5.22 6.5 5.22s1.75.78 1.75 1.75-.78 1.75-1.75 1.75zM20 19h-3v-4.5c0-1.08-.02-2.46-1.5-2.46-1.5 0-1.73 1.17-1.73 2.38V19h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z" />
            </svg>
          </span>
          <a href={`https://${c.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {c.contact.linkedin}
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-icon">{GITHUB_ICON}</span>
          <a href={`https://${c.contact.github}`} target="_blank" rel="noopener noreferrer">
            {c.contact.github}
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 6.72 14.53 7.06 15 .22.3.66.3.88 0 .34-.47 7.06-9.75 7.06-15 0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
          </span>
          <span>{c.contact.location}</span>
        </div>
      </div>
    );
  }

  return <p className="panel-text">{t.modalPlaceholder}</p>;
}

export default StationPanel;