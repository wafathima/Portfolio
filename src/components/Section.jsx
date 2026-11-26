// //section
import Reveal from './Reveal';

/* Centered header: small tag, large title, short intro. `number` is accepted but no longer shown. */
export default function Section({ id, eyebrow, title, sub, children, className = '' }) {
  return (
    <section id={id} className={`section sec ${className}`}>
      <div className="container">
        {(eyebrow || title || sub) && (
          <header className="sec-head">
            {eyebrow && <Reveal as="span" className="sec-tag">{eyebrow}</Reveal>}
            {title && <Reveal as="h2" className="sec-title" delay={0.05}>{title}</Reveal>}
            {sub && <Reveal as="p" className="sec-sub" delay={0.1}>{sub}</Reveal>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}