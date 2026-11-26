import { useState, useEffect, useRef } from "react";
import {
  motion, useScroll, useTransform, useSpring, useMotionValue, useInView, animate, AnimatePresence,
} from "framer-motion";

import havenix from "./assets/images/havenix.png";
import lio from "./assets/images/lio.png";
import playora from "./assets/images/playora.png";
import notepad from "./assets/images/notepad.png";
import todo from "./assets/images/todo.png";
import expense from "./assets/images/expense.png";
import Enchat from "./assets/images/Enchat.png";

/* ============================================================
   THEME
   ============================================================ */
const RAINBOW = ["#ff3d71", "#ff9f1c", "#ffe14d", "#3dff9f", "#2fd0ff", "#6c5cff", "#d946ef"];
const T = { bg: "#050507", text: "#F4F4F8", mute: "#9A9AAE", dim: "#62627A" };

/* ============================================================
   DATA
   ============================================================ */
const skills = {
  frontend: ["TypeScript", "Next.js", "React.js", "Redux", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Responsive Design", "UI/UX Principles", "Axios", "React Router"],
  backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Mongoose", "Data Design", "Server-side Logic", "Performance Optimization", "SQL", "PostgreSQL"],
  tools: ["Git & GitHub", "Postman", "Vercel", "Figma", "VS Code", "Docker", "AWS", "Cloud Computing"],
};

const education = [
  { year: "Present", degree: "Bachelors of Commerce", school: "Calicut University" },
  { year: "2025 - 2026", degree: "Diploma in Full Stack Web Development", school: "Zaitoon International Girls Campus" },
  { year: "2023 — 2025", degree: "Higher Secondary Studies", school: "Nafeesathul Misriya Institute of Innovation" },
];

const experience = [
  {
    role: "Placement Officer",
    company: "Zaitoon International Campus",
    type: "Professional Experience",
    duration: "Currently Working",
    period: "2026",
    description: "Supporting students in their career journey by coordinating placement activities and connecting with potential employers.",
    responsibilities: [
      "Identified and shared relevant job opportunities with students.",
      "Connected with HR professionals and recruiters to explore placement opportunities.",
      "Coordinated communication between companies, students, and the placement team.",
      "Tracked student applications and monitored placement progress.",
      "Followed up with recruiters regarding job opportunities and interview updates.",
    ],
    technologies: ["HR Outreach", "Recruitment", "Communication", "Placement Coordination"],
  },
  {
    role: "MERN Stack Developer Intern",
    company: "Zaitoon International Campus",
    type: "Internship",
    duration: "6 Months",
    period: "2026",
    description: "Completed a 6-month internship focused on full-stack web development using the MERN stack.",
    responsibilities: [
      "Developed responsive web interfaces using React.js, JavaScript, and Tailwind CSS.",
      "Built backend functionality using Node.js and Express.js.",
      "Worked with MongoDB for database design and data management.",
      "Integrated REST APIs and implemented authentication functionality.",
      "Built and improved full-stack web development projects.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "REST APIs"],
  },
];

const projects = [
  {
    title: "Havenix", category: "Real Estate Platform", year: "2026", image: havenix, url: "havenix.app",
    desc: "A full-stack property platform for buying and selling real estate. Built with advanced search, full CRUD functionality, and a clean performant user interface.",
    tags: ["MERN", "Real Estate", "CRUD", "Tailwind", "Axios", "Docker"],
    liveLink: "https://havenix-copy-frontend-ogc3.onrender.com/",
    repoLink: "https://github.com/wafathima/Havenix",
  },
  {
    title: "Playora", category: "E-Commerce Platform", year: "2026", image: playora, url: "playoratoy.vercel.app",
    desc: "A full-stack e-commerce application built on the MERN stack with JWT auth, Redux state management, product catalogue, cart system, and fully responsive UI.",
    tags: ["MERN", "E-Commerce", "JWT", "Redux", "Tailwind", "Axios"],
    liveLink: "https://playoratoy.vercel.app/",
    repoLink: "https://github.com/wafathima/playoratoystore",
  },
  {
    title: "Lio Store", category: "Frontend E-Commerce", year: "2025", image: lio, url: "liostorecom.vercel.app",
    desc: "A responsive frontend for a shoe e-commerce brand with product filtering, cart functionality, and polished UI/UX focusing on mobile responsiveness.",
    tags: ["React", "Frontend", "UI/UX", "Tailwind"],
    liveLink: "https://liostorecom.vercel.app/",
    repoLink: "https://github.com/wafathima/liostorecom",
  },
];

const miniProjects = [
  {
    title: "NotePad App", image: notepad,
    description: "A modern note-taking application built with Next.js and TypeScript that allows users to create, edit, organize, and delete notes with a clean and responsive interface.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    repoLink: "https://github.com/wafathima/Notepad",
    liveLink: "https://notepadminiapp.vercel.app/",
  },
  {
    title: "Todo App", image: todo,
    description: "A responsive task management application developed using React.js and TypeScript. The app helps users efficiently manage daily tasks by adding, updating, completing, and deleting todos.",
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    repoLink: "https://github.com/wafathima/TypescriptProject",
    liveLink: "https://todo-frontend-w23l.onrender.com/",
  },
  {
    title: "Expense Tracker", image: expense,
    description: "A full-stack expense management application that allows users to securely register, log in, and track their income and expenses. Built with Next.js, TypeScript, Express.js, PostgreSQL, Docker, and AWS EC2, with Nginx and HTTPS configured for secure production deployment.",
    stack: ["Next.js", "TypeScript", "Docker", "PostgreSQL", "AWS"],
    repoLink: "https://github.com/wafathima/Expense_track",
    liveLink: "https://wafa-expense-tracker.duckdns.org/",
  },
  {
    title: "EnChat", image: Enchat,
    description: "EnChat is a real-time chat application built using Next.js, TypeScript, Node.js, Express.js, Socket.IO, and PostgreSQL. It enables users to communicate instantly with secure authentication, real-time messaging, and conversation management.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    repoLink: "https://github.com/wafathima/chatapp",
    liveLink: "https://enchatfrontend.vercel.app/",
  },
];

const languages = [{ name: "English", level: "Intermediate" }, { name: "Malayalam", level: "Fluent" }];
const hobbies = ["Learning New Technologies", "Coding Practice & Problem Solving", "UI/UX Exploration", "Building Side Projects", "Tech Content & Research"];

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

const RESUME = "https://drive.google.com/file/d/1wTAN6vKGX5OQvZG3tnAblL2vqmKuht_i/view?usp=sharing";

/* ============================================================
   REUSABLE PIECES
   ============================================================ */
function Tilt({ children, max = 8, style, className = "", glare = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 20 });
  const move = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div
      className={`${className} ${glare ? "glare" : ""}`}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
});

