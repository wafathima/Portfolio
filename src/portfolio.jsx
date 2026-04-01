import { useState, useEffect, useRef } from "react";

const skills = {
  frontend: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React.js", "Redux"],
  backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
  tools: ["Git & GitHub", "Postman", "Vercel", "Figma"],
};

const education = [
  {
    year: "2025 – 2026",
    degree: "Diploma in Full Stack Web Development",
    school: "Zaitoon International Girls Campus",
  },
  {
    year: "2023 – 2025",
    degree: "Higher Secondary Studies",
    school: "Nafeesathul Misriya Institute of Innovation",
  },
];

const projects = [
  {
    num: "01",
    title: "Playora",
    category: "E-Commerce Platform",
    year: "2026",
    desc: "A full-stack e-commerce application built on the MERN stack. Features JWT-based authentication, Redux state management, product catalogue, cart system, and order handling with a fully responsive UI.",
    details: [
      "RESTful APIs with Node.js & Express",
      "JWT authentication & authorization",
      "MongoDB schemas via Mongoose",
      "Responsive React.js frontend",
      "Axios-powered API integration",
      "Cart & order management system",
    ],
    tags: ["MERN", "E-Commerce", "JWT", "Redux"],
    link: "https://github.com/yourusername",
  },
  {
    num: "02",
    title: "Havenix",
    category: "Real Estate Platform",
    year: "2026",
    desc: "A full-stack property platform for buying and selling real estate. Built with advanced search, full CRUD functionality, and a clean, performant user interface.",
    details: [
      "REST APIs for listings & users",
      "Secure login/signup system",
      "MongoDB property database",
      "Responsive React.js UI",
      "Full CRUD operations",
      "Performance-optimized architecture",
    ],
    tags: ["MERN", "Real Estate", "CRUD", "Tailwind"],
    link: "https://github.com/yourusername",
  },
  {
    num: "03",
    title: "Lio Store",
    category: "Frontend E-Commerce",
    year: "2025",
    desc: "A responsive frontend for a shoe e-commerce brand. Features product filtering, cart functionality, and polished UI/UX with a focus on mobile responsiveness.",
    details: [
      "React.js component architecture",
      "Product filtering & cart system",
      "Mock API integration",
      "UI/UX improvements & polish",
      "Full mobile responsiveness",
    ],
    tags: ["React", "Frontend", "UI/UX"],
    link: "https://github.com/yourusername",
  },
];

const languages = [
  { name: "English", level: "Intermediate", pct: 60 },
  { name: "Malayalam", level: "Fluent", pct: 100 },
];

