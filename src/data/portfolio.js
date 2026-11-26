
import havenix from '../assets/images/havenix.png';
import lio from '../assets/images/lio.png';
import playora from '../assets/images/playora.png';
import notepad from '../assets/images/notepad.png';
import todo from '../assets/images/todo.png';
import expense from '../assets/images/expense.png';
import Enchat from '../assets/images/Enchat.png';

export const RESUME =
  'https://drive.google.com/file/d/1t746_sjedasTCnLd2VWKqQYE-SHPjd8P/view?usp=sharing';

export const CONTACT = {
  email: 'wafathima15@gmail.com',
  github: 'https://github.com/wafathima',
  linkedin: 'https://linkedin.com/in/wafa-fathima-1538wf',
  location: 'Kerala, India',
  timezone: 'Asia/Kolkata',
};

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const skills = {
  frontend: [
    'TypeScript', 'Next.js', 'React.js', 'Redux', 'JavaScript', 'HTML',
    'CSS', 'Tailwind CSS', 'Responsive Design', 'UI/UX Principles',
    'Axios', 'React Router','Three.js',
  ],
  backend: [
    'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth',
    'Mongoose', 'Data Design', 'Server-side Logic', 'Performance Optimization',
    'SQL', 'PostgreSQL',
  ],
  tools: [
    'Git & GitHub', 'Postman', 'Vercel', 'Figma', 'VS Code',
    'Docker', 'AWS', 'Cloud Computing',
  ],
};

export const projects = [
  {
    title: 'Havenix',
    category: 'Real Estate Platform',
    year: '2026',
    image: havenix,
    url: 'havenix.app',
    desc: 'A full-stack property platform for buying and selling real estate. Built with advanced search, full CRUD functionality, and a clean performant user interface.',
    tags: ['MERN', 'Real Estate', 'CRUD', 'Tailwind', 'Axios', 'Docker'],
    liveLink: 'https://havenix-copy-frontend-ogc3.onrender.com/',
    repoLink: 'https://github.com/wafathima/Havenix',
  },
  {
    title: 'Playora',
    category: 'E-Commerce Platform',
    year: '2026',
    image: playora,
    url: 'playoratoy.vercel.app',
    desc: 'A full-stack e-commerce application built on the MERN stack with JWT auth, Redux state management, product catalogue, cart system, and fully responsive UI.',
    tags: ['MERN', 'E-Commerce', 'JWT', 'Redux', 'Tailwind', 'Axios'],
    liveLink: 'https://playoratoy.vercel.app/',
    repoLink: 'https://github.com/wafathima/playoratoystore',
  },
  {
    title: 'Lio Store',
    category: 'Frontend E-Commerce',
    year: '2025',
    image: lio,
    url: 'liostorecom.vercel.app',
    desc: 'A responsive frontend for a shoe e-commerce brand with product filtering, cart functionality, and polished UI/UX focusing on mobile responsiveness.',
    tags: ['React', 'Frontend', 'UI/UX', 'Tailwind'],
    liveLink: 'https://liostorecom.vercel.app/',
    repoLink: 'https://github.com/wafathima/liostorecom',
  },
];

export const miniProjects = [
  {
    title: 'NotePad App',
    image: notepad,
    description:
      'A modern note-taking application built with Next.js and TypeScript that allows users to create, edit, organize, and delete notes with a clean and responsive interface.',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    repoLink: 'https://github.com/wafathima/Notepad',
    liveLink: 'https://notepadminiapp.vercel.app/',
  },
  {
    title: 'Todo App',
    image: todo,
    description:
      'A responsive task management application developed using React.js and TypeScript. The app helps users efficiently manage daily tasks by adding, updating, completing, and deleting todos.',
    stack: ['React.js', 'TypeScript', 'Tailwind CSS'],
    repoLink: 'https://github.com/wafathima/TypescriptProject',
    liveLink: 'https://todo-frontend-w23l.onrender.com/',
  },
  {
    title: 'Expense Tracker',
    image: expense,
    description:
      'A full-stack expense management application that allows users to securely register, log in, and track their income and expenses. Built with Next.js, TypeScript, Express.js, PostgreSQL, Docker, and AWS EC2, with Nginx and HTTPS configured for secure production deployment.',
    stack: ['Next.js', 'TypeScript', 'Docker', 'PostgreSQL', 'AWS'],
    repoLink: 'https://github.com/wafathima/Expense_track',
    liveLink: 'https://wafa-expense-tracker.duckdns.org/',
  },
  {
    title: 'EnChat',
    image: Enchat,
    description:
      'EnChat is a real-time chat application built using Next.js, TypeScript, Node.js, Express.js, Socket.IO, and PostgreSQL. It enables users to communicate instantly with secure authentication, real-time messaging, and conversation management.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase'],
    repoLink: 'https://github.com/wafathima/chatapp',
    liveLink: 'https://enchatfrontend.vercel.app/',
  },
];

export const experience = [
  
  {
    role: 'Placement Officer',
    company: 'Zaitoon International Campus',
    type: 'Professional Experience',
    duration: 'Currently Working',
    period: '2026',
    description:
      'Supporting students in their career journey by coordinating placement activities and connecting with potential employers.',
    responsibilities: [
      'Identified and shared relevant job opportunities with students.',
      'Connected with HR professionals and recruiters to explore placement opportunities.',
      'Coordinated communication between companies, students, and the placement team.',
      'Tracked student applications and monitored placement progress.',
      'Followed up with recruiters regarding job opportunities and interview updates.',
    ],
    technologies: ['HR Outreach', 'Recruitment', 'Communication', 'Placement Coordination'],
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Zaitoon International Campus',
    type: 'Internship',
    duration: '6 Months',
    period: '2026',
    description:
      'Completed a 6-month internship focused on full-stack web development using the MERN stack.',
    responsibilities: [
      'Developed responsive web interfaces using React.js, JavaScript, and Tailwind CSS.',
      'Built backend functionality using Node.js and Express.js.',
      'Worked with MongoDB for database design and data management.',
      'Integrated REST APIs and implemented authentication functionality.',
      'Built and improved full-stack web development projects.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs'],
  },
];

export const education = [
  { year: '2026', degree: 'Bachelors of Commerce', school: 'Calicut University' },
  {
    year: '2025',
    degree: 'Diploma in Full Stack Web Development',
    school: 'Zaitoon International Girls Campus',
  },
  {
    year: '2023 — 2025',
    degree: 'Higher Secondary Studies',
    school: 'Nafeesathul Misriya Institute of Innovation',
  },
];

export const languages = [
  { name: 'English', level: 'Intermediate' },
  { name: 'Malayalam', level: 'Fluent' },
];

export const hobbies = [
  'Learning New Technologies',
  'Coding Practice & Problem Solving',
  'UI/UX Exploration',
  'Building Side Projects',
  'Tech Content & Research',
];

export const stats = [
  { value: '7+', label: 'Projects' },
  { value: '6', label: 'Months Internship' },
  { value: '15+', label: 'Technologies' },
];