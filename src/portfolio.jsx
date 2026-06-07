import { useState, useEffect, useRef } from "react";

const skills = {
  frontend: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React.js", "Redux", "Responsive Design", "UI/UX Principles", "Axios", "React Router"],
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
    num: "01", title: "Playora", category: "E-Commerce Platform", year: "2026",
    color: "#1B4D3E", accent: "#A8D5BA",
    desc: "A full-stack e-commerce application built on the MERN stack with JWT auth, Redux state management, product catalogue, cart system, and fully responsive UI.",
    details: ["RESTful APIs with Node.js & Express","JWT authentication & authorization","MongoDB schemas via Mongoose","Responsive React.js frontend","Axios-powered API integration","Cart & order management system"],
    tags: ["MERN","E-Commerce","JWT","Redux","Tailwind","Axios"],
    liveLink: "https://playoratoy.vercel.app/",
    repoLink: "https://github.com/wafathima/playoratoystore",
  },
  {
    num: "02", title: "Havenix", category: "Real Estate Platform", year: "2026",
    color: "#6B3A2A", accent: "#F2C4A0",
    desc: "A full-stack property platform for buying and selling real estate. Built with advanced search, full CRUD functionality, and a clean performant user interface.",
    details: ["REST APIs for listings & users","Secure login/signup system","MongoDB property database","Responsive React.js UI","Full CRUD operations","Performance-optimized architecture"],
    tags: ["MERN","Real Estate","CRUD","Tailwind","Axios"],
    liveLink: "https://havenixfront.vercel.app/",
    repoLink: "https://github.com/wafathima/havenixrealestate",
  },
  {
    num: "03", title: "Lio Store", category: "Frontend E-Commerce", year: "2025",
    color: "#2C3E6B", accent: "#B8C8F0",
    desc: "A responsive frontend for a shoe e-commerce brand with product filtering, cart functionality, and polished UI/UX focusing on mobile responsiveness.",
    details: ["React.js component architecture","Product filtering & cart system","Mock API integration","UI/UX improvements & polish","Full mobile responsiveness"],
    tags: ["React","Frontend","UI/UX","Tailwind"],
    liveLink: "https://liostorecom.vercel.app/",
    repoLink: "https://github.com/wafathima/liostorecom",
  },
];

