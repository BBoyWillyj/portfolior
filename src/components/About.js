import React, { useEffect, useState, useRef } from 'react';

export default function About() {
  const [projectCount, setProjectCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fade-up elements
    const fadeEls = document.querySelectorAll('#about .fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));

    // Stats counter animation trigger
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Animate projects count
        let curProj = 0;
        const duration = 1500;
        const targetProj = 10;
        const stepProj = targetProj / (duration / 16);
        const timer = setInterval(() => {
          curProj = Math.min(curProj + stepProj, targetProj);
          setProjectCount(Math.round(curProj));
          if (curProj >= targetProj) clearInterval(timer);
        }, 16);

        statsObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.4 });

    const currentSection = sectionRef.current;
    if (currentSection) {
      statsObserver.observe(currentSection);
    }

    return () => {
      fadeEls.forEach(el => observer.unobserve(el));
      if (currentSection) {
        statsObserver.disconnect();
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12" style={{ background: '#EDE8DF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — image placeholder frame */}
          <div className="flex justify-center fade-up">
            <div className="about-img-frame">
              <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #d8d0c2 0%, #c8c0b2 100%)' }}>
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-charcoal flex items-center justify-center">
                    <span className="font-display font-extrabold text-3xl text-cream">JW</span>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-lg text-charcoal">Joshua Williams</p>
                    <p className="font-body text-xs text-sage tracking-widest uppercase mt-1">Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — text details */}
          <div className="space-y-8 fade-up">
            <div>
              <span className="section-label block mb-3">About Me</span>
              <h2 className="section-title mb-6 text-charcoal">Crafting Digital<br />Experiences</h2>
              <p className="font-body text-base text-gray-600 leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                I'm a front-end developer and designer passionate about creating clean, intuitive, and responsive digital experiences. I focus on turning ideas into seamless interfaces by understanding user needs and designing thoughtful UI layouts.
              </p>
              <p className="font-body text-base text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>
                With a keen eye for detail and a love for clean code, I build websites that not only look great but also deliver exceptional user experiences across all devices.
              </p>
            </div>

            {/* Approach steps */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base tracking-tight text-charcoal">My Approach</h3>
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-rust flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-bold text-xs text-cream">1</span>
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-charcoal">Understand users & goals</p>
                  <p className="font-body text-xs text-gray-500 mt-0.5" style={{ fontWeight: 300 }}>Deep research into user needs and project objectives.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-rust flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-bold text-xs text-cream">2</span>
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-charcoal">Create clean UI layouts</p>
                  <p className="font-body text-xs text-gray-500 mt-0.5" style={{ fontWeight: 300 }}>Wireframe, prototype, and iterate with precision.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-rust flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-bold text-xs text-cream">3</span>
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-charcoal">Build responsive experiences</p>
                  <p className="font-body text-xs text-gray-500 mt-0.5" style={{ fontWeight: 300 }}>Code it to perfection — beautiful on every screen.</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-warm">
              <div>
                <p className="stat-number">{projectCount}+</p>
                <p className="font-body text-xs text-gray-500 mt-1 tracking-wide" style={{ fontWeight: 300 }}>Projects<br />Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