const hobbies = [
  "Learning New Technologies",
  "Coding Practice & Problem Solving",
  "UI/UX Exploration",
  "Building Side Projects",
  "Tech Content & Research",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [openProject, setOpenProject] = useState(null);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNavVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#0E0E0E", color: "#F0EAD6", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #ff6b00; color: #0E0E0E; }
        a { text-decoration: none; color: inherit; }
        .sans { font-family: 'Outfit', sans-serif; }
        .tag {
          font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 12px;
          border: 1px solid rgba(201,168,76,0.4); color: #ff6b00; border-radius: 2px;
        }
        .skill-chip {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 400;
          padding: 6px 16px; border: 1px solid rgba(240,234,214,0.12);
          color: rgba(240,234,214,0.7); border-radius: 2px; transition: all 0.25s ease; cursor: default;
        }
        .skill-chip:hover { border-color: #ff6b00; color: #ff6b00; background: rgba(201,168,76,0.06); }
        .project-card {
          border: 1px solid rgba(240,234,214,0.08); border-radius: 4px; padding: 2.5rem;
          background: #141414; transition: border-color 0.3s ease, background 0.3s ease; cursor: pointer;
        }
        .project-card:hover { border-color: rgba(201,168,76,0.3); background: #181818; }
        .details-panel { overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease; }
        .nav-link {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase; color: rgba(240,234,214,0.5); transition: color 0.2s ease;
        }
        .nav-link:hover { color: #F0EAD6; }
        .contact-item {
          font-family: 'Outfit', sans-serif; font-size: 13px; color: rgba(240,234,214,0.55);
          display: flex; align-items: center; gap: 10px; transition: color 0.2s;
        }
        .contact-item:hover { color: #ff6b00; }
        .section-label {
          font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: #ff6b00; margin-bottom: 0.5rem; display: block;
        }
        .hobby-item {
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400;
          color: rgba(240,234,214,0.5); padding: 14px 0; border-bottom: 1px solid rgba(240,234,214,0.06);
          display: flex; align-items: center; gap: 12px; transition: color 0.2s;
        }
        .hobby-item:hover { color: #F0EAD6; }
        .hobby-item::before { content: ''; width: 4px; height: 4px; background: #ff6b00; border-radius: 50%; flex-shrink: 0; }
        .cta-btn {
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 12px 28px; border: 1px solid #ff6b00; color: #ff6b00;
          background: transparent; border-radius: 2px; cursor: pointer; transition: all 0.25s ease; display: inline-block;
        }
        .cta-btn:hover { background: #ff6b00; color: #0E0E0E; }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { 0%{top:-30px} 100%{top:50px} }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(14,14,14,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(240,234,214,0.05)",
        opacity: navVisible ? 1 : 0,
        animation: navVisible ? "fadeDown 0.6s ease forwards" : "none",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 600 }}>
          PORT <span style={{ color: "#ff6b00" }}>FOLIO</span>
        </div>
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {["About", "Skills", "Work", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 60px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[20, 40, 60, 80].map((p) => (
            <div key={p} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: "1px", background: "rgba(240,234,214,0.025)" }} />
          ))}
          {[25, 50, 75].map((p) => (
            <div key={p} style={{ position: "absolute", top: `${p}%`, left: 0, right: 0, height: "1px", background: "rgba(240,234,214,0.025)" }} />
          ))}
        </div>

        {/* BG text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8rem,22vw,22rem)", fontWeight: 700,
          color: "transparent", WebkitTextStroke: "1px rgba(240,234,214,0.04)",
          whiteSpace: "nowrap", userSelect: "none", letterSpacing: "-0.02em", lineHeight: 1, pointerEvents: "none",
        }}>PORTFOLIO</div>

        {/* Meta top-right */}
        <div style={{
          position: "absolute", top: "140px", right: "60px",
          display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end",
          animation: "fadeDown 0.9s ease 0.4s both",
        }}>
          <div style={{ width: "60px", height: "1px", background: "#ff6b00" }} />
          <p className="sans" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,234,214,0.3)" }}>Full Stack Developer</p>
          <p className="sans" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,234,214,0.3)" }}>Kerala, India — 2026</p>
        </div>

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ animation: "fadeUp 0.9s ease 0.1s both" }}>
            <span className="section-label" style={{ marginBottom: "1.5rem" }}>Hello, I'm</span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(4rem, 10vw, 9rem)", fontWeight: 700,
              lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "2.5rem",
            }}>
              Wafa
              <span style={{  color: "#ff6b00" }}>Fathima</span>
            </h1>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "900px",
            animation: "fadeUp 0.9s ease 0.3s both",
          }}>
            <div>
              <p className="sans" style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "rgba(240,234,214,0.6)", maxWidth: "400px" }}>
                A passionate <strong style={{ color: "#F0EAD6", fontWeight: 500 }}>MERN Stack Developer</strong> based in Kerala, India.
                 I build responsive, scalable web applications — crafting clean backends and pixel-perfect frontends that solve real-world problems.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "14px" }}>
                <a href="#work" className="cta-btn" style={{ borderColor: "rgba(240,234,214,0.2)", color: "rgba(240,234,214,0.6)" }}>View Work</a>
              </div>
            </div>

            <div style={{ borderLeft: "1px solid rgba(240,234,214,0.08)", paddingLeft: "60px" }}>
              <span className="section-label">Contact Details</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "1.2rem" }}>
                <a href="mailto:wafathima15@gmail.com" className="contact-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  wafathima15@gmail.com
                </a>
                <span className="contact-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +91 97474 93273
                </span>
                <span className="contact-item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Vadakara, Calicut, Kerala
                </span>
                <a href="https://linkedin.com/in/wafa-fathima-1538wf" className="contact-item">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  linkedin
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", right: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "fadeDown 1s ease 0.8s both" }}>
          <div className="sans" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,234,214,0.3)", writingMode: "vertical-rl" }}>Scroll</div>
          <div style={{ width: "1px", height: "50px", background: "rgba(201,168,76,0.3)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, width: "100%", height: "30px", background: "linear-gradient(to bottom, #ff6b00, transparent)", animation: "slideDown 2s ease infinite" }} />
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "100px 60px", background: "#0A0A0A", borderTop: "1px solid rgba(240,234,214,0.05)" }}>
        <FadeIn>
          <span className="section-label">Background</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "3.5rem", marginTop: "0.5rem" }}>
            Education
          </h2>
        </FadeIn>
        {education.map((e, i) => (
          <FadeIn key={i} delay={i * 120}>
            <div style={{
              display: "grid", gridTemplateColumns: "160px 1fr", gap: "40px",
              padding: "32px 0", borderBottom: "1px solid rgba(240,234,214,0.06)", alignItems: "start",
            }}>
              <p className="sans" style={{ fontSize: "12px", color: "#ff6b00", fontWeight: 500, letterSpacing: "0.05em" }}>{e.year}</p>
              <div>
                <p style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.3, marginBottom: "6px" }}>{e.degree}</p>
                <p className="sans" style={{ fontSize: "13px", color: "rgba(240,234,214,0.45)" }}>{e.school}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 60px", background: "#0E0E0E", borderTop: "1px solid rgba(240,234,214,0.05)" }}>
        <FadeIn>
          <span className="section-label">Capabilities</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "3.5rem", marginTop: "0.5rem" }}>
            Technical Skills
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px" }}>
          {[
            { label: "Frontend Development", items: skills.frontend },
            { label: "Backend & Database", items: skills.backend },
            { label: "Tools & Workflow", items: skills.tools },
          ].map((group, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div style={{ padding: "2.5rem", background: "#111", border: "1px solid rgba(240,234,214,0.06)", borderRadius: "4px" }}>
                <span className="section-label" style={{ marginBottom: "1.5rem" }}>{group.label}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "1rem" }}>
                  {group.items.map((s) => <span key={s} className="skill-chip">{s}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div style={{ marginTop: "60px" }}>
            <span className="section-label" style={{ marginBottom: "1.5rem" }}>Languages</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 280px)", gap: "20px", marginTop: "1rem" }}>
              {languages.map((l, i) => (
                <div key={i} style={{ padding: "1.5rem 2rem", background: "#111", border: "1px solid rgba(240,234,214,0.06)", borderRadius: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                    <p style={{ fontSize: "18px", fontWeight: 600 }}>{l.name}</p>
                    <p className="sans" style={{ fontSize: "11px", color: "rgba(240,234,214,0.4)", letterSpacing: "0.08em" }}>{l.level}</p>
                  </div>
                  <div style={{ height: "2px", background: "rgba(240,234,214,0.08)", borderRadius: "1px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${l.pct}%`, background: "#ff6b00", borderRadius: "1px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* PROJECTS */}
      <section id="work" style={{ padding: "100px 60px", background: "#0A0A0A", borderTop: "1px solid rgba(240,234,214,0.05)" }}>
        <FadeIn>
          <span className="section-label">Selected Work</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "3.5rem", marginTop: "0.5rem" }}>
            Projects
          </h2>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {projects.map((proj, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="project-card" onClick={() => setOpenProject(openProject === i ? null : i)}>
                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "32px", alignItems: "start" }}>
                  <p className="sans" style={{ fontSize: "11px", color: "rgba(240,234,214,0.25)", fontWeight: 500, letterSpacing: "0.1em", paddingTop: "4px" }}>{proj.num}</p>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px" }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, lineHeight: 1 }}>{proj.title}</h3>
                      <span className="sans" style={{ fontSize: "13px", color: "#ff6b00" }}>{proj.category}</span>
                    </div>
                    <p className="sans" style={{ fontSize: "14px", color: "rgba(240,234,214,0.5)", lineHeight: 1.7, maxWidth: "640px" }}>{proj.desc}</p>
                    <div className="details-panel" style={{ maxHeight: openProject === i ? "500px" : "0", opacity: openProject === i ? 1 : 0 }}>
                      <div style={{ paddingTop: "24px" }}>
                        <span className="section-label" style={{ marginBottom: "12px" }}>Key Features</span>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px", marginTop: "0.8rem" }}>
                          {proj.details.map((d, di) => (
                            <p key={di} className="sans" style={{ fontSize: "13px", color: "rgba(240,234,214,0.5)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                              <span style={{ color: "#ff6b00", flexShrink: 0, marginTop: "2px" }}>—</span>{d}
                            </p>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                          {proj.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                          <a href="https://github.com/repos" target="_blank" className="cta-btn" style={{ padding: "6px 16px", fontSize: "10px", marginLeft: "auto" }}>View Repository ↗</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", paddingTop: "4px" }}>
                    <p className="sans" style={{ fontSize: "11px", color: "rgba(240,234,214,0.25)", letterSpacing: "0.1em" }}>{proj.year}</p>
                    <div style={{
                      width: "28px", height: "28px", border: "1px solid rgba(240,234,214,0.15)",
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(240,234,214,0.4)", fontSize: "14px", transition: "all 0.3s ease",
                      transform: openProject === i ? "rotate(45deg)" : "rotate(0deg)",
                      background: openProject === i ? "rgba(201,168,76,0.1)" : "transparent",
                      borderColor: openProject === i ? "#ff6b00" : "rgba(240,234,214,0.15)",
                    }}>+</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* HOBBIES + CONTACT */}
      <section id="contact" style={{ padding: "100px 60px", background: "#0E0E0E", borderTop: "1px solid rgba(240,234,214,0.05)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <FadeIn>
            <span className="section-label">Beyond Code</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,4vw,3.5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2.5rem", marginTop: "0.5rem" }}>
              Hobbies &amp;<br /><span style={{ fontStyle: "italic", color: "#ff6b00" }}>Interests</span>
            </h2>
            {hobbies.map((h, i) => <div key={i} className="hobby-item">{h}</div>)}
          </FadeIn>

          <FadeIn delay={150}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="section-label">Get In Touch</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", marginTop: "0.5rem" }}>
                Let's Build<br /><span style={{ fontStyle: "italic", color: "#ff6b00" }}>Something Great</span>
              </h2>
              <p className="sans" style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: "rgba(240,234,214,0.5)", marginBottom: "2rem", maxWidth: "360px" }}>
                I'm open to freelance opportunities, full-time roles, and collaborative projects. If you have an idea, let's talk.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "2.5rem" }}>
                <a href="mailto:wafathima15@gmail.com" className="contact-item" style={{ fontSize: "14px" }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  wafathima15@gmail.com
                </a>
                <span className="contact-item" style={{ fontSize: "14px" }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +91 97474 93273
                </span>
              </div>
              <a href="mailto:wafathima15@gmail.com" className="cta-btn" style={{ alignSelf: "flex-start" }}>Send a Message →</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#080808", borderTop: "1px solid rgba(240,234,214,0.05)",
        padding: "32px 60px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 600, color: "rgba(240,234,214,0.3)" }}>
          Wafa <span style={{ color: "#ff6b00" }}>Fathima</span>
        </p>
        <p className="sans" style={{ fontSize: "11px", color: "rgba(240,234,214,0.2)", letterSpacing: "0.1em" }}>© 2026 — All rights reserved</p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["GitHub", "LinkedIn", "Email"].map((s) => (
            <a key={s} href="#" className="sans" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(240,234,214,0.3)", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#ff6b00"}
              onMouseLeave={e => e.target.style.color = "rgba(240,234,214,0.3)"}
            >{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