const hobbies = ["Learning New Technologies","Coding Practice & Problem Solving","UI/UX Exploration","Building Side Projects","Tech Content & Research"];
const languages = [{ name: "English", level: "Intermediate", pct: 60 },{ name: "Malayalam", level: "Fluent", pct: 100 }];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, from = "bottom" }) {
  const [ref, inView] = useInView();
  const transforms = { bottom: "translateY(32px)", left: "translateX(-24px)", right: "translateX(24px)", scale: "scale(0.94)" };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[from],
      transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

export default function Portfolio() {
  const [openProject, setOpenProject] = useState(null);
  const [navVisible, setNavVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSkill, setActiveSkill] = useState("frontend");

  useEffect(() => { setTimeout(() => setNavVisible(true), 200); }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setShowModal(false); setFormData({ name: "", email: "", message: "" }); }, 1000);
  };

  const skillGroups = { frontend: skills.frontend, backend: skills.backend, tools: skills.tools };
  const skillLabels = { frontend: "Frontend", backend: "Backend & DB", tools: "Tools" };
  const skillColors = { frontend: "#1B4D3E", backend: "#6B3A2A", tools: "#2C3E6B" };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#FAF7F2", color: "#1C1917", overflowX: "hidden", cursor: "default" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&family=Syne:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:#1B4D3E;color:#FAF7F2}
        a{text-decoration:none;color:inherit}
        .serif{font-family:'Fraunces',Georgia,serif}
        .pill{font-family:'Syne',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px;border:1.5px solid currentColor;display:inline-block}
        .chip{font-family:'Syne',sans-serif;font-size:11px;font-weight:500;padding:6px 14px;border-radius:6px;background:#EDE8DF;color:#5C5347;transition:all 0.2s ease;cursor:default}
        .chip:hover{background:#1B4D3E;color:#A8D5BA}
        .nav-link{font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9C8F82;transition:color 0.2s}
        .nav-link:hover{color:#1C1917}
        .hobby-pill{font-family:'Syne',sans-serif;font-size:12px;font-weight:500;padding:10px 20px;background:#EDE8DF;border-radius:100px;color:#5C5347;transition:all 0.25s ease;display:inline-block}
        .hobby-pill:hover{background:#1B4D3E;color:#A8D5BA;transform:translateY(-2px)}
        .btn-main{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:13px 30px;background:#1C1917;color:#FAF7F2;border:none;border-radius:6px;cursor:pointer;transition:all 0.25s ease;display:inline-block}
        .btn-main:hover{background:#1B4D3E;transform:translateY(-1px)}
        .btn-outline{font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:12px 28px;background:transparent;color:#1C1917;border:1.5px solid #C8BEB4;border-radius:6px;cursor:pointer;transition:all 0.25s ease;display:inline-block}
        .btn-outline:hover{border-color:#1C1917;background:#1C1917;color:#FAF7F2}
        .contact-row{display:flex;align-items:center;gap:10px;font-family:'Syne',sans-serif;font-size:13px;color:#9C8F82;padding:10px 0;border-bottom:1px solid #E8E0D6;transition:color 0.2s}
        .contact-row:hover{color:#1C1917}
        .skill-tab{font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:10px 22px;border-radius:6px;cursor:pointer;transition:all 0.25s ease;border:none}
        .form-field{font-family:'Syne',sans-serif;width:100%;padding:12px 16px;background:#FAF7F2;border:1.5px solid #DDD6CC;border-radius:8px;color:#1C1917;font-size:14px;transition:border-color 0.2s;outline:none}
        .form-field:focus{border-color:#1B4D3E}
        .form-field::placeholder{color:#C8BEB4}
        textarea.form-field{resize:vertical;min-height:90px}
        @keyframes fadeDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:none}}
      `}</style>

      {/* MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position:"fixed",inset:0,background:"rgba(28,25,23,0.6)",backdropFilter:"blur(8px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#FAF7F2",borderRadius:"16px",padding:"2.5rem",maxWidth:"460px",width:"90%",position:"relative",animation:"modalIn 0.3s ease",border:"1px solid #E8E0D6" }}>
            <button onClick={() => setShowModal(false)} style={{ position:"absolute",top:"16px",right:"16px",background:"#EDE8DF",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"14px",color:"#5C5347",display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#1B4D3E",marginBottom:"8px" }}>Get in touch</p>
            <h3 className="serif" style={{ fontSize:"28px",fontWeight:400,marginBottom:"24px",lineHeight:1.2 }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              {[["name","text","Your Name","Jane Smith"],["email","email","Email Address","jane@example.com"]].map(([name,type,label,ph]) => (
                <div key={name} style={{ marginBottom:"16px" }}>
                  <label style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#9C8F82",display:"block",marginBottom:"6px" }}>{label}</label>
                  <input type={type} name={name} value={formData[name]} onChange={e=>setFormData(p=>({...p,[e.target.name]:e.target.value}))} placeholder={ph} className="form-field" required />
                </div>
              ))}
              <div style={{ marginBottom:"20px" }}>
                <label style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#9C8F82",display:"block",marginBottom:"6px" }}>Message</label>
                <textarea name="message" value={formData.message} onChange={e=>setFormData(p=>({...p,message:e.target.value}))} placeholder="Your message here…" className="form-field" required />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-main" style={{ width:"100%",padding:"14px",opacity:isSubmitting?0.6:1 }}>
                {isSubmitting ? "Sending…" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"16px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(250,247,242,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid #EDE8DF",opacity:navVisible?1:0,animation:navVisible?"fadeDown 0.5s ease forwards":"none" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
          <div style={{ width:"28px",height:"28px",background:"#1B4D3E",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontFamily:"'Fraunces',serif",fontSize:"13px",fontWeight:700,color:"#A8D5BA",fontStyle:"italic" }}>W</span>
          </div>
          <span style={{ fontFamily:"'Syne',sans-serif",fontSize:"14px",fontWeight:700,letterSpacing:"-0.01em" }}>Wafa Fathima</span>
        </div>
        <div style={{ display:"flex",gap:"32px",alignItems:"center" }}>
          {["About","Skills","Work","Contact"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <button onClick={()=>setShowModal(true)} className="btn-main" style={{ padding:"9px 20px",fontSize:"10px" }}>Hire Me</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight:"100vh",padding:"120px 48px 80px",position:"relative",overflow:"hidden",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px",alignItems:"center",background:"#FAF7F2" }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute",top:"-80px",right:"-80px",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,#A8D5BA22,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:"0",left:"20%",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,#F2C4A022,transparent 70%)",pointerEvents:"none" }} />

        {/* Left: Name + intro */}
        <div style={{ position:"relative",zIndex:2,animation:"fadeUp 0.8s ease 0.1s both" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",background:"#EDE8DF",borderRadius:"100px",padding:"6px 16px",marginBottom:"2rem" }}>
            <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#1B4D3E",animation:"floatBadge 3s ease infinite" }} />
            <span style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#5C5347" }}>Available for Hire</span>
          </div>
          <h1 className="serif" style={{ fontSize:"clamp(3.5rem,6vw,6rem)",fontWeight:300,lineHeight:0.95,letterSpacing:"-0.02em",marginBottom:"1.5rem" }}>
            Wafa<br />
            <em style={{ fontWeight:600 }}>Fathima</em>
          </h1>
          <p style={{ fontSize:"14px",fontWeight:400,lineHeight:1.8,color:"#5C5347",maxWidth:"380px",marginBottom:"2rem" }}>
            A <strong style={{ color:"#1B4D3E",fontWeight:600 }}>MERN Stack Developer</strong> based in Kerala, India — building responsive, scalable web applications with clean backends and pixel-perfect frontends.
          </p>
          <div style={{ display:"flex",gap:"12px",flexWrap:"wrap" }}>
            <a href="#work" className="btn-main">View Projects →</a>
          </div>
        </div>

        {/* Right: Info card */}
        <div style={{ animation:"fadeUp 0.8s ease 0.3s both" }}>
          <div style={{ background:"#fff",border:"1px solid #E8E0D6",borderRadius:"20px",padding:"2.5rem",position:"relative" }}>
            {/* Floating tag */}
            <div style={{ position:"absolute",top:"-16px",right:"24px",background:"#1B4D3E",color:"#A8D5BA",borderRadius:"8px",padding:"8px 16px",fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>
              Full Stack Dev
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"24px" }}>
              {[
                { label:"Location", value:"Kerala, India", icon:"📍" },
                { label:"Experience", value:"1+ Year", icon:"⚡" },
                { label:"Projects", value:"3 Live Apps", icon:"🚀" },
                { label:"Stack", value:"MERN", icon:"💻" },
              ].map(item=>(
                <div key={item.label} style={{ background:"#FAF7F2",borderRadius:"10px",padding:"14px 16px" }}>
                  <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"9px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#9C8F82",marginBottom:"4px" }}>{item.label}</p>
                  <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"14px",fontWeight:700,color:"#1C1917" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop:"1px solid #EDE8DF",paddingTop:"20px" }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#9C8F82",marginBottom:"14px" }}>Contact</p>
              <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
                {[
                  { icon:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, text:"wafathima15@gmail.com", href:"mailto:wafathima15@gmail.com" },
                  { icon:<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, text:"+91 97474 93273", href:"tel:+919747493273" },
                  { icon:<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>, text:"linkedin.com/in/wafa-fathima-1538wf", href:"https://linkedin.com/in/wafa-fathima-1538wf" },
                ].map((c,i)=>(
                  <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-row">
                    <span style={{ color:"#9C8F82" }}>{c.icon}</span>
                    <span style={{ fontSize:"12px" }}>{c.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION (horizontal timeline) ── */}
      <section id="education" style={{ padding:"100px 48px",background:"#1C1917",color:"#FAF7F2",overflow:"hidden",position:"relative" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(to right,#1B4D3E,#6B3A2A,#2C3E6B)" }} />
        <Reveal>
          <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"#5C5347",marginBottom:"8px" }}>Background</p>
          <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:300,marginBottom:"3rem",color:"#FAF7F2" }}>
            Education &amp; <em>Training</em>
          </h2>
        </Reveal>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",position:"relative" }}>
          {education.map((e,i)=>(
            <Reveal key={i} delay={i*120}>
              <div style={{ padding:"2rem",background:i===0?"#1B4D3E":i===1?"#6B3A2A":"#2C3E6B",position:"relative",borderRadius: i===0?"12px 0 0 12px":i===2?"0 12px 12px 0":"0" }}>
                <div style={{ width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1rem",fontFamily:"'Fraunces',serif",fontSize:"14px",fontWeight:600,color:"rgba(255,255,255,0.6)",fontStyle:"italic" }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:"12px" }}>{e.year}</p>
                <p className="serif" style={{ fontSize:"20px",fontWeight:400,lineHeight:1.3,marginBottom:"8px",color:"#FAF7F2" }}>{e.degree}</p>
                <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.5)" }}>{e.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SKILLS (tabbed) ── */}
      <section id="skills" style={{ padding:"100px 48px",background:"#FAF7F2" }}>
        <Reveal>
          <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"#9C8F82",marginBottom:"8px" }}>Capabilities</p>
          <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:300,marginBottom:"2rem" }}>Technical <em>Skills</em></h2>
        </Reveal>

        {/* Tab selector */}
        <div style={{ display:"flex",gap:"8px",marginBottom:"2rem",background:"#EDE8DF",padding:"6px",borderRadius:"10px",width:"fit-content" }}>
          {Object.entries(skillLabels).map(([k,v])=>(
            <button key={k} className="skill-tab" onClick={()=>setActiveSkill(k)}
              style={{ background:activeSkill===k?skillColors[k]:"transparent",color:activeSkill===k?"#FAF7F2":"#5C5347",boxShadow:activeSkill===k?"0 2px 8px rgba(0,0,0,0.15)":"none" }}>
              {v}
            </button>
          ))}
        </div>

        <div style={{ background:"#fff",border:"1px solid #E8E0D6",borderRadius:"16px",padding:"2.5rem",minHeight:"180px" }}>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"8px" }}>
            {skillGroups[activeSkill].map((s,i)=>(
              <span key={s} className="chip" style={{ animationDelay:`${i*30}ms` }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Languages + Hobbies side by side */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginTop:"24px" }}>
          <div style={{ background:"#fff",border:"1px solid #E8E0D6",borderRadius:"16px",padding:"2rem" }}>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#9C8F82",marginBottom:"1.5rem" }}>Languages</p>
            {languages.map((l,i)=>(
              <div key={i} style={{ marginBottom:"20px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"8px" }}>
                  <span className="serif" style={{ fontSize:"18px",fontWeight:400 }}>{l.name}</span>
                  <span style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",color:"#9C8F82",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:"4px" }}>{l.level}</span>
                </div>
                <div style={{ height:"4px",background:"#EDE8DF",borderRadius:"2px",overflow:"hidden" }}>
                  <div style={{ height:"100%",width:`${l.pct}%`,background:"#1B4D3E",borderRadius:"2px",transition:"width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff",border:"1px solid #E8E0D6",borderRadius:"16px",padding:"2rem" }}>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#9C8F82",marginBottom:"1.5rem" }}>Interests</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"8px" }}>
              {hobbies.map((h,i)=>(
                <span key={i} className="hobby-pill">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" style={{ padding:"100px 48px",background:"#1C1917" }}>
        <Reveal>
          <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"#5C5347",marginBottom:"8px" }}>Selected Work</p>
          <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:300,marginBottom:"3rem",color:"#FAF7F2" }}>
            Featured <em>Projects</em>
          </h2>
        </Reveal>
        <div style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
          {projects.map((proj,i)=>(
            <Reveal key={i} delay={i*100}>
              <div
                onClick={e=>{ if(!e.target.closest("a")) setOpenProject(openProject===i?null:i); }}
                style={{ background:openProject===i?proj.color:"#252220",border:`1px solid ${openProject===i?proj.color:"#333"}`,borderRadius:"16px",padding:"2.5rem",cursor:"pointer",transition:"all 0.35s ease",overflow:"hidden" }}>
                <div style={{ display:"grid",gridTemplateColumns:"auto 1fr auto",gap:"32px",alignItems:"start" }}>
                  {/* Number */}
                  <div style={{ width:"48px",height:"48px",borderRadius:"12px",background:openProject===i?"rgba(255,255,255,0.15)":"#333",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s ease" }}>
                    <span className="serif" style={{ fontSize:"16px",fontWeight:400,fontStyle:"italic",color:openProject===i?proj.accent:"#9C8F82" }}>{proj.num}</span>
                  </div>
                  {/* Content */}
                  <div>
                    <div style={{ display:"flex",alignItems:"baseline",gap:"16px",marginBottom:"8px",flexWrap:"wrap" }}>
                      <a href={proj.liveLink} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily:"'Fraunces',Georgia,serif",fontSize:"clamp(1.5rem,2.8vw,2.2rem)",fontWeight:400,color:openProject===i?"#FAF7F2":"#FAF7F2",transition:"opacity 0.2s" }}
                        onMouseEnter={e=>e.target.style.opacity="0.7"}
                        onMouseLeave={e=>e.target.style.opacity="1"}
                        onClick={e=>e.stopPropagation()}>
                        {proj.title} ↗
                      </a>
                      <span style={{ fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:600,color:openProject===i?proj.accent:"#5C5347",textTransform:"uppercase",letterSpacing:"0.08em" }}>{proj.category}</span>
                    </div>
                    <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"14px",lineHeight:1.75,color:openProject===i?"rgba(250,247,242,0.75)":"#9C8F82",maxWidth:"600px" }}>{proj.desc}</p>

                    {/* Expanded details */}
                    <div style={{ overflow:"hidden",maxHeight:openProject===i?"600px":"0",opacity:openProject===i?1:0,transition:"max-height 0.5s cubic-bezier(0.4,0,0.2,1),opacity 0.35s ease" }}>
                      <div style={{ paddingTop:"24px" }}>
                        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 24px",marginBottom:"20px" }}>
                          {proj.details.map((d,di)=>(
                            <p key={di} style={{ fontFamily:"'Syne',sans-serif",fontSize:"13px",color:"rgba(250,247,242,0.7)",display:"flex",gap:"10px",lineHeight:1.5 }}>
                              <span style={{ color:proj.accent,flexShrink:0 }}>→</span>{d}
                            </p>
                          ))}
                        </div>
                        <div style={{ display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center" }}>
                          {proj.tags.map(t=>(
                            <span key={t} style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 12px",borderRadius:"100px",background:"rgba(255,255,255,0.1)",color:proj.accent }}>{t}</span>
                          ))}
                          <a href={proj.repoLink} target="_blank" rel="noopener noreferrer"
                            style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"8px 18px",border:`1.5px solid ${proj.accent}`,color:proj.accent,borderRadius:"6px",marginLeft:"auto",transition:"all 0.2s" }}
                            onMouseEnter={e=>{e.target.style.background=proj.accent;e.target.style.color=proj.color}}
                            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=proj.accent}}
                            onClick={e=>e.stopPropagation()}>
                            Repository ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Toggle */}
                  <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"10px",paddingTop:"4px" }}>
                    <span style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",color:"#5C5347",letterSpacing:"0.1em" }}>{proj.year}</span>
                    <div style={{ width:"32px",height:"32px",border:`1.5px solid ${openProject===i?proj.accent:"#444"}`,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",color:openProject===i?proj.accent:"#5C5347",transition:"all 0.3s ease",transform:openProject===i?"rotate(45deg)":"none" }}>+</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"100px 48px",background:"#FAF7F2",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,right:"-100px",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,#F2C4A015,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"start" }}>
          <Reveal>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"#9C8F82",marginBottom:"8px" }}>Let's Connect</p>
            <h2 className="serif" style={{ fontSize:"clamp(2.5rem,5vw,4.5rem)",fontWeight:300,lineHeight:0.95,marginBottom:"2rem",letterSpacing:"-0.02em" }}>
              Let's Build<br /><em style={{ fontWeight:600 }}>Something</em><br />Great.
            </h2>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"14px",lineHeight:1.8,color:"#5C5347",maxWidth:"340px",marginBottom:"2.5rem" }}>
              Open to freelance, full-time roles, and collaborations. Have an idea? Let's talk.
            </p>
            <div style={{ display:"flex",gap:"12px" }}>
              <button onClick={()=>setShowModal(true)} className="btn-main">Send Message →</button>
              <a href="https://github.com/wafathima" target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub ↗</a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div style={{ background:"#1C1917",borderRadius:"20px",padding:"2.5rem",color:"#FAF7F2" }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#5C5347",marginBottom:"1.5rem" }}>Direct Links</p>
              {[
                { label:"Email", val:"wafathima15@gmail.com", href:"mailto:wafathima15@gmail.com", color:"#1B4D3E", accent:"#A8D5BA" },
                { label:"Phone", val:"+91 97474 93273", href:"tel:+919747493273", color:"#6B3A2A", accent:"#F2C4A0" },
                { label:"LinkedIn", val:"linkedin.com/in/wafa-fathima-1538wf", href:"https://linkedin.com/in/wafa-fathima-1538wf", color:"#2C3E6B", accent:"#B8C8F0" },
                { label:"GitHub", val:"github.com/wafathima", href:"https://github.com/wafathima", color:"#3D2C5A", accent:"#C8B0E8" },
              ].map((c,i)=>(
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex",alignItems:"center",gap:"14px",padding:"14px 0",borderBottom:"1px solid #333",transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.paddingLeft="8px";e.currentTarget.querySelector(".cl").style.background=c.color}}
                  onMouseLeave={e=>{e.currentTarget.style.paddingLeft="0";e.currentTarget.querySelector(".cl").style.background="#252220"}}>
                  <div className="cl" style={{ width:"8px",height:"8px",borderRadius:"50%",background:"#252220",border:`1.5px solid ${c.accent}`,transition:"background 0.2s",flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"9px",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"#5C5347",marginBottom:"2px" }}>{c.label}</p>
                    <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"13px",color:"#9C8F82" }}>{c.val}</p>
                  </div>
                  <span style={{ color:"#333",fontSize:"16px" }}>↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#1C1917",borderTop:"1px solid #252220",padding:"28px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px" }}>
        <p className="serif" style={{ fontSize:"16px",fontWeight:300,color:"#5C5347" }}>
          <em>Wafa Fathima</em>
        </p>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",color:"#333",letterSpacing:"0.1em" }}>© 2026 — All rights reserved</p>
        <div style={{ display:"flex",gap:"20px" }}>
          {[["GitHub","https://github.com/wafathima"],["LinkedIn","https://linkedin.com/in/wafa-fathima-1538wf"],["Email","mailto:wafathima15@gmail.com"]].map(([l,h])=>(
            <a key={l} href={h} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'Syne',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.1em",color:"#444",textTransform:"uppercase",transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color="#A8D5BA"}
              onMouseLeave={e=>e.target.style.color="#444"}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}