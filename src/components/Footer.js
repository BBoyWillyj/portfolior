import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="py-12 px-6 md:px-12 bg-charcoal text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rust rounded flex items-center justify-center">
              <span className="font-display font-bold text-cream text-sm">W</span>
            </div>
            <span className="font-display font-bold text-cream text-base tracking-tight">Joshua Williams<span className="text-rust">.</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => handleNavClick('home')} className="font-body text-xs text-gray-400 hover:text-cream transition-colors tracking-wide uppercase" style={{ fontWeight: 300 }}>Home</button>
            <button onClick={() => handleNavClick('services')} className="font-body text-xs text-gray-400 hover:text-cream transition-colors tracking-wide uppercase" style={{ fontWeight: 300 }}>Services</button>
            <button onClick={() => handleNavClick('about')} className="font-body text-xs text-gray-400 hover:text-cream transition-colors tracking-wide uppercase" style={{ fontWeight: 300 }}>About</button>
            <button onClick={() => handleNavClick('projects')} className="font-body text-xs text-gray-400 hover:text-cream transition-colors tracking-wide uppercase" style={{ fontWeight: 300 }}>Projects</button>
            <button onClick={() => handleNavClick('contact')} className="font-body text-xs text-gray-400 hover:text-cream transition-colors tracking-wide uppercase" style={{ fontWeight: 300 }}>Contact</button>
            <Link to="/blog" className="font-body text-xs text-gray-400 hover:text-cream transition-colors tracking-wide uppercase" style={{ fontWeight: 300 }}>Blog</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/BBoyWillyj" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rust transition-colors">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8">
          <p className="font-body text-xs text-gray-500 tracking-wide" style={{ fontWeight: 300 }}>© 2026 Joshua Williams — All Rights Reserved</p>
          <p className="font-body text-xs text-gray-600 tracking-wide" style={{ fontWeight: 300 }}>Designed & Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
