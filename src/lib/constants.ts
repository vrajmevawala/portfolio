export const SITE_CONFIG = {
  name: "Vraj Mevawala",
  role: "Full Stack Developer",
  email: "mevawalavraj@gmail.com",
  phone: "+91 94296 81488",
  location: "Gujarat, India",
  linkedin: "https://www.linkedin.com/in/vraj-mevawala-65854a284/",
  github: "https://github.com/vrajmevawala",
  avatar: "https://avatars.githubusercontent.com/u/147795720?v=4",
  resumeUrl: "/resume.pdf",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

export const SKILLS_DATA = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Material UI", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "Socket.io", category: "backend" },
  { name: "Apache2", category: "devops" },
  { name: "PM2", category: "devops" },
  { name: "Gunicorn", category: "devops" },
  { name: "Git", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "C", category: "languages" },
  { name: "C++", category: "languages" },
  { name: "Java", category: "languages" },
  { name: "Python", category: "languages" },
] as const;

export const SKILL_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "languages", label: "Languages" },
] as const;

export const PROJECTS = [
  {
    title: "Chatty",
    description:
      "Developed a real-time messaging platform with live user-presence tracking using Socket.io event-driven architecture. Secured routes with JWT + Bcrypt authentication; integrated Cloudinary API for profile and in-chat image uploads. Delivered a fully responsive UI with 30+ theme presets using Tailwind CSS and DaisyUI.",
    tech: ["MERN", "Socket.io", "Tailwind CSS", "Zustand", "JWT", "Cloudinary", "DaisyUI"],
    impact: "Live deployed real-time messaging with WebSocket integration & custom themes",
    github: "https://github.com/vrajmevawala/ChatApp",
    live: "https://chatty-7u8k.onrender.com/",
  },
  {
    title: "CodeSage",
    description:
      "Implemented automated GitHub PR reviews with scoring across performance and code quality. Developed a real-time dashboard with complexity metrics and interactive diff previews. Engineered a hallucination-resistant AI system using AST data with LLM prompts. Designed scalable architecture with Fastify APIs, Redis queues, and worker pipeline.",
    tech: ["Next.js", "Fastify", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS", "Tree-sitter"],
    impact: "Automated GitHub PR reviews with AI scoring & AST-based hallucination resistance",
    github: "https://github.com/vrajmevawala/CodeSage",
    live: "https://codesage-web.onrender.com/",
  },
  {
    title: "KhedutMitra",
    description:
      "A sophisticated full-stack rural intelligence platform for farmer-centric risk monitoring (Farmer Vulnerability Index), weather-aware advisory delivery, and automated communication via WhatsApp/Telegram AI bots. Features heatmaps and real-time predictive analytics.",
    tech: ["Node.js", "Express", "React", "PostgreSQL", "Leaflet","N8N workflow", "Twilio", "Groq", "Llama-3"],
    impact: "Computed vulnerability scoring & automated advisory delivery via WhatsApp/Telegram",
    github: "https://github.com/vrajmevawala/GenAI-Rural_Intelligence_Platform",
    live: "",
  },
  {
    title: "EduVerse",
    description:
      "Engineered a competitive exam platform supporting concurrent users with timed contests, live leaderboards, and a real-time AI assistant for guidance via WebSocket. Built a secure anti-malpractice environment with tab-switch detection and focus-loss logging.",
    tech: ["PERN (Prisma)", "Socket.io", "Tailwind CSS", "Zustand", "JWT"],
    impact: "Real-time contests with concurrent users & AI-powered exam guidance",
    github: "https://github.com/vrajmevawala/eduVerse",
    live: "",
  },
  {
    title: "MindMosaic",
    description:
      "An AI-powered mental wellness companion built at HackSpire 2025. Features conversational emotional check-ins, NLP-based emotion detection, personalized wellness recommendations, and mood history tracking.",
    tech: ["Next.js", "TypeScript", "Flask", "Hugging Face", "Gemini API", "Tailwind CSS"],
    impact: "AI emotion detection with Hugging Face models & Gemini-powered smart follow-ups",
    github: "https://github.com/vrajmevawala/MindMosaic",
    live: "",
  },
  {
    title: "FleetFlow",
    description:
      "A production-grade fleet management system with vehicle tracking, driver management, trip lifecycle, maintenance scheduling, expense tracking, analytics dashboard, and compliance monitoring — all with role-based access control.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Tailwind CSS", "JWT"],
    impact: "Full RBAC with 4 roles, analytics dashboard with ROI metrics, and automated maintenance workflows",
    github: "https://github.com/vrajmevawala/odoo-x-vidyapith",
    live: "",
  },
  {
    title: "Earn And Learn",
    description:
      "A hybrid educational platform combining structured courses with freelancing opportunities. Students can learn, earn, and build practical experience through real-world projects.",
    tech: ["React", "MongoDB", "Node.js", "Express.js"],
    impact: "Unified learning + freelancing experience with secure MongoDB authentication",
    github: "https://github.com/vrajmevawala/Earn-and-Learn",
    live: "",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    title: "GeeksForGeeks",
    description: "Actively solving DSA and competitive programming problems on GFG",
    icon: "code",
    link: "https://www.geeksforgeeks.org/profile/vrajmevawala?tab=activity",
  },
  {
    title: "LeetCode",
    description: "Tackling algorithmic challenges and sharpening problem-solving skills",
    icon: "terminal",
    link: "https://leetcode.com/u/UP8WAf6wYS/",
  },
  {
    title: "NPTEL — Theory of Computation",
    description: "Certified in Theory of Computation through NPTEL online program",
    icon: "award",
  },
  {
    title: "NPTEL — DSA Using Java",
    description: "Certified in Data Structures and Algorithms using Java through NPTEL",
    icon: "award",
    link: "https://archive.nptel.ac.in/noc/B2C/candidate_login/candidate_scores.php?courseid=noc24-cs96",
  },
  {
    title: "4th Rank — HackNUthon 6.0",
    description: "Secured 4th position at HackNUthon 6.0 hackathon",
    icon: "trophy",
  },
  {
    title: "HackSpire 2025",
    description: "Participated in HackSpire 2025 hackathon",
    icon: "rocket",
  },
] as const;
