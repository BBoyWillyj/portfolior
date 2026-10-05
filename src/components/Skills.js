import React, { useEffect, useState, useRef } from 'react';

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimate(true);
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.3 });

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.disconnect();
      }
    };
  }, []);

  const skillsData = [
    { name: 'HTML & CSS', value: 95 },
    { name: 'JavaScript', value: 85 },
    { name: 'React', value: 78 }
  ];

  const tools = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'GitHub'];

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label block mb-3">Expertise</span>
          <h2 className="section-title text-charcoal">Skills & <span className="highlight">Tools</span></h2>
          <p className="font-body text-base text-gray-500 mt-4 max-w-md mx-auto" style={{ fontWeight: 300 }}>
            Crafting seamless UI/UX experiences and writing clean, performant code.
          </p>
        </div>

        <div className="flex flex-col gap-y-10 max-w-3xl mx-auto">
          {skillsData.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="font-body font-medium text-sm text-charcoal">{skill.name}</span>
                <span className="font-body text-sm text-rust font-medium">{skill.value}%</span>
              </div>
              <div className="skill-bar-bg">
                <div 
                  className="skill-bar-fill" 
                  style={{ width: animate ? `${skill.value}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges grid */}
        <div className="mt-16">
          <h3 className="font-display font-bold text-lg text-center mb-8 tracking-tight text-charcoal">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, idx) => (
              <span 
                key={idx}
                className="tag-pill hover:border-rust hover:text-rust transition-colors cursor-default text-charcoal"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
