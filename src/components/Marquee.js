import React from 'react';

export default function Marquee() {
  const techs = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'];
  
  // Duplicate array twice to ensure seamless loop on wide screens
  const marqueeItems = [...techs, ...techs, ...techs, ...techs];

  return (
    <div className="py-5 border-y border-warm overflow-hidden relative z-10" style={{ background: '#EDE8DF' }}>
      <div 
        className="flex gap-12" 
        style={{ 
          width: 'max-content', 
          animation: 'marquee 20s linear infinite' 
        }}
      >
        {marqueeItems.map((tech, idx) => (
          <React.Fragment key={idx}>
            <span className="font-display font-bold text-xl tracking-tight opacity-25">{tech}</span>
            <span className="text-rust font-body text-xl opacity-50">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
