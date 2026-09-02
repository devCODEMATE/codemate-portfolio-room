import type { Station } from '../../types/station';
import type { Language } from '../../data/translations';
import { translations } from '../../data/translations';

type Props = {
  station: Station;
  language: Language;
};

function StationPanel({ station, language }: Props) {
  const t = translations[language];
  const c = t.content;

  if (station.id === 'about') {
    return <p className="panel-text">{c.about}</p>;
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
                <a href={`https://${project.live}`} target="_blank" rel="noopener noreferrer">
                  🔗 Live
                </a>
              )}
              <a href={`https://${project.github}`} target="_blank" rel="noopener noreferrer">
                💻 GitHub
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
          <span className="contact-icon">📧</span>
          <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
        </div>
        <div className="contact-row">
          <span className="contact-icon">💼</span>
          <a href={`https://${c.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            {c.contact.linkedin}
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-icon">🐙</span>
          <a href={`https://${c.contact.github}`} target="_blank" rel="noopener noreferrer">
            {c.contact.github}
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-icon">📍</span>
          <span>{c.contact.location}</span>
        </div>
      </div>
    );
  }

  return <p className="panel-text">{t.modalPlaceholder}</p>;
}

export default StationPanel;