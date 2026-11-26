import { ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Section from './Section';
import Reveal from './Reveal';
import { onSpot } from './spotlight';
import { miniProjects } from '../data/portfolio';

export default function MiniProjects() {
  return (
    <Section
      eyebrow="More builds"
      title={<>Smaller builds, <span className="accent">sharper ideas.</span></>}
      sub="Compact projects that explore different problems with different tools."
    >
      <div className="cards-grid mini">
        {miniProjects.map((p, i) => (
          <Reveal key={p.title} className="card" delay={(i % 3) * 0.08} onMouseMove={onSpot}>
            <a
              className="card-media"
              href={p.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.title}`}
            >
              <img src={p.image} alt={p.title} loading="lazy" />
              <span className="card-go"><ArrowUpRight size={18} /></span>
            </a>
            <div className="card-body">
              <h3 className="card-title sm">{p.title}</h3>
              <p className="card-desc">{p.description}</p>
              <div className="chips">
                {p.stack.map((t) => <span key={t} className="chip chip-sm">{t}</span>)}
              </div>
              <div className="card-actions">
                <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <span>Live</span>
                  <ArrowUpRight size={13} style={{ position: 'relative', zIndex: 1 }} />
                </a>
                <a href={p.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <GithubIcon size={13} /> Code
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal style={{ textAlign: 'center', marginTop: 64 }}>
        <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          See more on GitHub <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </Section>
  );
}