//footer
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { CONTACT, NAV_ITEMS, RESUME } from '../data/portfolio';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      timeZone: CONTACT.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">
              Wafa Fathima<span style={{ color: 'var(--cyan)' }}>.</span>
            </p>
            <p className="footer-tag">
              Full Stack MERN Developer building considered, performant
              products from database to interface.
            </p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Navigate</p>
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Elsewhere</p>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${CONTACT.email}`}>Email</a>
            <a href={RESUME} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Local Time</p>
            <p className="footer-time">
              <i /> {time} <span style={{ color: 'var(--dim)' }}>IST</span>
            </p>
            <p style={{ marginTop: 12, color: 'var(--dim)', fontSize: 13 }}>
              {CONTACT.location}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Wafa Fathima · Designed and built by me.</span>
          <button className="back-top" onClick={toTop}>
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}