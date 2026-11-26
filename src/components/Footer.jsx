// //footer
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
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <footer className="footer ft">
      <div className="container">
        <div className="ft-top">
          <div>
            <p className="ft-brand">Wafa Fathima<span>.</span></p>
            <p className="ft-tag">
              Full Stack MERN Developer building considered, performant products
              from database to interface.
            </p>
          </div>
          <div className="ft-social">
            <a className="btn btn-ghost btn-sm" href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn btn-ghost btn-sm" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn btn-ghost btn-sm" href={`mailto:${CONTACT.email}`}>Email</a>
            <a className="btn btn-ghost btn-sm" href={RESUME} target="_blank" rel="noopener noreferrer">Résumé</a>
          </div>
        </div>

        <div className="ft-mid">
          <nav className="ft-nav" aria-label="Footer">
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
          </nav>
          <p className="ft-time">
            <i /> {time} IST <span>· {CONTACT.location}</span>
          </p>
        </div>

        <div className="ft-bottom">
          <span>© 2026 Wafa Fathima · Designed and built by me.</span>
          <button className="back-top" onClick={toTop}>
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}