//experience
import Section from './Section';
import Reveal from './Reveal';
import { experience } from '../data/portfolio';

export default function Experience() {
  return (
    <Section
      id="experience"
      number="04"
      eyebrow="Journey"
      title={
        <>
          Professional <span className="accent">experience.</span>
        </>
      }
      sub="The roles that shaped how I build and collaborate."
    >
      <div className="timeline">
        {experience.map((item, i) => (
          <Reveal
            key={`${item.role}-${item.company}`}
            delay={i * 0.08}
            className="timeline-item"
          >
            <div className="timeline-when">
              <strong>{item.period}</strong>
              {item.duration}
            </div>
            <div className="timeline-what">
              <h3 className="timeline-role">{item.role}</h3>
              <p className="timeline-company">
                {item.company} · {item.type}
              </p>
              <p className="timeline-desc">{item.description}</p>
              <ul className="timeline-list">
                {item.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="project-tags">
                {item.technologies.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}