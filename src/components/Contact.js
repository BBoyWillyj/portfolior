import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    const fadeEls = document.querySelectorAll('#contact .fade-up');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const formData = new FormData(e.target);
    formData.append("access_key", "cb4b05e9-6273-42ed-873c-cfc75c535c18");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        e.target.reset();
        // Hide success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setStatus({ loading: false, success: false, error: data.message || "Failed to submit" });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Something went wrong. Please try again." });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left contact info details */}
          <div className="fade-up">
            <span className="section-label block mb-3">Get In Touch</span>
            <h2 className="section-title mb-6 text-charcoal">Start Your<br /><span className="highlight">Project</span></h2>
            <p className="font-body text-base text-gray-500 leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Have a project in mind? I'd love to hear about it. Share your vision and let's build something remarkable together.
            </p>
            {/* Contact info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border border-warm hover:border-rust transition-colors">
                <div className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" fill="none" stroke="#F5F0E8" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <p className="font-body text-xs text-gray-400 tracking-wide" style={{ fontWeight: 300 }}>Email</p>
                  <p className="font-body font-medium text-sm text-charcoal">j2willy03@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-warm hover:border-rust transition-colors">
                <div className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" fill="none" stroke="#F5F0E8" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" /></svg>
                </div>
                <div>
                  <p className="font-body text-xs text-gray-400 tracking-wide" style={{ fontWeight: 300 }}>Phone</p>
                  <p className="font-body font-medium text-sm text-charcoal">+234 8134533922</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-warm hover:border-rust transition-colors">
                <div className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" fill="none" stroke="#F5F0E8" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <p className="font-body text-xs text-gray-400 tracking-wide" style={{ fontWeight: 300 }}>Location</p>
                  <p className="font-body font-medium text-sm text-charcoal">Abuja, Lugbe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="fade-up">
            <div className="p-8 rounded-xl border border-warm" style={{ background: '#EDE8DF' }}>
              <h3 className="font-display font-bold text-xl mb-6 tracking-tight text-charcoal">Tell Me About Your Project</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-gray-500 tracking-wide block mb-1.5" style={{ fontWeight: 300 }}>Your Name</label>
                    <input type="text" name="name" placeholder="Joshua Williams" className="form-input text-charcoal" required />
                  </div>
                  <div>
                    <label className="font-body text-xs text-gray-500 tracking-wide block mb-1.5" style={{ fontWeight: 300 }}>Your Niche</label>
                    <input type="text" name="niche" placeholder="E-commerce" className="form-input text-charcoal" required />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wide block mb-1.5" style={{ fontWeight: 300 }}>Email Address</label>
                  <input type="email" name="email" placeholder="you@example.com" className="form-input text-charcoal" required />
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wide block mb-1.5" style={{ fontWeight: 300 }}>Budget Range</label>
                  <select 
                    name="budget" 
                    className="form-input text-charcoal" 
                    defaultValue=""
                    style={{
                      appearance: 'none',
                      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center'
                    }}
                  >
                    <option value="" disabled>Select your budget</option>
                    <option>₦30k – ₦50k</option>
                    <option>₦50k – ₦100k</option>
                    <option>₦100k – ₦200k</option>
                    <option>₦200k+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wide block mb-1.5" style={{ fontWeight: 300 }}>About Your Project</label>
                  <textarea name="project description" rows="4" placeholder="Tell me about your project goals, timeline, and any specific requirements..." className="form-input resize-none text-charcoal"></textarea>
                </div>
                <button type="submit" disabled={status.loading} className="btn-primary w-full justify-center mt-2">
                  {status.loading ? 'Sending...' : 'Send Message'} <span>→</span>
                </button>
              </form>

              {status.success && (
                <p id="form-success" className="mt-4 text-center font-body text-sm text-green-600 font-medium">
                  ✓ Message sent! I'll be in touch soon.
                </p>
              )}

              {status.error && (
                <p className="mt-4 text-center font-body text-sm text-red-600 font-medium">
                  Error: {status.error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
