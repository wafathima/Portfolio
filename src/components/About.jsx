// //about

import Section from './Section';
import Reveal from './Reveal';
import { onSpot } from './spotlight';
import { languages, hobbies, stats } from '../data/portfolio';

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>A developer with a <span className="accent">designer's eye.</span></>}
    >
      <div className="bento">
        <Reveal className="card bento-intro" onMouseMove={onSpot}>
          <div className="about-copy">
            <p>
              Passionate MERN Stack Developer with a focus on creating
              <em> elegant, performant, and user-centric</em> web applications —
              from database schema to pixel-level polish.
            </p>
            <p>
              I enjoy working across the entire stack — designing clean
              interfaces, writing maintainable backend logic, and shipping
              production-ready applications with modern tooling.
            </p>
            <p>
              Currently building full-stack apps with Docker, AWS and PostgreSQL,
              and continuously exploring UI/UX patterns that make products feel
              considered and intentional.
            </p>
          </div>
        </Reveal>

        <div className="bento-side">
          <Reveal className="card" delay={0.1} onMouseMove={onSpot}>
            <p className="mini-label">Languages</p>
            {languages.map((l) => (
              <div key={l.name} className="lang-row">
                <span>{l.name}</span>
                <span className="lang-level">{l.level}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="card" delay={0.18} onMouseMove={onSpot}>
            <p className="mini-label">Beyond code</p>
            <div className="chips">
              {hobbies.map((h) => <span key={h} className="chip chip-sm">{h}</span>)}
            </div>
          </Reveal>
        </div>

        <div className="bento-stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} className="card stat-card" delay={i * 0.08} onMouseMove={onSpot}>
              <span className="stat-num">{s.value}</span>
              <span className="stat-cap">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}