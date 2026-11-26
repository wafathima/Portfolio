//section
import Reveal from './Reveal';

export default function Section({
  id,
  number,
  eyebrow,
  title,
  sub,
  children,
  className = '',
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        {(number || title || sub) && (
          <div className="section-head">
            <div>
              {number && (
                <Reveal as="div" className="section-num">
                  {number} {eyebrow && <span>{eyebrow}</span>}
                </Reveal>
              )}
              {title && (
                <Reveal as="h2" className="section-title" delay={0.05}>
                  {title}
                </Reveal>
              )}
            </div>
            {sub && (
              <Reveal as="p" className="section-sub" delay={0.1}>
                {sub}
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}