//hero
import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT } from '../data/portfolio';
import ErrorBoundary from './ErrorBoundary';
import SceneFallback from '../three/SceneFallback';

const Scene3D = lazy(() => import('../three/Scene3D'));

const EASE = [0.19, 1, 0.22, 1];

export default function Hero() {
  const reduced = useReducedMotion();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
    });

  return (
    <section id="top" className="hero">
      <div className="hero-3d-bg">
        <ErrorBoundary fallback={<div className="scene-wrap"><SceneFallback /></div>}>
          <Suspense
            fallback={
              <div className="scene-wrap">
                <div className="scene-loader">Loading</div>
              </div>
            }
          >
            <Scene3D reduced={reduced} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="hero-inner">
        <motion.p
          className="hero-eyebrow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Portfolio — 2026
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
        >
          Wafa
          <br />
          <span className="italic">Fathima</span>
        </motion.h1>

        <motion.div
          className="hero-meta-row"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <span className="availability">
            <i /> Available · {CONTACT.location}
          </span>
          <span className="hero-title">Full Stack Developer</span>
        </motion.div>

        <motion.p
          className="hero-lead"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
        >
          I build responsive, scalable web applications with clean backends
          and pixel-perfect frontends — turning product ideas into full-stack
          MERN experiences, end to end.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
        >
          <button className="btn btn-primary" onClick={() => scrollTo('work')}>
            <span>View My Work</span>
            <ArrowUpRight size={15} style={{ position: 'relative', zIndex: 1 }} />
          </button>
          <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
            Contact Me
          </button>
        </motion.div>

        <motion.div
          className="hero-footer-row"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
        >
          <div className="hero-socials">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${CONTACT.email}`}>Email</a>
          </div>
          <span className="hero-scroll">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}