function Heading({ children, sub }) {
  return (
    <motion.div {...reveal()} style={{ marginBottom: 8 }}>
      <h2 className="h2">{children}</h2>
      <div className="rb-bar" />
      {sub && <p className="sub">{sub}</p>}
    </motion.div>
  );
}

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" /><polyline points="7 5 19 5 19 17" />
  </svg>
);

function Btn({ children, href, onClick, type, variant = "solid", style, className = "" }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href} onClick={onClick} type={type}
      target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}
      className={`btn ${variant === "solid" ? "btn-solid" : "btn-ghost rb-border"} ${className}`} style={style}
    >
      <span>{children}</span>
    </Comp>
  );
}

function Chip({ children, small }) {
  return <span className={`chip ${small ? "chip-sm" : ""}`}>{children}</span>;
}

function Count({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Browser({ src, alt, url }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} />
        <span>{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function Layer({ mx, my, depth, children, style }) {
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [depth, -depth]), { stiffness: 90, damping: 16 });
  const y = useSpring(useTransform(my, [-0.5, 0.5], [depth, -depth]), { stiffness: 90, damping: 16 });
  return <motion.div style={{ x, y, position: "absolute", ...style }}>{children}</motion.div>;
}

function Badge({ label, color, style, delay = 0 }) {
  return (
    <div className="badge" style={{ ...style, animationDelay: `${delay}s`, "--c": color }}>
      <i /> {label}
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */
export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20 });
  const glowY = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20 });
  const winRX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 15 });
  const winRY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 80, damping: 15 });

  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const tlRef = useRef(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: tlRef, offset: ["start 70%", "end 60%"] });
  const tlScale = useSpring(tlProgress, { stiffness: 100, damping: 24 });

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    const onMove = (e) => { glowX.set(e.clientX - 250); glowY.set(e.clientY - 250); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, [glowX, glowY]);

  const heroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const heroLeave = () => { mx.set(0); my.set(0); };

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

  const spectrum = RAINBOW.join(", ");

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @property --ang { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        :root { --rb: linear-gradient(90deg, ${spectrum}, ${RAINBOW[0]}); }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; background: ${T.bg}; }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; color: inherit; }
        ::selection { background: #6c5cff; color: #fff; }
        :focus-visible { outline: 2px solid #2fd0ff; outline-offset: 3px; }

        .app { font-family: 'Manrope', sans-serif; background: ${T.bg}; color: ${T.text}; overflow-x: hidden; position: relative; min-height: 100vh; }
        h1,h2,h3,h4 { font-family: 'Sora', sans-serif; letter-spacing: -0.02em; }

        .aurora { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .aurora i { position: absolute; width: 55vw; height: 55vw; border-radius: 50%; filter: blur(110px); opacity: .28; animation: drift 24s ease-in-out infinite alternate; }
        .aurora i:nth-child(1) { background: #6c5cff; top: -20%; left: -10%; }
        .aurora i:nth-child(2) { background: #ff3d71; top: 10%; right: -20%; animation-delay: -8s; opacity: .2; }
        .aurora i:nth-child(3) { background: #2fd0ff; bottom: -25%; left: 25%; animation-delay: -15s; opacity: .18; }
        @keyframes drift { to { transform: translate(8vw, 6vh) scale(1.15); } }
        .grid-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .5;
          background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 64px 64px; mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%); }
        .cursor-glow { position: fixed; top: 0; left: 0; width: 500px; height: 500px; border-radius: 50%; pointer-events: none; z-index: 1;
          background: radial-gradient(circle, rgba(108,92,255,.16), rgba(47,208,255,.06) 40%, transparent 70%); }

        .wrap { max-width: 1240px; margin: 0 auto; padding: 0 28px; position: relative; z-index: 2; }
        .sec { padding: 120px 0 40px; display: flex; flex-direction: column; gap: 48px; }
        .h2 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 700; line-height: 1.05; }
        .rb-bar { height: 4px; width: 90px; border-radius: 4px; background: var(--rb); background-size: 300% 100%; animation: flow 6s linear infinite; margin-top: 16px; }
        .sub { color: ${T.mute}; margin-top: 18px; max-width: 560px; line-height: 1.7; font-size: 17px; }
        @keyframes flow { to { background-position: 300% 0; } }

        .glass { background: linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.02)); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.08); border-radius: 24px; box-shadow: 0 30px 80px -30px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.08); }
        .rb-border { position: relative; }
        .rb-border::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px; pointer-events: none;
          background: conic-gradient(from var(--ang), ${spectrum}, ${RAINBOW[0]}); animation: spinang 7s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
        @keyframes spinang { to { --ang: 360deg; } }
        .glare { position: relative; }
        .glare::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .3s;
          background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,.11), transparent 60%); }
        .glare:hover::after { opacity: 1; }

        .grad-text { background: var(--rb); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: flow 8s linear infinite; }

        .btn { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 14px; padding: 14px 26px; border-radius: 100px; cursor: pointer; border: none; background: none; transition: transform .25s ease, box-shadow .25s ease; position: relative; }
        .btn span { display: inline-flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
        .btn:hover { transform: translateY(-3px); }
        .btn-solid { background: var(--rb); background-size: 300% 100%; animation: flow 6s linear infinite; color: #08080c; box-shadow: 0 10px 40px -10px rgba(108,92,255,.7); }
        .btn-solid:hover { box-shadow: 0 16px 50px -8px rgba(217,70,239,.7); }
        .btn-ghost { background: rgba(255,255,255,.04); }
        .btn-ghost:hover { background: rgba(255,255,255,.1); }

        .chip { display: inline-block; font-size: 13.5px; font-weight: 600; padding: 8px 16px; border-radius: 100px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: ${T.text}; transition: all .25s; cursor: default; }
        .chip:hover { transform: translateY(-3px); border-color: transparent; background: linear-gradient(#0b0b10,#0b0b10) padding-box, var(--rb) border-box; border: 1px solid transparent; }
        .chip-sm { font-size: 12px; padding: 5px 12px; color: ${T.mute}; }

        .nav { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); z-index: 200; width: min(1080px, calc(100% - 28px));
          display: flex; align-items: center; justify-content: space-between; padding: 10px 12px 10px 24px; border-radius: 100px; transition: all .35s ease;
          background: rgba(10,10,14,.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,.08); }
        .nav.solid { background: rgba(8,8,12,.85); box-shadow: 0 20px 60px -20px #000; }
        .logo { font-family: 'Sora'; font-weight: 800; font-size: 20px; letter-spacing: -.02em; }
        .nav-links { display: flex; gap: 4px; align-items: center; }
        .nav-link { font-size: 14px; font-weight: 600; color: ${T.mute}; padding: 8px 16px; border-radius: 100px; transition: all .2s; }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,.07); }
        .menu-btn { display: none; width: 44px; height: 40px; border-radius: 100px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.05); cursor: pointer; font-size: 16px; }
        .progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: var(--rb); transform-origin: 0 50%; z-index: 300; }

        .hero { min-height: 100vh; padding: 150px 0 80px; display: grid; grid-template-columns: 1.05fr .95fr; gap: 30px; align-items: center; }
        .live { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 600; color: ${T.mute}; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); margin-bottom: 28px; }
        .live i { width: 8px; height: 8px; border-radius: 50%; background: #3dff9f; box-shadow: 0 0 0 0 rgba(61,255,159,.7); animation: ping 2s infinite; }
        @keyframes ping { 70% { box-shadow: 0 0 0 10px rgba(61,255,159,0); } 100% { box-shadow: 0 0 0 0 rgba(61,255,159,0); } }
        .hero h1 { font-size: clamp(3.2rem, 8.4vw, 7.2rem); font-weight: 800; line-height: .95; }
        .role { font-family: 'Sora'; font-weight: 600; font-size: clamp(1.1rem, 2.2vw, 1.6rem); margin-top: 22px; color: ${T.text}; }
        .lead { color: ${T.mute}; font-size: 18px; line-height: 1.75; max-width: 520px; margin-top: 20px; }

        .stage { position: relative; height: 560px; perspective: 1400px; }
        .scene { position: absolute; inset: 0; transform-style: preserve-3d; }

        .ring-wrap { transform-style: preserve-3d; animation: ringspin 18s linear infinite; }
        @keyframes ringspin { from { transform: rotateX(68deg) rotateZ(0deg); } to { transform: rotateX(68deg) rotateZ(360deg); } }

        .code { width: 440px; max-width: 92%; border-radius: 18px; overflow: hidden; background: rgba(10,10,16,.88); backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.12); box-shadow: 0 50px 100px -30px #000, 0 0 80px -20px rgba(108,92,255,.5); }
        .code-bar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
        .code-bar i { width: 11px; height: 11px; border-radius: 50%; }
        .code-bar span { margin-left: 10px; font: 500 12px 'JetBrains Mono', monospace; color: ${T.dim}; }
        .code pre { font: 400 13.5px/1.85 'JetBrains Mono', monospace; padding: 20px 22px 24px; color: #c9c9dc; white-space: pre-wrap; }
        .k { color: #d946ef; } .s { color: #3dff9f; } .p { color: #2fd0ff; } .n { color: #ffe14d; } .c { color: ${T.dim}; }
        .caret { display: inline-block; width: 8px; height: 15px; background: #2fd0ff; vertical-align: -2px; animation: blinkc 1s steps(1) infinite; }
        @keyframes blinkc { 50% { opacity: 0; } }

        .badge { position: absolute; display: inline-flex; align-items: center; gap: 9px; padding: 10px 18px; border-radius: 100px; font: 700 13px 'Sora'; color: #fff;
          background: rgba(12,12,18,.8); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,.14); box-shadow: 0 18px 40px -12px var(--c), 0 0 0 1px rgba(255,255,255,.02) inset;
          animation: bob 5s ease-in-out infinite; }
        .badge i { width: 9px; height: 9px; border-radius: 50%; background: var(--c); box-shadow: 0 0 12px var(--c); }
        @keyframes bob { 50% { transform: translateY(-14px); } }

        .ticker { position: relative; z-index: 2; overflow: hidden; border-block: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02); padding: 22px 0;
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .track { display: flex; width: max-content; animation: marquee 34s linear infinite; }
        .ticker:hover .track { animation-play-state: paused; }
        @keyframes marquee { to { transform: translateX(-50%); } }
        .ticker span { font: 700 26px 'Sora'; padding: 0 30px; white-space: nowrap; color: rgba(255,255,255,.22); transition: color .3s; display: flex; align-items: center; gap: 30px; }
        .ticker span:hover { color: #fff; }
        .ticker b { width: 8px; height: 8px; border-radius: 50%; background: var(--rb); }

        .about-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 28px; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .stat { padding: 26px 18px; text-align: center; }
        .stat b { display: block; font: 800 clamp(2rem, 4vw, 3rem) 'Sora'; }
        .stat small { color: ${T.mute}; font-size: 13px; font-weight: 600; }

        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }

        .proj { display: grid; grid-template-columns: 1.15fr .85fr; gap: 50px; align-items: center; padding: 34px; }
        .proj.rev .proj-img { order: 2; }
        .proj h3 { font-size: clamp(2.2rem, 4.4vw, 3.4rem); font-weight: 700; margin: 14px 0 14px; line-height: 1; }
        .desc { color: ${T.mute}; line-height: 1.75; font-size: 16px; margin-bottom: 22px; }
        .meta { font: 500 12.5px 'JetBrains Mono', monospace; color: ${T.dim}; }
        .browser { border-radius: 14px; overflow: hidden; background: #0d0d14; border: 1px solid rgba(255,255,255,.12); box-shadow: 0 40px 90px -30px #000, 0 0 70px -25px rgba(108,92,255,.55); transform: translateZ(50px); }
        .browser-bar { display: flex; align-items: center; gap: 7px; padding: 11px 14px; background: #15151e; border-bottom: 1px solid rgba(255,255,255,.07); }
        .browser-bar i { width: 10px; height: 10px; border-radius: 50%; }
        .browser-bar span { margin-left: 12px; flex: 1; font: 500 11.5px 'JetBrains Mono', monospace; color: ${T.dim}; background: rgba(255,255,255,.05); padding: 5px 12px; border-radius: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .browser img { display: block; width: 100%; height: auto; }

        .mini-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
        .mini { overflow: hidden; height: 100%; display: flex; flex-direction: column; }
        .mini-img { padding: 22px 22px 0; background: radial-gradient(circle at 50% 100%, rgba(108,92,255,.18), transparent 70%); }
        .mini-img .browser { border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: none; }
        .mini-body { padding: 24px 26px 28px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .mini h4 { font-size: 24px; font-weight: 700; }

        .timeline { position: relative; padding-left: 52px; display: flex; flex-direction: column; gap: 26px; max-width: 900px; }
        .tl-line { position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,.08); }
        .tl-fill { position: absolute; inset: 0; background: linear-gradient(180deg, ${spectrum}); transform-origin: top; box-shadow: 0 0 18px rgba(108,92,255,.8); }
        .tl-dot { position: absolute; left: -45px; top: 30px; width: 16px; height: 16px; border-radius: 50%; background: ${T.bg}; border: 2px solid #2fd0ff; box-shadow: 0 0 16px #2fd0ff; }

        /* EXPERIENCE cards — matches the glass design system */
        .exp-card { padding: 30px 34px; }
        .exp-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 18px; margin-bottom: 22px; }
        .exp-type { font: 700 11.5px 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .16em; color: #2fd0ff; }
        .exp-role { font-size: clamp(1.35rem, 2.6vw, 1.85rem); font-weight: 700; margin-top: 10px; line-height: 1.2; }
        .exp-company { color: ${T.mute}; margin-top: 6px; font-weight: 600; }
        .exp-dates { text-align: right; color: ${T.mute}; font-size: 13.5px; line-height: 1.6; }
        .exp-resp { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 6px 0 22px; }
        .exp-resp li { display: flex; gap: 12px; color: ${T.mute}; font-size: 14.5px; line-height: 1.65; }
        .exp-resp li::before { content: "▹"; color: #2fd0ff; flex-shrink: 0; }
        .exp-resp-title { font-size: 13px; font-weight: 700; color: ${T.text}; margin: 4px 0 12px; text-transform: uppercase; letter-spacing: .06em; }

        .contact-card { padding: 56px; position: relative; overflow: hidden; }
        .contact-card .orb { position: absolute; width: 520px; height: 520px; border-radius: 50%; right: -160px; top: -200px; background: conic-gradient(from 0deg, ${spectrum}, ${RAINBOW[0]}); filter: blur(120px); opacity: .22; animation: orb 20s linear infinite; pointer-events: none; }
        @keyframes orb { to { transform: rotate(360deg); } }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; position: relative; }
        .contact-title { font-size: clamp(2.4rem, 5.4vw, 4.4rem); font-weight: 800; line-height: 1; }
        .field { display: block; margin-bottom: 18px; }
        .field span { display: block; font-size: 13px; font-weight: 700; color: ${T.mute}; margin-bottom: 8px; }
        .field input, .field textarea { width: 100%; font: inherit; font-weight: 500; color: ${T.text}; padding: 14px 16px; border-radius: 14px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); outline: none; transition: all .25s; resize: vertical; }
        .field input:focus, .field textarea:focus { background: linear-gradient(#0b0b11,#0b0b11) padding-box, var(--rb) border-box; border: 1px solid transparent; box-shadow: 0 0 30px -8px rgba(108,92,255,.7); }
        .field input::placeholder, .field textarea::placeholder { color: ${T.dim}; }

        footer { position: relative; z-index: 2; text-align: center; padding: 70px 24px 50px; color: ${T.dim}; font-size: 14px; }
        .foot-links { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
        .foot-links a, .foot-links button { background: none; border: none; cursor: pointer; font-weight: 600; color: ${T.mute}; transition: color .2s; }
        .foot-links a:hover, .foot-links button:hover { color: #fff; }

        @media (max-width: 968px) {
          .nav-links { display: none; }
          .menu-btn { display: block; }
          .hero, .about-grid, .proj, .contact-grid, .skills-grid { grid-template-columns: 1fr; }
          .proj.rev .proj-img { order: 0; }
          .stage { height: 440px; }
          .hero { padding-top: 130px; }
          .contact-card { padding: 34px 24px; }
          .cursor-glow { display: none; }
          .exp-dates { text-align: left; }
        }
        @media (max-width: 640px) {
          .mini-grid { grid-template-columns: 1fr; }
          .proj { padding: 22px 18px; gap: 30px; }
          .badge { font-size: 11px; padding: 8px 13px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
        }
      `}</style>

      <div className="aurora"><i /><i /><i /></div>
      <div className="grid-bg" />
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} />
      <motion.div className="progress" style={{ scaleX: bar }} />

      {/* ── NAV ── */}
      <motion.nav
        className={`nav ${navSolid ? "solid" : ""}`}
        initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); go("top"); }}>
          wafa<span className="grad-text">.dev</span>
        </a>
        <div className="nav-links">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nav-link" onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a>
          ))}
          <Btn href={RESUME} style={{ padding: "10px 22px", fontSize: 13, marginLeft: 8 }}>Résumé</Btn>
        </div>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? "✕" : "☰"}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="glass"
            style={{ position: "fixed", top: 84, left: 14, right: 14, zIndex: 210, padding: 26, display: "flex", flexDirection: "column", gap: 6, background: "rgba(8,8,12,.95)" }}
          >
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }}
                style={{ fontFamily: "'Sora'", fontSize: 28, fontWeight: 700, padding: "8px 0" }}>{n.label}</a>
            ))}
            <Btn href={RESUME} style={{ marginTop: 12, justifyContent: "center" }}>Résumé</Btn>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── HERO ── */}
        <div className="wrap">
          <section id="top" className="hero" onMouseMove={heroMove} onMouseLeave={heroLeave}>
            <div>
              <motion.div className="live" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <i /> Available for new opportunities · Kerala, India
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 60, filter: "blur(14px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
                Wafa<br /><span className="grad-text">Fathima</span>
              </motion.h1>

              <motion.p className="role" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
                Full Stack MERN Developer
              </motion.p>

              <motion.p className="lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }}>
                I build responsive, scalable web applications with clean backends and pixel-perfect frontends — turning product ideas into full-stack MERN experiences, end to end.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 38 }}>
                <Btn onClick={() => go("work")}>View my work <Arrow /></Btn>
                <Btn href={RESUME} variant="ghost">Download résumé <Arrow /></Btn>
              </motion.div>
            </div>

            <motion.div className="stage" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
              <div className="scene">
                <Layer mx={mx} my={my} depth={10} style={{ inset: 0, display: "grid", placeItems: "center" }}>
                  <div className="ring-wrap" style={{ width: 460, height: 460, position: "relative" }}>
                    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }}>
                      <defs>
                        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                          {RAINBOW.map((c, i) => <stop key={c} offset={`${(i / (RAINBOW.length - 1)) * 100}%`} stopColor={c} />)}
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="96" fill="none" stroke="url(#rg)" strokeWidth="2.2" />
                      <circle cx="100" cy="100" r="76" fill="none" stroke="url(#rg)" strokeWidth="1.2" strokeDasharray="3 7" opacity=".7" />
                      <circle cx="100" cy="100" r="58" fill="none" stroke="url(#rg)" strokeWidth="1" opacity=".4" />
                    </svg>
                  </div>
                </Layer>

                <Layer mx={mx} my={my} depth={26} style={{ inset: 0, display: "grid", placeItems: "center" }}>
                  <motion.div style={{ rotateX: winRX, rotateY: winRY, transformPerspective: 1200, transformStyle: "preserve-3d" }} className="code rb-border">
                    <div className="code-bar">
                      <i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} />
                      <span>developer.ts</span>
                    </div>
                    <pre>
<span className="k">const</span> <span className="p">wafa</span> = {"{"}{"\n"}
{"  "}role: <span className="s">"Full Stack Developer"</span>,{"\n"}
{"  "}stack: [<span className="s">"React"</span>, <span className="s">"Node"</span>,{"\n"}
{"    "}<span className="s">"MongoDB"</span>, <span className="s">"PostgreSQL"</span>],{"\n"}
{"  "}devops: [<span className="s">"Docker"</span>, <span className="s">"AWS"</span>],{"\n"}
{"  "}openToWork: <span className="n">true</span>,{"\n"}
{"}"};{"\n"}{"\n"}
<span className="c">// ready to ship </span><span className="caret" />
                    </pre>
                  </motion.div>
                </Layer>

                <Layer mx={mx} my={my} depth={54} style={{ inset: 0 }}>
                  <Badge label="React" color="#2fd0ff" style={{ top: "6%", left: "4%" }} />
                  <Badge label="Node.js" color="#3dff9f" style={{ top: "18%", right: "0%" }} delay={0.8} />
                  <Badge label="MongoDB" color="#ffe14d" style={{ bottom: "20%", left: "-2%" }} delay={1.6} />
                  <Badge label="Docker" color="#6c5cff" style={{ bottom: "8%", right: "8%" }} delay={2.4} />
                  <Badge label="AWS" color="#ff9f1c" style={{ top: "46%", right: "-4%" }} delay={3.2} />
                  <Badge label="TypeScript" color="#ff3d71" style={{ top: "0%", right: "34%" }} delay={4} />
                </Layer>
              </div>
            </motion.div>
          </section>
        </div>

        {/* ── TICKER ── */}
        <div className="ticker" aria-hidden="true">
          <div className="track">
            {[0, 1].map((d) => (
              <div key={d} style={{ display: "flex" }}>
                {[...skills.frontend.slice(0, 6), ...skills.backend.slice(0, 5)].map((s, i) => (
                  <span key={`${d}-${i}`}>{s}<b /></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="wrap">
          {/* ── ABOUT ── */}
          <section id="about" className="sec">
            <Heading>Building the future,<br />one line of code at a time.</Heading>
            <div className="about-grid">
              <Tilt max={4} className="glass rb-border" style={{ padding: 38 }}>
                <motion.div {...reveal()}>
                  <p style={{ color: T.text, fontSize: 19, lineHeight: 1.8, marginBottom: 34 }}>
                    Passionate MERN Stack Developer with a focus on creating elegant, performant, and user-centric
                    web applications — from database schema to pixel-level polish.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
                    <div>
                      <h4 style={{ fontSize: 15, color: T.mute, marginBottom: 12, fontWeight: 600 }}>Languages</h4>
                      {languages.map((l) => (
                        <p key={l.name} style={{ fontWeight: 600, marginBottom: 6 }}>{l.name} <span style={{ color: T.dim }}>— {l.level}</span></p>
                      ))}
                    </div>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <h4 style={{ fontSize: 15, color: T.mute, marginBottom: 12, fontWeight: 600 }}>Beyond code</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {hobbies.map((h) => <Chip key={h} small>{h}</Chip>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="stats">
                  {[{ v: 5, s: "+", l: "Projects" }, { v: 1, s: "+", l: "Year experience" }, { v: 15, s: "+", l: "Technologies" }].map((s, i) => (
                    <Tilt key={s.l} max={8} className="glass stat">
                      <motion.div {...reveal(i)}>
                        <b className="grad-text"><Count to={s.v} suffix={s.s} /></b>
                        <small>{s.l}</small>
                      </motion.div>
                    </Tilt>
                  ))}
                </div>
                <Tilt max={6} className="glass rb-border" style={{ padding: 28, flex: 1 }}>
                  <motion.div {...reveal(3)}>
                    <p className="meta" style={{ marginBottom: 12 }}>currently building</p>
                    <p style={{ fontFamily: "'Sora'", fontSize: 21, fontWeight: 600, lineHeight: 1.4 }}>
                      Production-ready full-stack apps with Docker, AWS and PostgreSQL.
                    </p>
                  </motion.div>
                </Tilt>
              </div>
            </div>
          </section>

          {/* ── SKILLS ── */}
          <section id="expertise" className="sec">
            <Heading sub="The languages, frameworks and tools I use to take an idea from database to deployment.">Tools & expertise</Heading>
            <div className="skills-grid">
              {[
                { label: "Frontend", items: skills.frontend },
                { label: "Backend", items: skills.backend },
                { label: "Tools", items: skills.tools },
              ].map((g, gi) => (
                <Tilt key={g.label} max={6} className="glass rb-border" style={{ padding: 30 }}>
                  <motion.div {...reveal(gi)}>
                    <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 22 }}>{g.label}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {g.items.map((s) => <Chip key={s}>{s}</Chip>)}
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section id="work" className="sec" style={{ gap: 56 }}>
            <Heading sub="Full-stack products I designed, built and deployed.">Selected projects</Heading>
            {projects.map((p, i) => (
              <Tilt key={p.title} max={3} className="glass">
                <motion.article {...reveal()} className={`proj ${i % 2 ? "rev" : ""}`}>
                  <div className="proj-img"><Browser src={p.image} alt={p.title} url={p.url} /></div>
                  <div style={{ transform: "translateZ(30px)" }}>
                    <p className="meta">{p.category} / {p.year}</p>
                    <h3 className="grad-text" style={{ display: "inline-block" }}>{p.title}</h3>
                    <p className="desc">{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                      {p.tags.map((t) => <Chip key={t} small>{t}</Chip>)}
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <Btn href={p.liveLink}>Live demo <Arrow /></Btn>
                      <Btn href={p.repoLink} variant="ghost">Source code <Arrow /></Btn>
                    </div>
                  </div>
                </motion.article>
              </Tilt>
            ))}
          </section>

          {/* ── MINI PROJECTS ── */}
          <section id="mini" className="sec">
            <Heading sub="Smaller builds that show how I solve different problems with different tools.">More builds</Heading>
            <div className="mini-grid">
              {miniProjects.map((m, i) => (
                <Tilt key={m.title} max={7} className="glass" style={{ height: "100%" }}>
                  <motion.div {...reveal(i % 2)} className="mini">
                    <div className="mini-img"><Browser src={m.image} alt={m.title} url={m.liveLink.replace(/^https?:\/\//, "").replace(/\/$/, "")} /></div>
                    <div className="mini-body">
                      <h4>{m.title}</h4>
                      <p className="desc" style={{ margin: 0, fontSize: 15 }}>{m.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {m.stack.map((t) => <Chip key={t} small>{t}</Chip>)}
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto", paddingTop: 6 }}>
                        <Btn href={m.liveLink} style={{ padding: "10px 20px", fontSize: 13 }}>Live demo <Arrow /></Btn>
                        <Btn href={m.repoLink} variant="ghost" style={{ padding: "10px 20px", fontSize: 13 }}>Code</Btn>
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <Btn href="https://github.com/wafathima" variant="ghost">See more on GitHub <Arrow /></Btn>
            </div>
          </section>

          {/* ── JOURNEY: EDUCATION + EXPERIENCE ── */}
          <section id="journey" className="sec">
            <Heading sub="Education and professional roles that shaped how I build.">Experience & learning</Heading>

            {/* EDUCATION */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.mute, marginBottom: 22, textTransform: "uppercase", letterSpacing: ".14em" }}>Education</h3>
              <div className="timeline" ref={tlRef}>
                <div className="tl-line"><motion.div className="tl-fill" style={{ scaleY: tlScale }} /></div>
                {education.map((e, i) => (
                  <motion.div key={e.degree} {...reveal(i)} className="glass" style={{ padding: "26px 30px", position: "relative" }}>
                    <span className="tl-dot" />
                    <p className="meta" style={{ marginBottom: 8 }}>{e.year}</p>
                    <h3 style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)", fontWeight: 700, lineHeight: 1.25 }}>{e.degree}</h3>
                    <p style={{ color: T.mute, marginTop: 6 }}>{e.school}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.mute, marginBottom: 22, textTransform: "uppercase", letterSpacing: ".14em" }}>Experience</h3>
              <div className="timeline" style={{ gap: 28 }}>
                {experience.map((item, i) => (
                  <motion.div
                    key={`${item.role}-${item.company}`}
                    {...reveal(i)}
                    className="glass exp-card"
                    style={{ position: "relative" }}
                  >
                    <span className="tl-dot" />
                    <div className="exp-head">
                      <div>
                        <span className="exp-type">{item.type}</span>
                        <h4 className="exp-role">{item.role}</h4>
                        <p className="exp-company">{item.company}</p>
                      </div>
                      <div className="exp-dates">
                        <p>{item.period}</p>
                        <p>{item.duration}</p>
                      </div>
                    </div>
                    <p style={{ color: T.mute, lineHeight: 1.75, marginBottom: 20 }}>{item.description}</p>
                    <p className="exp-resp-title">Key responsibilities</p>
                    <ul className="exp-resp">
                      {item.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {item.technologies.map((tech) => <Chip key={tech} small>{tech}</Chip>)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" className="sec" style={{ paddingBottom: 40 }}>
            <Tilt max={2} className="glass rb-border contact-card">
              <div className="orb" />
              <div className="contact-grid">
                <motion.div {...reveal()}>
                  <h2 className="contact-title">Let's build something <span className="grad-text">great.</span></h2>
                  <p className="sub" style={{ marginBottom: 28 }}>
                    Open to freelance work, full-time roles, and collaborations. Have an idea? Let's talk.
                  </p>
                  <a href="mailto:wafathima15@gmail.com" style={{ fontFamily: "'Sora'", fontWeight: 600, fontSize: "clamp(17px, 2.2vw, 22px)", wordBreak: "break-all" }} className="grad-text">
                    wafathima15@gmail.com
                  </a>
                  <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
                    <Btn href="https://github.com/wafathima" variant="ghost">GitHub <Arrow /></Btn>
                    <Btn href="https://linkedin.com/in/wafa-fathima-1538wf" variant="ghost">LinkedIn <Arrow /></Btn>
                    <Btn href={RESUME} variant="ghost">Résumé <Arrow /></Btn>
                  </div>
                </motion.div>

                <motion.div {...reveal(1)}>
                  {sent ? (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 14 }}
                        style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px", display: "grid", placeItems: "center", background: "var(--rb)", color: "#08080c", fontSize: 32, fontWeight: 800 }}>✓</motion.div>
                      <h3 style={{ fontSize: 26, marginBottom: 8 }}>Message sent</h3>
                      <p style={{ color: T.mute, marginBottom: 24 }}>Thanks for reaching out — I'll reply soon.</p>
                      <Btn onClick={() => setSent(false)} variant="ghost">Send another</Btn>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <label className="field">
                        <span>Your name</span>
                        <input name="name" type="text" required placeholder="Jane Smith" value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                      </label>
                      <label className="field">
                        <span>Email address</span>
                        <input name="email" type="email" required placeholder="jane@example.com" value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                      </label>
                      <label className="field">
                        <span>Message</span>
                        <textarea name="message" required rows={5} placeholder="Tell me about your project…" value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} />
                      </label>
                      <Btn type="submit" style={{ width: "100%", justifyContent: "center" }}>
                        {isSubmitting ? "Sending…" : "Send message"} <Arrow />
                      </Btn>
                    </form>
                  )}
                </motion.div>
              </div>
            </Tilt>
          </section>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer>
        <p>© 2026 Wafa Fathima. Designed and built by me.</p>
        <div className="foot-links">
          <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/wafa-fathima-1538wf" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:wafathima15@gmail.com">Email</a>
          <button onClick={() => go("top")}>Back to top ↑</button>
        </div>
      </footer>
    </div>
  );
}