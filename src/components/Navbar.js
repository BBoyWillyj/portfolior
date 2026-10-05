import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section on scroll (only if on home page)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScrollActive = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const bottom = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener('scroll', handleScrollActive);
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, [location.pathname]);

  // Handle navigation click (scroll to hash or navigate first)
  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  // Scroll to hash on page load/navigation
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: 'Home', id: 'home', isHash: true },
    { label: 'Services', id: 'services', isHash: true },
    { label: 'About', id: 'about', isHash: true },
    { label: 'Skills', id: 'skills', isHash: true },
    { label: 'Projects', id: 'projects', isHash: true },
  ];

  // Mobile menu style updates
  const h1Style = menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {};
  const h2Style = menuOpen ? { opacity: 0 } : {};
  const h3Style = menuOpen ? { transform: 'rotate(-45deg) translate(4px,-4px)', width: '24px' } : {};

  const isHome = location.pathname === '/';

  return (
    <nav id="navbar" className={`py-5 px-6 md:px-12 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-decoration-none">
          <div className="w-8 h-8 bg-charcoal rounded flex items-center justify-center">
            <span className="font-display font-800 text-cream text-sm">W</span>
          </div>
          <span className="font-display font-bold text-charcoal text-base tracking-tight">WillyJ<span className="text-rust">.</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`nav-link ${isHome && activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/blog"
            className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
          >
            Blog
          </Link>
        </div>

        <button
          onClick={() => handleNavClick('contact')}
          className="hidden md:inline-flex btn-primary text-xs"
        >
          Let's Talk <span>→</span>
        </button>

        {/* Hamburger */}
        <button id="hamburger" className="md:hidden flex flex-col gap-1.5 p-1" onClick={toggleMenu}>
          <span className="block w-6 h-0.5 bg-charcoal transition-all duration-300" style={h1Style}></span>
          <span className="block w-6 h-0.5 bg-charcoal transition-all duration-300" style={h2Style}></span>
          <span className="block w-4 h-0.5 bg-charcoal transition-all duration-300" style={h3Style}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`md:hidden bg-warm border-t border-warm mt-4 mx-6 rounded-lg overflow-hidden ${menuOpen ? 'open' : ''}`}>
        <div className="flex flex-col p-6 gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="nav-link text-left"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="nav-link text-left"
          >
            Blog
          </Link>
          <button
            onClick={() => handleNavClick('contact')}
            className="btn-primary text-center justify-center"
          >
            Let's Talk →
          </button>
        </div>
      </div>
    </nav>
  );
}
