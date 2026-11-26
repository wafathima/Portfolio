// //app.jsx
// import Navigation from './components/Navigation';
// import Hero from './components/Hero';
// import Projects from './components/Projects';
// import About from './components/About';
// import Skills from './components/Skills';
// import Experience from './components/Experience';
// import Education from './components/Education';
// import MiniProjects from './components/MiniProjects';
// import Contact from './components/Contact';
// import Footer from './components/Footer';

// export default function App() {
//   return (
//     <>
//       <Navigation />
//       <main>
//         <Hero />
//         <Projects />
//         <About />
//         <Skills />
//         <Experience />
//         <Education />
//         <MiniProjects />
//         <Contact />
//       </main>
//       <Footer />
//     </>
//   );
// }

import { lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import MiniProjects from './components/MiniProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const GalaxyBackground = lazy(() => import('./components/GalaxyBackground'));

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <Suspense fallback={null}>
        <GalaxyBackground />
      </Suspense>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Education />
        <MiniProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}