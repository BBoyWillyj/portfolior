import React, { useEffect } from 'react';

export default function Projects() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('#projects .fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
    return () => {
      fadeEls.forEach(el => observer.unobserve(el));
    };
  }, []);

  const projectsData = [
    {
      title: "Sales Converter",
      subtitle: "Assistant Sales Converter",
      category: "Landing Page",
      desc: "We help small businesses improve their sales system by identifying leaks in their sales system and improving their response strategy.",
      link: "https://bboywillyj.github.io/Business-Landing-Page/",
      gradient: "linear-gradient(135deg, #e8e0d0 0%, #c8b898 100%)",
      svg: (
        <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      )
    },
    {
      title: "Yoga",
      subtitle: "Yoga",
      category: "Landing Page",
      desc: "Join our club and discover the true benefits of yoga. Enhance flexibility, reduce stress, and embrace a healthier, balanced lifestyle.",
      link: "https://bboywillyj.github.io/Yogo-landing-page/",
      gradient: "linear-gradient(135deg, #1A1A2E 0%, #0f3460 100%)",
      svg: (
        <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    },
    {
      title: "Creatives",
      subtitle: "Cre Ives",
      category: "Landing Page",
      desc: "Discover the stories within each portfolio, where creativity knows no bounds, and be inspired by the diversity of our creative community.",
      link: "https://bboywillyj.github.io/GoMyCode-Assignments/",
      gradient: "linear-gradient(135deg, #2D2D2D 0%, #555555 100%)",
      svg: (
        <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12" style={{ background: '#EDE8DF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="section-label block mb-3">Portfolio</span>
            <h2 className="section-title text-charcoal">Selected<br /><span className="highlight">Projects</span></h2>
          </div>
          <p className="font-body text-base text-gray-500 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
            A curated showcase of clean, modern, responsive websites I've built.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-grid">
          {projectsData.map((project, index) => (
            <div 
              key={index} 
              className="project-card fade-up"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="project-img-wrap" style={{ background: project.gradient }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-xl bg-rust mx-auto mb-4 flex items-center justify-center">
                      {project.svg}
                    </div>
                    <p className="font-display font-bold text-charcoal text-sm">{project.subtitle}</p>
                  </div>
                </div>
                <div className="project-overlay">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-cream text-charcoal px-5 py-2.5 rounded font-body text-xs font-medium tracking-wide hover:bg-rust hover:text-cream transition-colors"
                  >
                    View Project →
                  </a>
                </div>
              </div>
              <div className="p-5 bg-cream">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-base tracking-tight text-charcoal">{project.title}</h3>
                  <span className="tag-pill text-xs text-charcoal">{project.category}</span>
                </div>
                <p className="font-body text-sm text-gray-500" style={{ fontWeight: 300 }}>
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
