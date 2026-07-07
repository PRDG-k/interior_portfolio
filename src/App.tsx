/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Menu, X, ChevronRight, ChevronLeft, Instagram, Mail, MapPin, ExternalLink, ArrowDown, ArrowLeft, User } from 'lucide-react';
// import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { SafeImage } from './components/SafeImage';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  details: string[];
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Minimalist Zen Studio",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    description: "A serene space designed for focus and tranquility, blending natural wood with soft lighting.",
    details: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486341351-79b52752ad4f?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Urban Loft Concept",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    description: "Industrial elements meet modern luxury in this open-plan office space.",
    details: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486341351-79b52752ad4f?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "The Nordic Retreat",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1616486341351-79b52752ad4f?q=80&w=2000&auto=format&fit=crop",
    description: "Warm textures and functional design inspired by Scandinavian aesthetics.",
    details: [
      "https://images.unsplash.com/photo-1616486341351-79b52752ad4f?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
    ]
  }
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616486341351-79b52752ad4f?q=80&w=2000&auto=format&fit=crop"
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-serif tracking-widest uppercase"
          >
            JO EUNAE
          </motion.div>
        </Link>

        <div className="hidden md:flex space-x-12 text-xs tracking-[0.2em] uppercase font-medium">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.1, color: '#a1a1a1' }}>
              {isHome ? (
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item}
                </a>
              ) : (
                <Link
                  to={`/#${item.toLowerCase()}`}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="flex flex-col items-center py-8 space-y-6 text-sm tracking-widest uppercase">
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                isHome ? (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                    {item}
                  </a>
                ) : (
                  <Link key={item} to={`/#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                    {item}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <SafeImage 
            src={HERO_IMAGES[current]} 
            alt="Portfolio Hero" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm tracking-[0.4em] uppercase mb-6 font-medium"
        >
          Interior Designer & 3D Artist
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-6xl md:text-9xl font-serif italic mb-8"
        >
          Experience, Crafted
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center"
        >
          <a href="#work" className="group flex flex-col items-center">
            <span className="text-[10px] tracking-[0.3em] uppercase mb-4 group-hover:text-gray-400 transition-colors">Discover Work</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-16 bg-white/30 group-hover:bg-white transition-colors"
            />
          </a>
        </motion.div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-4">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${current === idx ? 'bg-white w-8' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div style={{ y }} className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <a href='https://ifh.cc/v-Fsct9f' target='_blank' className="block w-full h-full">
                <SafeImage 
                  src={`${import.meta.env.BASE_URL}11.jpg`} 
                  fallbackSrc="https://ifh.cc/g/Fsct9f.jpg"
                  alt="Jo Eunae" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </a>
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40">Interior Designer</div>
            </div>
          </motion.div>

          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs tracking-[0.5em] uppercase text-gray-500 mb-6 block"
            >
              The Story
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif mb-12 leading-tight"
            >
              조은애 <br />
              <span className="italic text-gray-400">Jo Eunae</span>
            </motion.h2>
            
            <div className="space-y-8 text-gray-400 leading-relaxed font-light">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                단순히 아름다운 공간을 만드는 것을 넘어, 그 공간을 사용하는 누군가에게 편안함과 즐거움을 줄 수 있는 디자인을 하고 싶습니다.
              </motion.p>

              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-white mb-6">Experience</h3>
                <ul className="space-y-6">
                  <li className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">주식회사 블랙스톰</p>
                      <p className="text-sm">배경모델링팀 근무</p>
                    </div>
                    <span className="text-xs text-gray-500">2024.01 - 2025.06</span>
                  </li>
                  <li className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">국립공주대학교 예술대학</p>
                      <p className="text-sm">게임디자인학과 졸업</p>
                    </div>
                    <span className="text-xs text-gray-500">2023.02</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: any) => {
  return (
    <Link to={`/project/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative aspect-[4/5] overflow-hidden rounded-xl cursor-pointer perspective-1000"
      >
        <motion.div 
          whileHover={{ rotateY: 5, rotateX: -5, scale: 1.05 }}
          className="w-full h-full transition-all duration-700 ease-out preserve-3d"
        >
          <SafeImage 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">{project.category}</span>
            <h3 className="text-2xl font-serif mb-4">{project.title}</h3>
            <p className="text-sm text-gray-300 font-light mb-6 line-clamp-2">{project.description}</p>
            <div className="flex items-center text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform">
              View Project <ChevronRight size={14} className="ml-2" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs tracking-[0.5em] uppercase text-gray-500 mb-6 block"
            >
              Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif"
            >
              Selected <br />
              <span className="italic">Works</span>
            </motion.h2>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-gray-500 text-sm max-w-xs text-right font-light">
              A collection of spaces that redefine modern living through light, texture, and form.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-[#0f0f0f] border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-9xl font-serif italic mb-16 text-white/10"
        >
          Get in Touch
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <Mail size={20} />
            </div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Email</p>
            <a href="mailto:joeunae4588@gmail.com" className="text-lg hover:text-gray-400 transition-colors">joeunae4588@gmail.com</a>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <Instagram size={20} />
            </div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Social</p>
            <a href="#" className="text-lg hover:text-gray-400 transition-colors">@eunae_design</a>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <MapPin size={20} />
            </div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Location</p>
            <p className="text-lg">Seoul, South Korea</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <User size={20} />
            </div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">MORE ABOUT ME</p>
            <a href="https://j0eum.artstation.com/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-gray-400 transition-colors">ArtStation</a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase text-gray-600">
          <p>© 2026 JO EUNAE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-xs tracking-[0.3em] uppercase text-gray-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Works
        </motion.button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-gray-500 mb-4 block">{project.category}</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-8">{project.title}</h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </motion.div>

          <div className="space-y-12">
            {project.details.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden"
              >
                <SafeImage 
                  src={img} 
                  alt={`${project.title} detail ${idx + 1}`} 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Contact />
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white/50 z-[60] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>

        {/* Custom Cursor or Floating Elements could go here */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        </div>
      </div>
    </Router>
  );
}
