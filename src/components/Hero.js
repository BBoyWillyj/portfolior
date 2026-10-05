import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Small delay to ensure render has occurred
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #C8522A 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-20 left-0 w-56 h-56 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #7A8C7E 0%, transparent 70%)' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-rust to-transparent opacity-20"></div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div 
            className="space-y-8 transform transition-all duration-1000 ease-out" 
            style={{ 
              opacity: animate ? 1 : 0, 
              transform: animate ? 'translateY(0)' : 'translateY(30px)' 
            }}
          >
            <div>
              <span className="tag-pill mb-5 inline-block">Web Developer</span>
              <div className="mt-5">
                <p className="font-body text-base text-sage font-light tracking-wide mb-2">Hello, I am</p>
                <h1 className="font-display font-extrabold leading-none tracking-tight text-charcoal" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
                  Joshua<br />
                  <span className="hero-text-outline">Williams</span>
                </h1>
              </div>
            </div>
            <p className="font-body text-base leading-relaxed text-gray-600 max-w-md" style={{ fontWeight: 300 }}>
              I craft digital solutions that combine cutting-edge technology with beautiful designs. Let's turn your ideas into reality.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="btn-primary">View My Work <span>↓</span></a>
              <a href="#contact" className="btn-outline">Hire Me</a>
            </div>
            {/* Social + availability badge */}
            <div className="flex items-center gap-6 pt-2">
              <a href="https://github.com/BBoyWillyj" target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-rust transition-colors" title="GitHub">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-body text-xs text-gray-500 tracking-wide">Available for work</span>
              </div>
            </div>
          </div>
          {/* Right — portrait placeholder with creative frame */}
          <div 
            className="flex justify-center md:justify-end transform transition-all duration-1000 ease-out delay-200"
            style={{ 
              opacity: animate ? 1 : 0, 
              transform: animate ? 'translateY(0)' : 'translateY(30px)' 
            }}
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-6 border border-dashed border-rust opacity-20 rounded-full"></div>
              <div className="absolute -inset-12 border border-dashed border-rust opacity-10 rounded-full"></div>
              {/* Main image area */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-warm shadow-2xl" style={{ background: 'linear-gradient(145deg, #e8e0d0 0%, #d8d0c2 100%)' }}>
                {/* Initials placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-charcoal flex items-center justify-center mb-4">
                    <span className="font-display font-extrabold text-4xl text-cream">JW</span>
                  </div>
                  <span className="font-display font-semibold text-lg text-charcoal">Joshua Williams</span>
                  <span className="font-body text-xs text-sage mt-1 tracking-widest uppercase">Developer</span>
                </div>
                {/* Decorative elements on photo */}
                <div className="absolute bottom-4 left-4 bg-charcoal text-cream px-3 py-2 rounded-lg">
                  <p className="font-body text-xs font-light opacity-70">Projects Done</p>
                  <p className="font-display font-bold text-xl">10+</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-rust text-cream rounded-lg px-4 py-2 shadow-lg">
                <p className="font-body text-xs font-light opacity-80">Rating</p>
                <p className="font-display font-bold">5.0 ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
