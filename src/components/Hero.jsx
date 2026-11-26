// //hero
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
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });

  const rise = (delay, y = 20) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section id="top" className="hero">
      {/* galaxy fills the whole hero as a backdrop */}
      <div className="hero-3d-bg">
        <ErrorBoundary fallback={<div className="scene-wrap"><SceneFallback /></div>}>
          <Suspense fallback={<div className="scene-wrap"><div className="scene-loader">Loading</div></div>}>
            <Scene3D reduced={reduced} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="hx-inner">
        <motion.span className="availability" {...rise(0.1, 10)}>
          <i /> Available · {CONTACT.location}
        </motion.span>

        <motion.h1
          className="hx-name"
          initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
        >
          Wafa <span className="italic">Fathima</span>
        </motion.h1>

        <motion.p className="hx-role" {...rise(0.5)}>Full Stack Developer</motion.p>

        <motion.p className="hx-lead" {...rise(0.6)}>
          I build responsive, scalable web applications with clean backends and
          pixel-perfect frontends — turning product ideas into full-stack MERN
          experiences, end to end.
        </motion.p>

        <motion.div className="hx-actions" {...rise(0.7)}>
          <button className="btn btn-primary" onClick={() => scrollTo('work')}>
            <span>View my work</span>
            <ArrowUpRight size={15} style={{ position: 'relative', zIndex: 1 }} />
          </button>
          <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
            Contact me
          </button>
        </motion.div>
      </div>

      <motion.div
        className="container"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
      >
        <div className="hx-bar">
          <div className="hx-socials">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${CONTACT.email}`}>Email</a>
          </div>
          <span className="hx-scroll">Scroll to explore</span>
        </div>
      </motion.div>
    </section>
  );
}