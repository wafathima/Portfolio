// //reveal
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  as = 'div',
  ...rest
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  // as="p" / "h2" now animate too (before, string tags silently skipped the motion wrapper)
  const Tag = typeof as === 'string' ? motion[as] : as;

  return (
    <Tag
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}