//skills
import Section from './Section';
import Reveal from './Reveal';
import { skills } from '../data/portfolio';

const CATEGORIES = [
  { key: 'frontend', title: 'Frontend Development' },
  { key: 'backend', title: 'Backend Development' },
  { key: 'tools', title: 'Tools & Technologies' },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      number="03"
      eyebrow="Capabilities"
      title={
        <>
          Tools &amp; <span className="accent">expertise.</span>
        </>
      }
      sub="The languages, frameworks and tools I use to take an idea from database to deployment."
    >
      <div className="skills-grid">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.key} delay={i * 0.1} className="skill-card">
            <p className="skill-card-index">
              {String(i + 1).padStart(2, '0')} / {String(CATEGORIES.length).padStart(2, '0')}
            </p>
            <h3 className="skill-card-title">{cat.title}</h3>
            <div className="skill-list">
              {skills[cat.key].map((s) => (
                <div key={s} className="skill-item">
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}