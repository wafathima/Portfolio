import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, RESUME } from '../data/portfolio';

const EASE = [0.19, 1, 0.22, 1];

export default function Navigation() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      <nav className={`nav ${solid ? 'solid' : ''}`}>
        <div className="container nav-inner">
          <a
            href="#top"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
            }}
          >
            Wafa<span className="dot">.</span>
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`nav-link ${active === n.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.id);
                }}
              >
                {n.label}
              </a>
            ))}
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ marginLeft: 8 }}
            >
              Résumé
            </a>
          </div>

          <button
            className="nav-menu-btn"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              position: 'fixed',
              top: 70,
              left: 16,
              right: 16,
              zIndex: 99,
              padding: '24px 28px',
              borderRadius: 20,
              background: 'rgba(6,7,10,0.96)',
              border: '1px solid var(--line)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.id);
                }}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 28,
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  padding: '12px 0',
                  color: 'var(--text)',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                {n.label}
              </a>
            ))}
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 20, justifyContent: 'center' }}
            >
              Résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}