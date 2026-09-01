import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import havenix from "./assets/images/havenix.png";
import lio from "./assets/images/lio.png";
import playora from "./assets/images/playora.png";
import notepad from "./assets/images/notepad.png";
import todo from "./assets/images/todo.png";

/* ============================================================
   DESIGN TOKENS — editorial / creative-studio system
   ============================================================ */
const theme = {
  cream: "#F1EDE3",
  creamDeep: "#E8E0CE",
  red: "#A3211C",
  redDeep: "#7A1712",
  black: "#131110",
  charcoal: "#2A2624",
  gray: "#7A756C",
  grayLight: "#B9B3A6",
  white: "#FFFDF9",
  line: "rgba(19, 17, 16, 0.12)",
  lineOnDark: "rgba(241, 237, 227, 0.16)",
};

const skills = {
  frontend: ["TypeScript", "Next.js", "React.js", "Redux", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Responsive Design", "UI/UX Principles", "Axios", "React Router"],
  backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Mongoose", "Data Design", "Server-side Logic", "Performance Optimization","SQL","PostgreSQL "],
  tools: ["Git & GitHub", "Postman", "Vercel", "Figma", "VS Code", "Docker","AWS","Cloud Computing"],
};

const education = [
  { year: "2026 — present", degree: "Internship — MERN Stack Developer", school: "Zaitoon International Campus" },
  { year: "2025 — 2026", degree: "Diploma in Full Stack Web Development", school: "Zaitoon International Girls Campus" },
  { year: "2023 — 2025", degree: "Higher Secondary Studies", school: "Nafeesathul Misriya Institute of Innovation" },
];

const projects = [
  {
    num: "01",
    title: "Havenix",
    category: "Real Estate Platform",
    year: "2026",
    image: havenix,
    desc: "A full-stack property platform for buying and selling real estate. Built with advanced search, full CRUD functionality, and a clean performant user interface.",
    tags: ["MERN", "Real Estate", "CRUD", "Tailwind", "Axios","Docker"],
    liveLink: "https://havenix-copy-frontend-ogc3.onrender.com/",
    repoLink: "https://github.com/wafathima/Havenix",
  },
  {
    num: "02",
    title: "Playora",
    category: "E-Commerce Platform",
    year: "2026",
    image: playora,
    desc: "A full-stack e-commerce application built on the MERN stack with JWT auth, Redux state management, product catalogue, cart system, and fully responsive UI.",
    tags: ["MERN", "E-Commerce", "JWT", "Redux", "Tailwind", "Axios"],
    liveLink: "https://playoratoy.vercel.app/",
    repoLink: "https://github.com/wafathima/playoratoystore",
  },
  
  {
    num: "03",
    title: "Lio Store",
    category: "Frontend E-Commerce",
    year: "2025",
    image: lio,
    desc: "A responsive frontend for a shoe e-commerce brand with product filtering, cart functionality, and polished UI/UX focusing on mobile responsiveness.",
    tags: ["React", "Frontend", "UI/UX", "Tailwind"],
    liveLink: "https://liostorecom.vercel.app/",
    repoLink: "https://github.com/wafathima/liostorecom",
  },
];

const miniProjects = [
  {
    title: "NotePad App",
    image: notepad,
    description: "A modern note-taking application built with Next.js and TypeScript that allows users to create, edit, organize, and delete notes with a clean and responsive interface.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    repoLink: "https://github.com/wafathima/Notepad",
    liveLink: "https://notepadminiapp.vercel.app/",
  },
  {
    title: "Todo App",
    image: todo,
    description: "A responsive task management application developed using React.js and TypeScript. The app helps users efficiently manage daily tasks by adding, updating, completing, and deleting todos.",
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    repoLink: "https://github.com/wafathima/TypescriptProject",
    liveLink: "https://todo-frontend-w23l.onrender.com/",
  },
     {
    title: "Expense Tracker",
    image: expense tracker,
    description: "A full-stack expense management application that allows users to securely register, log in, and track their income and expenses. Built with Next.js, TypeScript, Express.js, PostgreSQL, Docker, and AWS EC2, with Nginx and HTTPS configured for secure production deployment.",
    stack: ["Next.js", "TypeScript", "Docker","PostgreSQL","AWS"],
    repoLink: "https://github.com/wafathima/Expense_track",
    liveLink: "https://wafa-expense-tracker.duckdns.org/",
  },
   
];

const languages = [{ name: "English", level: "Intermediate" }, { name: "Malayalam", level: "Fluent" }];
const hobbies = ["Learning New Technologies", "Coding Practice & Problem Solving", "UI/UX Exploration", "Building Side Projects", "Tech Content & Research"];

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ============================================================
   MOTION HELPERS
   ============================================================ */
const revealUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const letterUp = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/** Splits a heading into words that reveal upward in a staggered sequence. */
function RevealHeading({ text, as: Tag = "h2", style, delay = 0 }) {
  const words = text.split(" ");
  return (
    <Tag style={{ ...style, overflow: "hidden" }}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
        style={{ display: "inline-block" }}
      >
        {words.map((w, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
            <motion.span variants={letterUp} style={{ display: "inline-block" }}>{w}</motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Small uppercase numbered eyebrow label used to mark each editorial section. */
function SectionMark({ index, label, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "2.5rem" }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "13px",
        color: dark ? theme.cream : theme.red,
        letterSpacing: "0.02em",
      }}>{index}</span>
      <span style={{ width: "36px", height: "1px", background: dark ? theme.lineOnDark : theme.line }} />
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: dark ? theme.grayLight : theme.gray,
      }}>{label}</span>
    </motion.div>
  );
}

/** Button with a light magnetic pull toward the cursor + arrow micro-interaction. */
function MagButton({ children, href, onClick, variant = "dark", style, type }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const variants = {
    dark: { background: theme.black, color: theme.cream, border: `1px solid ${theme.black}` },
    red: { background: theme.red, color: theme.white, border: `1px solid ${theme.red}` },
    outline: { background: "transparent", color: theme.black, border: `1px solid ${theme.black}` },
    outlineLight: { background: "transparent", color: theme.cream, border: `1px solid ${theme.lineOnDark}` },
  };

  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        padding: "15px 30px",
        borderRadius: "100px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        textTransform: "uppercase",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}

const Arrow = ({ rotate = -45 }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
    style={{ transform: `rotate(${rotate}deg)` }}>
    <line x1="5" y1="19" x2="19" y2="5" /><polyline points="7 5 19 5 19 17" />
  </svg>
);

/* ============================================================
   PROJECT IMAGE — duotone-on-load, full colour on hover
   ============================================================ */

function EditorialImage({ src, alt, radius = "2px" }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        borderRadius: radius, 
        background: theme.charcoal,
        // Remove fixed aspect ratio
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        animate={{ scale: hover ? 1.05 : 1 }}
        style={{
          width: "100%",
          height: "auto", // Change from 100% to auto
          objectFit: "contain", // Change from cover to contain
          display: "block",
          filter: hover ? "grayscale(0) contrast(1)" : "grayscale(0.85) contrast(1.05)",
          transition: "filter 0.6s ease, transform 0.6s ease",
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: theme.red,
        mixBlendMode: "multiply",
        opacity: hover ? 0 : 0.28,
        transition: "opacity 0.6s ease",
        pointerEvents: "none",
      }} />
    </div>
  );
}
  
/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: theme.cream,
      color: theme.black,
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${theme.red}; color: ${theme.white}; }
        a { text-decoration: none; color: inherit; }
        button { font: inherit; }
        input, textarea { font-family: 'Inter', sans-serif; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.035; mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px 220px;
        }

        .marquee-track { display: flex; width: max-content; animation: marquee 26s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .hover-line { position: relative; }
        .hover-line::after {
          content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1px;
          background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform 0.35s ease;
        }
        .hover-line:hover::after { transform: scaleX(1); transform-origin: left; }

        .nav-link { position: relative; padding: 4px 0; }

        @media (max-width: 968px) {
          .split-grid { grid-template-columns: 1fr !important; }
          .nav-links-desktop { display: none !important; }
          .expertise-grid { grid-template-columns: 1fr !important; }
          .mini-grid { grid-template-columns: 1fr !important; }
          .project-row { grid-template-columns: 1fr !important; }
          .project-row .proj-text { order: 2 !important; }
          .project-row .proj-img { order: 1 !important; }
          .stat-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .hero-h1 { font-size: 15vw !important; }
        }
      `}</style>

      <div className="grain" />

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          padding: navSolid ? "16px 40px" : "26px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: navSolid ? theme.cream : "transparent",
          borderBottom: navSolid ? `1px solid ${theme.line}` : "1px solid transparent",
          transition: "padding 0.35s ease, background 0.35s ease, border-color 0.35s ease",
        }}
      >
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollToSection("top"); }} style={{
          fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em",
        }}>
          W<span style={{ color: theme.red }}>F.</span>
        </a>

        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "38px" }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link hover-line"
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
              style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase" }}
            >
              {item.label}
            </a>
          ))}
          <a href="https://drive.google.com/file/d/1HXf1aXYJb8db-skFx7cGjyIGGbEJm3-y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <MagButton variant="dark" style={{ padding: "10px 22px", fontSize: "12px" }}>Resume</MagButton>
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            width: "34px", height: "22px", position: "relative", zIndex: 210,
          }}
          className="mobile-menu-btn"
        >
          <span style={{ position: "absolute", top: menuOpen ? "10px" : "0", left: 0, width: "100%", height: "2px", background: theme.black, transform: menuOpen ? "rotate(45deg)" : "none", transition: "all 0.3s ease" }} />
          <span style={{ position: "absolute", top: "10px", left: 0, width: "100%", height: "2px", background: theme.black, opacity: menuOpen ? 0 : 1, transition: "all 0.3s ease" }} />
          <span style={{ position: "absolute", top: menuOpen ? "10px" : "20px", left: 0, width: "100%", height: "2px", background: theme.black, transform: menuOpen ? "rotate(-45deg)" : "none", transition: "all 0.3s ease" }} />
        </button>
      </motion.nav>

      <style>{`
        @media (max-width: 968px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 190, background: theme.black,
              display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6rem", padding: "0 40px",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "13vw", fontWeight: 700, color: theme.cream, lineHeight: 1.1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="top" ref={heroRef} style={{
        minHeight: "100vh", padding: "160px 40px 60px", maxWidth: "1400px", margin: "0 auto",
        position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 1,
      }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.6rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: theme.red, display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.05em", color: theme.gray, textTransform: "uppercase" }}>
              Available for hire — based in Kerala, India
            </span>
          </motion.div>

          <RevealHeading
            as="h1"
            text="WAFA FATHIMA."
            className="hero-h1"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
              fontSize: "clamp(3rem, 9.5vw, 8.5rem)", lineHeight: 0.94, letterSpacing: "-0.02em", color: theme.black,
            }}
          />

          <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", marginTop: "0.4rem" }}>
            <RevealHeading
              as="h2"
              text="FULL STACK MERN DEVELOPER"
              delay={0.15}
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, textTransform: "uppercase",
                fontSize: "clamp(1.6rem, 4.4vw, 3.4rem)", lineHeight: 1, letterSpacing: "-0.01em",
                color: theme.white, background: theme.red, padding: "10px 22px", display: "inline-block",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="split-grid"
          style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "60px", marginTop: "4rem", alignItems: "end" }}
        >
          <motion.p variants={revealUp} style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(15px, 1.6vw, 19px)", color: theme.charcoal,
            lineHeight: 1.75, maxWidth: "560px",
          }}>
            I build responsive, scalable web applications with clean backends and pixel-perfect frontends —
            turning product ideas into full-stack MERN experiences, end to end.
          </motion.p>

          <motion.div variants={revealUp} style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "flex-start" }}>
            <MagButton variant="red" onClick={() => scrollToSection("work")}>
              View Work <Arrow />
            </MagButton>
            <a href="https://drive.google.com/file/d/1HXf1aXYJb8db-skFx7cGjyIGGbEJm3-y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <MagButton variant="outline">Résumé <Arrow /></MagButton>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILL MARQUEE STRIP ── */}
      <div style={{ background: theme.black, padding: "18px 0", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} style={{ display: "flex", alignItems: "center" }}>
              {[...skills.frontend.slice(0, 6), ...skills.backend.slice(0, 5)].map((s, i) => (
                <span key={`${dup}-${i}`} style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", textTransform: "uppercase",
                  color: theme.cream, padding: "0 26px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "26px",
                }}>
                  {s} <span style={{ color: theme.red, fontSize: "16px" }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "140px 40px", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionMark index="01" label="About Me" />

        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px" }}>
          <RevealHeading
            as="h2"
            text="BUILDING THE FUTURE, ONE LINE OF CODE AT A TIME."
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
              fontSize: "clamp(2rem, 3.6vw, 3.2rem)", lineHeight: 1.06, letterSpacing: "-0.015em", color: theme.black,
            }}
          />

          <div>
            <motion.p variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: "17px", lineHeight: 1.85, color: theme.charcoal, marginBottom: "2.5rem" }}>
              Passionate MERN Stack Developer with a focus on creating elegant, performant, and user-centric
              web applications — from database schema to pixel-level polish.
            </motion.p>

            <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: theme.line, marginBottom: "2.5rem" }}>
              {[
                { value: "5+", label: "Projects" },
                { value: "1+", label: "Year Experience" },
                { value: "15+", label: "Technologies" },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5 }}
                  style={{ background: theme.cream, padding: "1.6rem 1.2rem" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: theme.red }}>{stat.value}</div>
                  <div style={{ fontSize: "12px", letterSpacing: "0.05em", textTransform: "uppercase", color: theme.gray, marginTop: "4px" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
              <div>
                <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.gray, marginBottom: "10px" }}>Languages</p>
                {languages.map((l) => (
                  <p key={l.name} style={{ fontSize: "14px", color: theme.charcoal, marginBottom: "4px" }}>
                    {l.name} <span style={{ color: theme.gray }}>— {l.level}</span>
                  </p>
                ))}
              </div>
              <div>
                <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.gray, marginBottom: "10px" }}>Beyond Code</p>
                <p style={{ fontSize: "14px", color: theme.charcoal, lineHeight: 1.8, maxWidth: "320px" }}>
                  {hobbies.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE / SKILLS ── */}
      <section id="expertise" style={{ background: theme.black, color: theme.cream, padding: "140px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionMark index="02" label="What I Work With" dark />

          <div className="expertise-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 2.2fr", gap: "50px", alignItems: "start" }}>
            <RevealHeading
              as="h2"
              text="TOOLS & EXPERTISE"
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
                fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1.05, color: theme.cream,
              }}
            />

            <div>
              {[
                { label: "Frontend", items: skills.frontend },
                { label: "Backend", items: skills.backend },
                { label: "Tools", items: skills.tools },
              ].map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: gi * 0.1 }}
                  style={{ borderTop: `1px solid ${theme.lineOnDark}`, padding: "1.8rem 0", display: "flex", gap: "30px", flexWrap: "wrap" }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", textTransform: "uppercase",
                    color: theme.red, letterSpacing: "0.1em", minWidth: "110px", paddingTop: "4px",
                  }}>{group.label}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", flex: 1 }}>
                    {group.items.map((s) => (
                      <span key={s} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 700 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section id="work" style={{ padding: "140px 40px 60px", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionMark index="03" label="Selected Work" />
        <RevealHeading
          as="h2"
          text="SELECTED PROJECTS"
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
            fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 0.98, letterSpacing: "-0.02em",
            marginBottom: "5rem", color: theme.black,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "130px" }}>
          {projects.map((proj, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={proj.num}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="project-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: reverse ? "0.85fr 1.15fr" : "1.15fr 0.85fr",
                  gap: "50px",
                  alignItems: "center",
                }}
              >
                <div className="proj-img" style={{ order: reverse ? 2 : 1, position: "relative" }}>
                  <span style={{
                    position: "absolute", top: "-64px", left: reverse ? "auto" : "-10px", right: reverse ? "-10px" : "auto",
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(4rem, 9vw, 7rem)",
                    color: "transparent", WebkitTextStroke: `1.5px ${theme.line}`, lineHeight: 1, zIndex: 0, userSelect: "none",
                  }}>{proj.num}</span>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <EditorialImage src={proj.image} alt={proj.title} aspect="16 / 11" />
                  </div>
                </div>

                <div className="proj-text" style={{ order: reverse ? 1 : 2 }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: theme.red,
                    letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px",
                  }}>{proj.category} — {proj.year}</p>

                  <h3 style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
                    fontSize: "clamp(2rem, 3.6vw, 3.4rem)", lineHeight: 1, marginBottom: "1.1rem", color: theme.black,
                  }}>{proj.title}</h3>

                  <p style={{ fontSize: "15.5px", color: theme.charcoal, lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "460px" }}>
                    {proj.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem" }}>
                    {proj.tags.map((t) => (
                      <span key={t} style={{
                        fontSize: "11px", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase",
                        padding: "6px 13px", border: `1px solid ${theme.line}`, borderRadius: "100px", color: theme.gray,
                      }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a href={proj.liveLink} target="_blank" rel="noopener noreferrer">
                      <MagButton variant="dark" style={{ padding: "12px 22px", fontSize: "12px" }}>Live Demo <Arrow /></MagButton>
                    </a>
                    <a href={proj.repoLink} target="_blank" rel="noopener noreferrer">
                      <MagButton variant="outline" style={{ padding: "12px 22px", fontSize: "12px" }}>Code <Arrow /></MagButton>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── MINI PROJECTS ── */}
      <section id="mini" style={{ padding: "100px 40px 140px", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionMark index="04" label="Mini Projects" />
        <RevealHeading
          as="h2"
          text="SIDE EXPERIMENTS"
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginBottom: "3rem", color: theme.black,
          }}
        />

        <div className="mini-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: theme.line }}>
          {miniProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ background: theme.cream, padding: "2rem" }}
            >
              <EditorialImage src={p.image} alt={p.title}  />
              <div style={{ paddingTop: "1.4rem" }}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "8px" }}>{p.title}</h4>
                <p style={{ fontSize: "14px", color: theme.charcoal, lineHeight: 1.7, marginBottom: "1rem" }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.3rem" }}>
                  {p.stack.map((t) => (
                    <span key={t} style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", color: theme.red }}>
                      {t}{" "}·{" "}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "18px" }}>
                  <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="hover-line" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>Live ↗</a>
                  <a href={p.repoLink} target="_blank" rel="noopener noreferrer" className="hover-line" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>Code ↗</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "0 40px 140px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionMark index="05" label="Experience & Learning" />
        <RevealHeading
          as="h2"
          text="TIMELINE"
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginBottom: "3.5rem", color: theme.black,
          }}
        />

        <div>
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                display: "grid", gridTemplateColumns: "160px 1fr", gap: "30px", alignItems: "baseline",
                padding: "2rem 0", borderTop: `1px solid ${theme.line}`,
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: theme.red }}>{e.year}</span>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2.4vw, 26px)", marginBottom: "6px" }}>{e.degree}</h3>
                <p style={{ fontSize: "14.5px", color: theme.gray }}>{e.school}</p>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: `1px solid ${theme.line}` }} />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: theme.red, color: theme.white, padding: "140px 40px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionMark index="06" label="Get In Touch" dark />

          <RevealHeading
            as="h2"
            text="LET'S BUILD SOMETHING GREAT."
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: "uppercase",
              fontSize: "clamp(2.4rem, 7vw, 6rem)", lineHeight: 0.98, letterSpacing: "-0.02em",
              marginBottom: "3rem", maxWidth: "1000px", color: theme.white,
            }}
          />

          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "17px", lineHeight: 1.8, maxWidth: "420px", color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
                Open to freelance work, full-time roles, and collaborations. Have an idea? Let's talk.
              </p>
              <a href="mailto:wafathima15@gmail.com" style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2.6vw, 28px)",
                display: "inline-flex", alignItems: "center", gap: "12px",
              }} className="hover-line">
                wafathima15@gmail.com <Arrow rotate={-45} />
              </a>

              <div style={{ display: "flex", gap: "12px", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer">
                  <MagButton variant="outlineLight">GitHub <Arrow /></MagButton>
                </a>
                <a href="https://linkedin.com/in/wafa-fathima-1538wf" target="_blank" rel="noopener noreferrer">
                  <MagButton variant="outlineLight">LinkedIn <Arrow /></MagButton>
                </a>
                <a href="https://drive.google.com/file/d/1HXf1aXYJb8db-skFx7cGjyIGGbEJm3-y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <MagButton variant="outlineLight">Résumé <Arrow /></MagButton>
                </a>
              </div>
            </div>

            <div style={{ background: theme.cream, borderRadius: "4px", padding: "2rem", color: theme.black }}>
              {sent ? (
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Message sent ✓</p>
                  <p style={{ fontSize: "14px", color: theme.gray, lineHeight: 1.7, marginBottom: "20px" }}>
                    Thanks for reaching out — I'll get back to you soon.
                  </p>
                  <MagButton variant="outline" onClick={() => setSent(false)}>Send another <Arrow /></MagButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[["name", "text", "Your Name", "Jane Smith"], ["email", "email", "Email Address", "jane@example.com"]].map(([name, type, label, ph]) => (
                    <div key={name} style={{ marginBottom: "16px" }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: theme.gray, display: "block", marginBottom: "6px" }}>{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={(e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))}
                        placeholder={ph}
                        required
                        style={{
                          width: "100%", padding: "13px 4px", background: "transparent",
                          border: "none", borderBottom: `1px solid ${theme.line}`, color: theme.black,
                          fontSize: "14px", outline: "none", borderRadius: 0,
                        }}
                        onFocus={(e) => (e.target.style.borderBottomColor = theme.red)}
                        onBlur={(e) => (e.target.style.borderBottomColor = theme.line)}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: theme.gray, display: "block", marginBottom: "6px" }}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Your message here…"
                      required
                      style={{
                        width: "100%", padding: "13px 4px", background: "transparent",
                        border: "none", borderBottom: `1px solid ${theme.line}`, color: theme.black,
                        fontSize: "14px", outline: "none", resize: "vertical", minHeight: "100px", borderRadius: 0,
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = theme.red)}
                      onBlur={(e) => (e.target.style.borderBottomColor = theme.line)}
                    />
                  </div>
                  <MagButton type="submit" variant="dark" style={{ width: "100%", justifyContent: "center", padding: "16px" }}>
                    {isSubmitting ? "Sending…" : "Send Message"} <Arrow />
                  </MagButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "36px 40px", maxWidth: "1400px", margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px",
        position: "relative", zIndex: 1,
      }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px" }}>
          WAFA<span style={{ color: theme.red }}>.</span>
        </p>
        <p style={{ fontSize: "12px", color: theme.gray }}>© 2026 — All rights reserved</p>
        <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
          {[["GitHub", "https://github.com/wafathima"], ["LinkedIn", "https://linkedin.com/in/wafa-fathima-1538wf"], ["Email", "mailto:wafathima15@gmail.com"]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="hover-line"
              style={{ fontSize: "12px", fontWeight: 600, color: theme.gray, textTransform: "uppercase", letterSpacing: "0.03em" }}>
              {l}
            </a>
          ))}
          <button onClick={() => scrollToSection("top")} style={{
            fontSize: "12px", fontWeight: 600, color: theme.gray, background: "none", border: "none",
            cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.03em",
          }} className="hover-line">
            ↑ Top
          </button>
        </div>
      </footer>
    </div>
  );
}
