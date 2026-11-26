// //skills
import { Monitor, Server, Wrench } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { onSpot } from './spotlight';
import { skills } from '../data/portfolio';

const CATEGORIES = [
  { key: 'frontend', title: 'Frontend Development', Icon: Monitor },
  { key: 'backend', title: 'Backend Development', Icon: Server },
  { key: 'tools', title: 'Tools & Technologies', Icon: Wrench },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title={<>Tools &amp; <span className="accent">expertise.</span></>}
      sub="The languages, frameworks and tools I use to take an idea from database to deployment."
    >
      <div className="tiles">
        {CATEGORIES.map(({ key, title, Icon }, i) => (
          <Reveal key={key} delay={i * 0.1} className="card skill-tile" onMouseMove={onSpot}>
            <div className="skill-top">
              <span className="skill-icon"><Icon size={22} strokeWidth={1.5} /></span>
              <div>
                <h3 className="skill-name">{title}</h3>
                <p className="skill-count">{skills[key].length} technologies</p>
              </div>
            </div>
            <div className="chips">
              {skills[key].map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}