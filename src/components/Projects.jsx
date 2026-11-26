// //projects
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Section from './Section';
import Reveal from './Reveal';
import { onSpot } from './spotlight';
import { projects } from '../data/portfolio';

function ProjectCard({ project, index }) {
  const featured = index === 0;
  return (
    <Reveal
      className={`card project-card${featured ? ' featured' : ''}`}
      delay={(index % 2) * 0.08}
      onMouseMove={onSpot}
    >
      <a
        className="card-media"
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} live preview`}
      >
        <img src={project.image} alt={`${project.title} — ${project.category}`} loading="lazy" />
        <span className="card-go"><ArrowUpRight size={18} /></span>
      </a>

      <div className="card-body">
        <div className="card-meta">
          <span>{project.category}</span>
          <i />
          <span>{project.year}</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>
        <div className="chips">
          {project.tags.map((t) => <span key={t} className="chip chip-sm">{t}</span>)}
        </div>
        <div className="card-actions">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <span>Live preview</span>
            <ArrowUpRight size={14} style={{ position: 'relative', zIndex: 1 }} />
          </a>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            <GithubIcon size={14} /> Repository
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={<>Selected <span className="accent">projects.</span></>}
      sub="Full-stack products I designed, built and deployed."
    >
      <div className="cards-grid">
        {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </Section>
  );
}