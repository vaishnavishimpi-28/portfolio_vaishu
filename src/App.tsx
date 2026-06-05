import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Phone, MapPin, Code2, Database,
  Cpu, Globe, Terminal, Award, BookOpen, ChevronDown,
  ExternalLink, Layers, Brain, Zap, Menu, X, ArrowUp
} from 'lucide-react';

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

const SKILLS = {
  'Programming Languages': { items: ['Python', 'JavaScript'], icon: <Terminal size={18} /> },
  'Frontend': { items: ['React.js', 'HTML', 'CSS', 'Bootstrap'], icon: <Globe size={18} /> },
  'Backend': { items: ['Django', 'Django REST Framework', 'REST APIs'], icon: <Layers size={18} /> },
  'AI / ML': { items: ['Scikit-learn', 'TensorFlow', 'Hugging Face', 'NLP', 'LangChain', 'RAG Systems', 'Agentic AI', 'Prompt Engineering', 'OCR & AI Automation'], icon: <Brain size={18} /> },
  'Databases': { items: ['MySQL'], icon: <Database size={18} /> },
  'Tools & Platforms': { items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Jupyter Notebook', 'Streamlit', 'Emailjs'], icon: <Code2 size={18} /> },
  'Cloud & DevOps': { items: ['Basic DevOps', 'Cloud Deployment'], icon: <Zap size={18} /> },
};

const PROJECTS = [
  {
    title: 'Electrical Data Extraction Tool',
    year: '2025',
    stack: ['Python', 'Gemini API', 'LangChain', 'OCR', 'Streamlit', 'Excel Automation'],
    description: 'AI-driven pipeline using OCR, Gemini models, and LangChain to convert unstructured electrical diagrams into structured Excel sheets.',
    highlights: [
      'Automated extraction of 100+ electrical symbols, labels, and dimensions per diagram',
      'Reduced manual data entry time by ~70%',
      'Implemented structured Excel export improving reporting accuracy',
      'Developed intelligent parsing logic for non-standard diagram formats',
    ],
    color: 'from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-500/20',
    badge: 'AI / ML',
  },
  {
    title: 'Job Portal Web Application',
    year: '2024',
    stack: ['Django', 'React.js', 'HTML', 'CSS', 'Bootstrap', 'JavaScript', 'MySQL'],
    description: 'Full-featured job portal platform with Employee, Employer, and Admin modules serving end-to-end hiring workflows.',
    highlights: [
      'Employee module: profile creation, job search, and application tracking',
      'Employer module: job posting, resume management, candidate tracking',
      'Admin dashboard with role-based access and platform-wide monitoring',
      'Integrated Django REST APIs with MySQL; achieved responsive cross-device compatibility',
    ],
    color: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    badge: 'Full Stack',
  },
];

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function Section({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <section id={id} className={className}>
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <span className="text-xs font-semibold tracking-[0.3em] text-cyan-400 uppercase">{label}</span>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-sky-400 rounded" />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [typedText, setTypedText] = useState('');

  const roles = ['Python Full Stack Developer', 'AI/ML Engineer', 'React.js Developer', 'LangChain Builder'];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    });
    const sendEmail = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await emailjs.send(
      "service_yeqks3i",
      "template_34qk9pi",
       {
    name: formData.name,
    message: formData.message,
    time: new Date().toLocaleString(),
  },
      "0V8cBgR-lo1ggRW6l"
    );

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setShowContactForm(false);
  } catch (error) {
  console.error("EmailJS Error:", error);
  alert(JSON.stringify(error));
}
};
  // Typewriter
  useEffect(() => {
    const tick = () => {
      const role = roles[roleRef.current];
      if (!deletingRef.current) {
        setTypedText(role.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === role.length) {
          deletingRef.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(role.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
      setTimeout(tick, deletingRef.current ? 55 : 80);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  // Scroll events
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);

      const sections = NAV_LINKS.map(l => l.toLowerCase());
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${scrolled ? 'bg-slate-950/90 border-b border-slate-800/60 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">
            <span className="text-gradient">VS</span>
            {/* <span className="text-slate-400 text-sm ml-1 font-normal hidden sm:inline">/ Portfolio</span> */}
          </span>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeSection === link.toLowerCase() ? 'bg-cyan-500/15 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              >
                {link}
              </button>
            ))}
           <a
  href="/resu.pdf"
  download="Vaishnavi_Shimpi_Resume.pdf"
  className="ml-3 px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
>
  Download Resume
</a>
          </div>
          <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-slate-800 px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="text-left py-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" className="hero-bg min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-up">
            {/* <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-xs text-cyan-400 font-medium mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Open to Opportunities
            </div> */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hi, I'm<br />
              <span className="text-gradient">Vaishnavi Shimpi</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-300 font-medium mb-6 h-8">
              <span className="font-mono text-cyan-300">{typedText}</span>
              <span className="cursor text-cyan-400 ml-0.5">|</span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-lg mb-8">
              Results-driven developer building scalable web applications and AI-powered automation systems using Django, React.js, Python, and Machine Learning frameworks. Experienced in RAG systems, LangChain, NLP, and OCR-based data extraction.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 text-sm"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-2.5 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-200 text-sm"
              >
                Contact Me
              </button>
            </div>
            <div className="flex items-center gap-5">
              <a href="https://www.linkedin.com/in/vaishnavi-shimpi-9a5307270" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/vaishnavishimpi-28" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              {/* <button
  onClick={() => setShowContactForm(true)}
  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-200"
>
  Send Email
</button> */}
             <div className="relative group">
  <a
    href="https://wa.me/919322292520"
    target="_blank"
    rel="noreferrer"
    className="text-slate-500 hover:text-cyan-400 transition-colors"
  >
    <Phone size={20} />
  </a>

  <span className="absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
    +91 9322292520
  </span>
</div>
            </div>
          </div>

          {/* Avatar card */}
         <div className="hidden md:flex justify-center items-center fade-in-up">
  <div className="relative">
    <div className="w-72 h-72 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-slate-900 border border-cyan-500/20 overflow-hidden glow cursor-pointer group">
      
      {/* Full-coverage image with hover zoom */}
      <img 
        src="/assets/photo.jpeg" 
        alt="Vaishnavi Shimpi"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      
    </div>

    {/* Floating badges */}
    <div className="absolute -top-6 -right-4 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-400 font-medium">
      1+ Year Exp
    </div>
    <div className="absolute -bottom-7 -left-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-yellow-400 font-medium">
      Python & AI/ML developer 
    </div>
  </div>
</div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* SKILLS */}
      <Section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label="What I Know" title="Technical Skills" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(SKILLS).map(([category, { items, icon }]) => (
              <div key={category} className="card-glass rounded-2xl p-6 hover:border-cyan-500/30 hover:glow transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/15 transition-colors">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-slate-200 text-sm">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill} className="text-xs bg-slate-800/80 text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-full hover:border-cyan-500/40 hover:text-cyan-300 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle label="Work History" title="Professional Experience" />
          <div className="relative pl-8 timeline-line">
            <div className="mb-2 absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20" />
            <div className="card-glass rounded-2xl p-7 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Full Stack AI/ML Developer</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-cyan-400 font-medium text-sm">MEPSTRA Engineering Solutions Pvt Ltd</span>
                    <span className="text-slate-600 text-xs">— Hyderabad</span>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-full whitespace-nowrap">
                  May 2025 – Present
                </span>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Developed and maintained scalable full-stack web applications using Django, Python, and React.js.',
                  'Built and integrated RESTful APIs with React-based frontend systems, reducing average API response time through optimized query handling.',
                  'Designed responsive, accessible UI components using HTML, CSS, JavaScript, and Bootstrap across multiple device breakpoints.',
                  'Developed an AI-powered data extraction application using Gemini models with Streamlit-based visualization.',
                  'Implemented machine learning–driven automation for intelligent data extraction, reducing manual effort by approximately 60–70%.',
                  'Applied prompt engineering and structured output handling to extract reliable data from unstructured diagram inputs using LangChain and OCR pipelines.',
                  'Used Git for version control; contributed to cloud deployment workflows on production environments.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/60 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label="What I've Built" title="Key Projects" />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.title} className={`card-glass rounded-2xl p-7 border ${project.border} bg-gradient-to-br ${project.color} hover:scale-[1.015] hover:shadow-2xl transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                      {project.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-3">{project.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{project.year}</p>
                  </div>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors mt-1 flex-shrink-0" />
                </div>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                <ul className="space-y-2 mb-5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(tech => (
                    <span key={tech} className="text-xs bg-slate-800/80 text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded-full font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle label="Academic Background" title="Education" />
          <div className="space-y-5">
            <div className="card-glass rounded-2xl p-6 border border-slate-800/60 hover:border-cyan-500/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-white">Bachelor of Engineering – Information Technology</h3>
                      <p className="text-cyan-400 text-sm mt-0.5">Dhole Patil College of Engineering, Savitribai Phule Pune University</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">2020 – 2024</span>
                  </div>
                  <div className="mt-3 flex gap-4">
                    {/* <div className="text-center bg-slate-800/60 rounded-xl px-4 py-2 border border-slate-700/40">
                      <p className="text-lg font-bold text-cyan-400">6.91</p>
                      <p className="text-xs text-slate-500">CGPA</p>
                    </div> */}
                    {/* <div className="text-center bg-slate-800/60 rounded-xl px-4 py-2 border border-slate-700/40">
                      <p className="text-lg font-bold text-cyan-400">60.65%</p>
                      <p className="text-xs text-slate-500">Percentage</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: 'HSC', board: 'Savitribai Phule Pune University', year: '2020' },
                { label: 'SSC', board: 'Nasik Board', year: '2018' },
              ].map(edu => (
                <div key={edu.label} className="card-glass rounded-2xl p-5 border border-slate-800/60 hover:border-cyan-500/20 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">{edu.label}</span>
                    <span className="text-xs text-slate-500">{edu.year}</span>
                  </div>
                  <p className="text-slate-300 font-medium text-sm mt-2">{edu.board}</p>
                  <p className="text-2xl font-bold text-white mt-2">{edu.score}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="card-glass rounded-2xl p-6 border border-slate-800/60 hover:border-cyan-500/20 transition-all">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-amber-400" />
                Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: 'Python Full Stack Developer Certification', year: '2024' },
                  { title: 'Data Science & Machine Learning Certification', year: 'May 2026' },
                ].map(cert => (
                  <div key={cert.title} className="flex items-start gap-3 bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
                    <Award size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-200 text-sm font-medium">{cert.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card-glass rounded-2xl p-6 border border-slate-800/60 hover:border-cyan-500/20 transition-all">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-cyan-400" />
                Achievements & Activities
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Lead Actor – Bharat Karandak One-Act Play Competition', year: '2024' },
                  { title: 'Kabaddi Team Member – Intercollege Tournament', year: '2023' },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3 bg-slate-800/40 rounded-xl p-4 border border-slate-700/40">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                    <p className="text-slate-300 text-sm flex-1">{item.title}</p>
                    <span className="text-xs text-slate-500 flex-shrink-0">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle label="Get In Touch" title="Contact Me" />
          <p className="text-slate-400 mb-10 text-base leading-relaxed max-w-xl mx-auto">
            I'm currently open to full-time opportunities and freelance projects. Whether you have a project in mind or just want to say hello, my inbox is always open.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: <Mail size={20} />, label: 'Email', value: 'vaishnavishimpi1@gmail.com', href: 'mailto:vaishnavishimpi1@gmail.com' },
              { icon: <Phone size={20} />, label: 'Phone', value: '+91 9322292520', href: 'https://wa.me/919322292520' },
              { icon: <MapPin size={20} />, label: 'Location', value: 'Pune, Maharashtra, India', href: null },
              { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'vaishnavi-shimpi-9a5307270', href: 'https://www.linkedin.com/in/vaishnavi-shimpi-9a5307270' },
            ].map(item => (
              <div key={item.label} className="card-glass rounded-2xl p-5 border border-slate-800/60 hover:border-cyan-500/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/15 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-slate-300 text-sm font-medium hover:text-cyan-400 transition-colors truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            
            <button
  onClick={() => setShowContactForm(!showContactForm)}
  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 text-sm"
>
  Send Email
</button>
            <a
              href="https://github.com/vaishnavishimpi-28"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white font-bold rounded-full transition-all duration-200 text-sm flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 py-8 px-6 text-center">
        <p className="text-slate-600 text-sm">
          Designed & Built by <span className="text-slate-400 font-medium">Vaishnavi Shimpi</span> — Python Full Stack Developer & AI/ML Engineer
        </p>
        <div className="mt-3 flex justify-center gap-4">
  {/* LinkedIn */}
  <div className="relative group">
    <a
      href="https://www.linkedin.com/in/vaishnavi-shimpi-9a5307270"
      target="_blank"
      rel="noreferrer"
      className="text-slate-600 hover:text-cyan-400 transition-colors"
    >
      <Linkedin size={16} />
    </a>

    <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
      LinkedIn
    </span>
  </div>

  {/* GitHub */}
  <div className="relative group">
    <a
      href="https://github.com/vaishnavishimpi-28"
      target="_blank"
      rel="noreferrer"
      className="text-slate-600 hover:text-cyan-400 transition-colors"
    >
      <Github size={16} />
    </a>

    <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
      vaishnavishimpi-28
    </span>
  </div>

  {/* Email */}
  <div className="relative group">
    <a
      href="mailto:vaishnavishimpi1@gmail.com"
      className="text-slate-600 hover:text-cyan-400 transition-colors"
    >
      <Mail size={16} />
    </a>

    <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
      vaishnavishimpi1@gmail.com
    </span>
  </div>
</div>
      </footer>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/25 transition-all hover:scale-110"
        >
          <ArrowUp size={18} />
        </button>
      )}
      {showContactForm && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-700">
      <h2 className="text-white text-xl font-bold mb-4">
        Contact Me
      </h2>

      <form onSubmit={sendEmail} className="space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <textarea
          rows={5}
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-cyan-500 text-slate-950 py-3 rounded-lg font-bold"
          >
            Send
          </button>

          <button
            type="button"
            onClick={() => setShowContactForm(false)}
            className="flex-1 bg-slate-700 text-white py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}
