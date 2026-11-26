//mini projects
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Section from './Section';
import Reveal from './Reveal';
import { miniProjects } from '../data/portfolio';

const EASE = [0.19, 1, 0.22, 1];

export default function MiniProjects() {
  const reduced = useReducedMotion();

  return (
    <Section
      number="06"
      eyebrow="More Builds"
      title={
        <>
          Smaller builds, <span className="accent">sharper ideas.</span>
        </>
      }
      sub="Compact projects that explore different problems with different tools."
    >
      <div className="mini-grid">
        {miniProjects.map((p, i) => (
          <motion.div
            key={p.title}
            className="mini-card"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: (i % 2) * 0.1, ease: EASE }}
          >
            <div className="mini-media">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="mini-body">
              <div className="mini-head-row">
                <h3 className="mini-title">{p.title}</h3>
                <span className="mini-num">
                  {String(i + 1).padStart(2, '0')} / {String(miniProjects.length).padStart(2, '0')}
                </span>
              </div>
              <p className="mini-desc">{p.description}</p>
              <div className="project-tags">
                {p.stack.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="mini-actions">
                <a
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Live</span>
                  <ArrowUpRight size={13} style={{ position: 'relative', zIndex: 1 }} />
                </a>
                <a
                  href={p.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <GithubIcon size={13} /> Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal style={{ textAlign: 'center', marginTop: 72 }}>
        <a
          href="https://github.com/wafathima"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          See more on GitHub <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </Section>
  );
}