//reveal
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  as: Tag = motion.div,
  ...rest
}) {
  const reduced = useReducedMotion();
  if (reduced) return <Tag {...rest}>{children}</Tag>;

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