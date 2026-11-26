//education
import Section from './Section';
import Reveal from './Reveal';
import { education } from '../data/portfolio';

export default function Education() {
  return (
    <Section
      number="05"
      eyebrow="Education"
      title={
        <>
          Learning &amp; <span className="accent">foundations.</span>
        </>
      }
    >
      <div className="timeline">
        {education.map((item, i) => (
          <Reveal key={item.degree} delay={i * 0.08} className="timeline-item">
            <div className="timeline-when">
              <strong>{item.year}</strong>
            </div>
            <div className="timeline-what">
              <h3 className="timeline-role">{item.degree}</h3>
              <p className="timeline-company">{item.school}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}