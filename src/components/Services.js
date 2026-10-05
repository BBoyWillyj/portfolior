import React, { useEffect } from 'react';

export default function Services() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('#services .fade-up');
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

  const serviceData = [
    {
      title: "Landing Page",
      desc: "Clean, user-focused layouts with clear structure, smooth navigation, and strong visual hierarchy.",
      points: ["Modern layouts", "Responsive design"],
      svg: (
        <svg width="22" height="22" fill="none" stroke="#F5F0E8" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )
    },
    {
      title: "Frontend Dev",
      desc: "Responsive interfaces using HTML, CSS, and JavaScript for clean, consistent, reliable performance.",
      points: ["Clean HTML/CSS", "Smooth interactions"],
      svg: (
        <svg width="22" height="22" fill="none" stroke="#F5F0E8" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: "Online Shopp",
      desc: "Fast, mobile-first websites optimized for speed, accessibility, and dependable cross-device performance.",
      points: ["Speed optimization", "Asset efficiency"],
      svg: (
        <svg width="22" height="22" fill="none" stroke="#F5F0E8" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      title: "Portfolio Website",
      desc: "Lightweight WordPress setups with fast loading, easy updates, and scalable, customizable layouts.",
      points: ["Theme setup", "Easy management"],
      svg: (
        <svg width="22" height="22" fill="none" stroke="#F5F0E8" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="section-label block mb-3">What I Do</span>
            <h2 className="section-title text-charcoal">Services I<br /><span className="highlight">Provide</span></h2>
          </div>
          <p className="font-body text-base text-gray-500 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
            Designing clean, scalable, and responsive websites that leave a lasting impression.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceData.map((service, index) => (
            <div 
              key={index}
              className="service-card fade-up"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-charcoal flex items-center justify-center mb-6">
                {service.svg}
              </div>
              <h3 className="font-display font-bold text-lg mb-3 tracking-tight text-charcoal">{service.title}</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed mb-5" style={{ fontWeight: 300 }}>
                {service.desc}
              </p>
              <div className="divider mb-4"></div>
              <div className="flex flex-col gap-2">
                {service.points.map((pt, pIdx) => (
                  <span key={pIdx} className="text-xs font-body text-sage flex items-center gap-2">
                    <span className="text-rust">→</span> {pt}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
