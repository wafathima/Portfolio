//about
import Section from './Section';
import Reveal from './Reveal';
import { languages, hobbies, stats } from '../data/portfolio';

export default function About() {
  return (
    <Section
      id="about"
      number="02"
      eyebrow="About"
      title={
        <>
          A developer with a <span className="accent">designer's eye.</span>
        </>
      }
    >
      <div className="about-grid">
        <div className="about-copy">
          <Reveal as="p">
            Passionate MERN Stack Developer with a focus on creating
            <em> elegant, performant, and user-centric</em> web applications —
            from database schema to pixel-level polish.
          </Reveal>
          <Reveal as="p" delay={0.05}>
            I enjoy working across the entire stack — designing clean
            interfaces, writing maintainable backend logic, and shipping
            production-ready applications with modern tooling.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            Currently building full-stack apps with Docker, AWS and PostgreSQL,
            and continuously exploring UI/UX patterns that make products feel
            considered and intentional.
          </Reveal>

          <div className="about-meta">
            <Reveal delay={0.15}>
              <p className="meta-label">Languages</p>
              {languages.map((l) => (
                <p key={l.name} className="meta-value">
                  {l.name} <span style={{ color: 'var(--dim)' }}>— {l.level}</span>
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.2}>
              <p className="meta-label">Beyond Code</p>
              <p className="meta-value">{hobbies.join(' · ')}</p>
            </Reveal>
          </div>
        </div>

        <div className="stats-stack">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="stat">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}