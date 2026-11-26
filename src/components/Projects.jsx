//projects
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Section from './Section';
import Reveal from './Reveal';
import { projects } from '../data/portfolio';

const EASE = [0.19, 1, 0.22, 1];

function ProjectCard({ project, index }) {
  const reduced = useReducedMotion();
  const isReverse = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className={`project ${isReverse ? 'reverse' : ''}`}>
      <motion.div
        className="project-media"
        initial={reduced ? false : { opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <img src={project.image} alt={`${project.title} — ${project.category}`} loading="lazy" />
      </motion.div>

      <div className="project-info">
        <Reveal delay={0.05}>
          <p className="project-number">
            {num} — {project.category} / {project.year}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="project-title">{project.title}</h3>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="project-desc">{project.desc}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="project-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="project-links">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>Live Preview</span>
              <ArrowUpRight size={14} style={{ position: 'relative', zIndex: 1 }} />
            </a>
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <GithubIcon size={14} /> Repository
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section
      id="work"
      number="01"
      eyebrow="Selected Work"
      title={
        <>
          Selected <span className="accent">projects.</span>
        </>
      }
      sub="Full-stack products I designed, built and deployed."
    >
      <div>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}