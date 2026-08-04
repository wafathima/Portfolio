import { useState, useEffect, } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import havenix from "./assets/images/havenix.png";
import lio from "./assets/images/lio.png";
import playora from "./assets/images/playora.png";
import notepad from "./assets/images/notepad.png";
import todo from "./assets/images/todo.png";

// Modern Dark Theme with Purple Accents
const theme = {
  background: "#09090B",
  secondaryBg: "#111827",
  cardBg: "rgba(17, 24, 39, 0.6)",
  glassBg: "rgba(255, 255, 255, 0.03)",
  primary: "#7C5CFF",
  primaryLight: "#8B5CF6",
  primaryGlow: "rgba(124, 92, 255, 0.3)",
  primaryGlowStrong: "rgba(124, 92, 255, 0.5)",
  textPrimary: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textMuted: "#6B7280",
  borderLight: "rgba(255, 255, 255, 0.06)",
  borderMedium: "rgba(255, 255, 255, 0.1)",
  success: "#34D399",
};

const skills = {
  frontend: ["TypeScript", "Next.js", "React.js", "Redux", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Responsive Design", "UI/UX Principles", "Axios", "React Router"],
  backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Mongoose", "Data Design", "Server-side Logic", "Performance Optimization"],
  tools: ["Git & GitHub", "Postman", "Vercel", "Figma", "VS Code", "Prettier"],
};

const education = [
  { year: "2026 – present", degree: "Internship — MERN Stack Developer", school: "Zaitoon International Campus" },
  { year: "2025 – 2026", degree: "Diploma in Full Stack Web Development", school: "Zaitoon International Girls Campus" },
  { year: "2023 – 2025", degree: "Higher Secondary Studies", school: "Nafeesathul Misriya Institute of Innovation" },
];

const projects = [
  {
    num: "01",
    title: "Playora",
    category: "E-Commerce Platform",
    year: "2026",
    image: playora,
    desc: "A full-stack e-commerce application built on the MERN stack with JWT auth, Redux state management, product catalogue, cart system, and fully responsive UI.",
    details: ["RESTful APIs with Node.js & Express", "JWT authentication & authorization", "MongoDB schemas via Mongoose", "Responsive React.js frontend", "Axios-powered API integration", "Cart & order management system"],
    tags: ["MERN", "E-Commerce", "JWT", "Redux", "Tailwind", "Axios"],
    liveLink: "https://playoratoy.vercel.app/",
    repoLink: "https://github.com/wafathima/playoratoystore",
  },
  {
    num: "02",
    title: "Havenix",
    category: "Real Estate Platform",
    year: "2026",
    image: havenix,
    desc: "A full-stack property platform for buying and selling real estate. Built with advanced search, full CRUD functionality, and a clean performant user interface.",
    details: ["REST APIs for listings & users", "Secure login/signup system", "MongoDB property database", "Responsive React.js UI", "Full CRUD operations", "Performance-optimized architecture"],
    tags: ["MERN", "Real Estate", "CRUD", "Tailwind", "Axios"],
    liveLink: "https://havenixfront.vercel.app/",
    repoLink: "https://github.com/wafathima/Havenix",
  },
  {
    num: "03",
    title: "Lio Store",
    category: "Frontend E-Commerce",
    year: "2025",
    image: lio,
    desc: "A responsive frontend for a shoe e-commerce brand with product filtering, cart functionality, and polished UI/UX focusing on mobile responsiveness.",
    details: ["React.js component architecture", "Product filtering & cart system", "Mock API integration", "UI/UX improvements & polish", "Full mobile responsiveness"],
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
    features: ["Create, edit, and delete notes", "Organized note management", "Responsive design", "Fast page rendering with Next.js", "Type-safe development using TypeScript", "Clean and modern UI"],
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    repoLink: "https://github.com/wafathima/Notepad",
    liveLink: "https://notepadminiapp.vercel.app/",
  },
  {
    title: "Todo App",
    image: todo,
    description: "A responsive task management application developed using React.js and TypeScript. The app helps users efficiently manage daily tasks by adding, updating, completing, and deleting todos.",
    features: ["Add new tasks", "Edit existing tasks", "Mark tasks as completed", "Delete tasks", "Responsive interface", "Instant UI updates"],
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    repoLink: "https://github.com/wafathima/TypescriptProject",
    liveLink: "https://todo-frontend-w23l.onrender.com/",
  },
];

const languages = [{ name: "English", level: "Intermediate", pct: 60 }, { name: "Malayalam", level: "Fluent", pct: 100 }];
const hobbies = ["Learning New Technologies", "Coding Practice & Problem Solving", "UI/UX Exploration", "Building Side Projects", "Tech Content & Research"];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Components
const GlassCard = ({ children, className = "" }) => (
  <div className={`glass-card ${className}`} style={{
    background: theme.glassBg,
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.borderLight}`,
    borderRadius: "24px",
    padding: "2rem",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  }}>
    {children}
  </div>
);

const SectionHeading = ({ eyebrow, title, highlight, description }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    style={{ marginBottom: "3rem" }}
  >
    <p style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: "14px",
      fontWeight: 600,
      color: theme.primary,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      marginBottom: "0.75rem",
    }}>{eyebrow}</p>
    <h2 style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
      fontWeight: 700,
      color: theme.textPrimary,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    }}>
      {title} <span style={{ color: theme.primary }}>{highlight}</span>
    </h2>
    {description && (
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "16px",
        color: theme.textSecondary,
        maxWidth: "560px",
        marginTop: "1rem",
        lineHeight: 1.7,
      }}>{description}</p>
    )}
  </motion.div>
);

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const styles = {
    primary: {
      background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
      color: "#FFFFFF",
      boxShadow: `0 4px 20px ${theme.primaryGlow}`,
    },
    secondary: {
      background: "transparent",
      color: theme.textPrimary,
      border: `1px solid ${theme.borderMedium}`,
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        padding: "14px 32px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
        ...styles[variant],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const SkillCard = ({ category, items }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      style={{
        background: theme.glassBg,
        backdropFilter: "blur(16px)",
        border: `1px solid ${theme.borderLight}`,
        borderRadius: "20px",
        padding: "1.5rem",
        transition: "all 0.4s ease",
      }}
    >
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "18px",
        fontWeight: 600,
        color: theme.textPrimary,
        marginBottom: "1rem",
      }}>{category}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: "100px",
              background: "rgba(124, 92, 255, 0.1)",
              color: theme.textSecondary,
              border: `1px solid ${theme.borderLight}`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.primary;
              e.target.style.color = "#FFFFFF";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(124, 92, 255, 0.1)";
              e.target.style.color = theme.textSecondary;
              e.target.style.transform = "scale(1)";
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

function MiniProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      style={{
        background: theme.glassBg,
        backdropFilter: "blur(16px)",
        border: `1px solid ${theme.borderLight}`,
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <img src={project.image} alt={project.title} style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s ease",
        }} />
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
          padding: "4px 14px",
          borderRadius: "100px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "'Outfit', sans-serif",
        }}>
          {project.stack.slice(0, 2).join(" · ")}
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "20px",
          fontWeight: 600,
          color: theme.textPrimary,
          marginBottom: "8px",
        }}>{project.title}</h3>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "14px",
          color: theme.textSecondary,
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}>{project.description}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" style={{ padding: "8px 18px", fontSize: "12px" }}>Code ↗</Button>
          </a>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" style={{ padding: "8px 18px", fontSize: "12px" }}>Live Demo ↗</Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [navVisible, setNavVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setNavVisible(true), 150);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["top", "about", "skills", "projects", "mini", "experience", "contact"];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      background: theme.background,
      color: theme.textPrimary,
      overflowX: "hidden",
      minHeight: "100vh",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${theme.primary}; color: #FFFFFF; }
        a { text-decoration: none; color: inherit; }
        
        .gradient-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(124, 92, 255, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(124, 92, 255, 0.06) 0%, transparent 50%);
        }
        
        .noise {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }
        
        .glass-nav {
          background: rgba(9, 9, 11, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${theme.borderLight};
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        .floating-delay {
          animation: float 4s ease-in-out infinite 1s;
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .glow-pulse {
          animation: glow 3s ease-in-out infinite;
        }
        
        @media (max-width: 968px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .project-row { grid-template-columns: 1fr !important; gap: 32px !important; }
          .project-row.rev { direction: ltr !important; }
          .nav-links { display: none !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
        
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .project-row { gap: 24px !important; }
          .section-title { font-size: clamp(1.8rem, 6vw, 2.4rem) !important; }
        }
      `}</style>

      <div className="gradient-bg" />
      <div className="noise" />

      {/* ── NAVBAR ── */}
      <nav className={`glass-nav ${navVisible ? "" : "opacity-0"}`} style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: navVisible ? 1 : 0,
        transform: navVisible ? "translateY(0)" : "translateY(-20px)",
      }}>
        <a href="#top" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "22px",
          fontWeight: 700,
          color: theme.textPrimary,
          letterSpacing: "-0.02em",
        }}>
          WF<span style={{ color: theme.primary }}>.</span>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {[
            { id: "top", label: "Home" },
            { id: "about", label: "About" },
            { id: "skills", label: "Skills" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "contact", label: "Contact" }
          ].map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeSection === item.id ? theme.primary : theme.textSecondary,
                transition: "color 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => e.target.style.color = theme.primary}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) e.target.style.color = theme.textSecondary;
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <span style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: theme.primary,
                  borderRadius: "1px",
                }} />
              )}
            </a>
          ))}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer" style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${theme.borderLight}`,
              transition: "all 0.3s ease",
              color: theme.textSecondary,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.primary;
              e.target.style.color = "#FFFFFF";
              e.target.style.borderColor = theme.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.05)";
              e.target.style.color = theme.textSecondary;
              e.target.style.borderColor = theme.borderLight;
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/wafa-fathima-1538wf" target="_blank" rel="noopener noreferrer" style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${theme.borderLight}`,
              transition: "all 0.3s ease",
              color: theme.textSecondary,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.primary;
              e.target.style.color = "#FFFFFF";
              e.target.style.borderColor = theme.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.05)";
              e.target.style.color = theme.textSecondary;
              e.target.style.borderColor = theme.borderLight;
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://drive.google.com/file/d/1HXf1aXYJb8db-skFx7cGjyIGGbEJm3-y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" style={{ padding: "10px 22px", fontSize: "13px" }}>Resume</Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" style={{
        minHeight: "100vh",
        padding: "140px 48px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "60px",
        alignItems: "center",
      }} className="hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <motion.div
            animate={floatAnimation}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: theme.glassBg,
              backdropFilter: "blur(12px)",
              border: `1px solid ${theme.borderLight}`,
              borderRadius: "100px",
              padding: "8px 20px",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: theme.success,
              display: "inline-block",
            }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: theme.textSecondary,
            }}>Available for hire</span>
          </motion.div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(3.2rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}>
            Hi, I'm <br />
            <span style={{ color: theme.primary }}>Wafa Fathima</span>
          </h1>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "18px",
            color: theme.textSecondary,
            maxWidth: "480px",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            Full Stack <span style={{ color: theme.primary, fontWeight: 600 }}>MERN</span> Developer building responsive, scalable web applications with clean backends and pixel-perfect frontends.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Button onClick={() => scrollToSection("projects")}>View Projects →</Button>
            <a href="https://drive.google.com/file/d/1HXf1aXYJb8db-skFx7cGjyIGGbEJm3-y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">Download Resume</Button>
            </a>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer" style={{
              color: theme.textSecondary,
              transition: "color 0.3s ease",
              fontSize: "20px",
            }}
            onMouseEnter={(e) => e.target.style.color = theme.primary}
            onMouseLeave={(e) => e.target.style.color = theme.textSecondary}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/wafa-fathima-1538wf" target="_blank" rel="noopener noreferrer" style={{
              color: theme.textSecondary,
              transition: "color 0.3s ease",
              fontSize: "20px",
            }}
            onMouseEnter={(e) => e.target.style.color = theme.primary}
            onMouseLeave={(e) => e.target.style.color = theme.textSecondary}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:wafathima15@gmail.com" style={{
              color: theme.textSecondary,
              transition: "color 0.3s ease",
              fontSize: "20px",
            }}
            onMouseEnter={(e) => e.target.style.color = theme.primary}
            onMouseLeave={(e) => e.target.style.color = theme.textSecondary}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "480px",
            aspectRatio: "1",
          }}>
            {/* Glow orb */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "80%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.primaryGlow}, transparent 70%)`,
              filter: "blur(60px)",
              animation: "glow 3s ease-in-out infinite",
            }} />

            {/* Glass card */}
            <GlassCard style={{
              position: "relative",
              zIndex: 1,
              padding: "2rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${theme.borderMedium}`,
            }}>
              <div style={{
                fontSize: "72px",
                marginBottom: "1rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {"</>"}
              </div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "16px",
                color: theme.textSecondary,
                textAlign: "center",
                maxWidth: "280px",
              }}>
                Full Stack Developer
              </p>
              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "1.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
                {["React", "Node", "MongoDB", "TypeScript"].map(tech => (
                  <span key={tech} style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    borderRadius: "100px",
                    background: "rgba(124, 92, 255, 0.15)",
                    color: theme.textSecondary,
                    border: `1px solid ${theme.borderLight}`,
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                background: theme.glassBg,
                backdropFilter: "blur(16px)",
                border: `1px solid ${theme.borderLight}`,
                borderRadius: "16px",
                padding: "12px 16px",
                fontSize: "13px",
                color: theme.textSecondary,
                fontFamily: "'Outfit', sans-serif",
                boxShadow: `0 8px 32px ${theme.primaryGlow}`,
                zIndex: 2,
              }}
            >
              ✦ 3+ Projects
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "-20px",
                background: theme.glassBg,
                backdropFilter: "blur(16px)",
                border: `1px solid ${theme.borderLight}`,
                borderRadius: "16px",
                padding: "12px 16px",
                fontSize: "13px",
                color: theme.textSecondary,
                fontFamily: "'Outfit', sans-serif",
                boxShadow: `0 8px 32px ${theme.primaryGlow}`,
                zIndex: 2,
              }}
            >
              ⚡ 1+ Year Exp
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{
        padding: "80px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <SectionHeading
          eyebrow="About Me"
          title="Building the Future,"
          highlight="One Line at a Time"
          description="Passionate MERN Stack Developer with a focus on creating elegant, performant, and user-centric web applications."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="skills-grid"
        >
          {[
            { label: "Projects", value: "5+", icon: "🚀" },
            { label: "Experience", value: "1+ Year", icon: "💼" },
            { label: "Technologies", value: "15+", icon: "⚡" },
            
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              style={{
                background: theme.glassBg,
                backdropFilter: "blur(16px)",
                border: `1px solid ${theme.borderLight}`,
                borderRadius: "20px",
                padding: "1.5rem",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{stat.icon}</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: theme.textPrimary,
              }}>{stat.value}</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                color: theme.textSecondary,
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{
        padding: "80px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <SectionHeading
          eyebrow="My Skills"
          title="Technical"
          highlight="Expertise"
          description="A comprehensive set of technologies and tools I work with to build modern web applications."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
          className="skills-grid"
        >
          <motion.div variants={fadeUp}>
            <SkillCard category="Frontend" items={skills.frontend} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <SkillCard category="Backend" items={skills.backend} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <SkillCard category="Tools" items={skills.tools} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{
        padding: "80px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured"
          highlight="Projects"
          description="A selection of my recent work showcasing full-stack development, responsive design, and modern architecture."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`project-row ${i % 2 === 1 ? "rev" : ""}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "center",
              }}
            >
              <div className="proj-img-wrap" style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
                transition: "all 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 30px 60px ${theme.primaryGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
              }}>
                <img src={proj.image} alt={proj.title} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
              </div>
              <div>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: theme.primary,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>{proj.category} · {proj.year}</p>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)",
                  fontWeight: 700,
                  color: theme.textPrimary,
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}>{proj.title}</h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "15px",
                  color: theme.textSecondary,
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}>{proj.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.5rem" }}>
                  {proj.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "rgba(124, 92, 255, 0.1)",
                      color: theme.textSecondary,
                      border: `1px solid ${theme.borderLight}`,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a href={proj.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" style={{ padding: "10px 24px", fontSize: "13px" }}>Live Demo ↗</Button>
                  </a>
                  <a href={proj.repoLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" style={{ padding: "10px 24px", fontSize: "13px" }}>Code ↗</Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MINI PROJECTS ── */}
      <section id="mini" style={{
        padding: "80px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <SectionHeading
          eyebrow="Side Projects"
          title="Mini"
          highlight="Projects"
          description="Smaller projects and experiments built while learning and exploring new technologies."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="mini-grid">
          {miniProjects.map((project, i) => (
            <MiniProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{
        padding: "80px 48px",
        maxWidth: "1000px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <SectionHeading
          eyebrow="Timeline"
          title="Experience &"
          highlight="Learning Journey"
        />

        <div style={{ position: "relative", paddingLeft: "24px" }}>
          <div style={{
            position: "absolute",
            left: "8px",
            top: "0",
            bottom: "0",
            width: "2px",
            background: `linear-gradient(to bottom, ${theme.borderLight}, ${theme.primary}, ${theme.borderLight})`,
          }} />
          {education.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                position: "relative",
                padding: "1.5rem 2rem",
                marginBottom: i === education.length - 1 ? 0 : "1.5rem",
                background: theme.glassBg,
                backdropFilter: "blur(16px)",
                border: `1px solid ${theme.borderLight}`,
                borderRadius: "16px",
                marginLeft: "20px",
              }}
            >
              <div style={{
                position: "absolute",
                left: "-28px",
                top: "1.5rem",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: theme.primary,
                border: `2px solid ${theme.background}`,
                boxShadow: `0 0 20px ${theme.primaryGlow}`,
              }} />
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: theme.primary,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}>{e.year}</p>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: theme.textPrimary,
                marginBottom: "4px",
              }}>{e.degree}</h3>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                color: theme.textSecondary,
              }}>{e.school}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        padding: "80px 48px 60px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <div className="contact-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: theme.primary,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>Let's Connect</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Let's Build<br />
              <span style={{ color: theme.primary }}>Something</span> Great
            </h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "16px",
              color: theme.textSecondary,
              lineHeight: 1.8,
              maxWidth: "360px",
              marginBottom: "2rem",
            }}>
              Open to freelance, full-time roles, and collaborations. Have an idea? Let's talk.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">GitHub ↗</Button>
              </a>
              <a href="https://linkedin.com/in/wafa-fathima-1538wf" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">LinkedIn ↗</Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard>
              {sent ? (
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: theme.success,
                    marginBottom: "8px",
                  }}>Message sent ✓</p>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "14px",
                    color: theme.textSecondary,
                    lineHeight: 1.7,
                  }}>Thanks for reaching out — I'll get back to you soon.</p>
                  <Button variant="secondary" style={{ marginTop: "20px" }} onClick={() => setSent(false)}>Send another →</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[["name", "text", "Your Name", "Jane Smith"], ["email", "email", "Email Address", "jane@example.com"]].map(([name, type, label, ph]) => (
                    <div key={name} style={{ marginBottom: "16px" }}>
                      <label style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: theme.textSecondary,
                        display: "block",
                        marginBottom: "6px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}>{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))}
                        placeholder={ph}
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          width: "100%",
                          padding: "14px 18px",
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${theme.borderLight}`,
                          borderRadius: "12px",
                          color: theme.textPrimary,
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = theme.primary;
                          e.target.style.boxShadow = `0 0 0 4px ${theme.primaryGlow}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = theme.borderLight;
                          e.target.style.boxShadow = "none";
                        }}
                        required
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: theme.textSecondary,
                      display: "block",
                      marginBottom: "6px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Your message here…"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        width: "100%",
                        padding: "14px 18px",
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${theme.borderLight}`,
                        borderRadius: "12px",
                        color: theme.textPrimary,
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                        outline: "none",
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = theme.primary;
                        e.target.style.boxShadow = `0 0 0 4px ${theme.primaryGlow}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = theme.borderLight;
                        e.target.style.boxShadow = "none";
                      }}
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" style={{ width: "100%", padding: "16px" }}>
                    {isSubmitting ? "Sending…" : "Send Message →"}
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${theme.borderLight}`,
        padding: "30px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        position: "relative",
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "18px",
          fontWeight: 700,
          color: theme.textMuted,
        }}>
          Wafa<span style={{ color: theme.primary }}>.</span>
        </p>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          color: theme.textMuted,
        }}>© 2026 — All rights reserved</p>
        <div style={{ display: "flex", gap: "20px" }}>
          {[["GitHub", "https://github.com/wafathima"], ["LinkedIn", "https://linkedin.com/in/wafa-fathima-1538wf"], ["Email", "mailto:wafathima15@gmail.com"]].map(([l, h]) => (
            <a
              key={l}
              href={h}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: theme.textMuted,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = theme.primary}
              onMouseLeave={(e) => e.target.style.color = theme.textMuted}
            >
              {l}
            </a>
          ))}
          <button
            onClick={() => scrollToSection("top")}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: theme.textMuted,
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.color = theme.primary}
            onMouseLeave={(e) => e.target.style.color = theme.textMuted}
          >
            ↑ Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
}