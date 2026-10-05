
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
  function animateFollower() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width='18px'; cursor.style.height='18px'; follower.style.width='48px'; follower.style.height='48px'; follower.style.opacity='0.3'; });
    el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; follower.style.width='36px'; follower.style.height='36px'; follower.style.opacity='0.6'; });
  });

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNav();
  });

  // Active nav link
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      const bottom = top + sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`.nav-link[href="#${sec.id}"]`).forEach(l => l.classList.add('active'));
      }
    });
  }

  // Mobile menu
  let menuOpen = false;
  function toggleMenu() {
    menuOpen = !menuOpen;
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open', menuOpen);
    document.getElementById('h1').style.transform = menuOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    document.getElementById('h2').style.opacity = menuOpen ? '0' : '1';
    document.getElementById('h3').style.transform = menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : '';
    document.getElementById('h3').style.width = menuOpen ? '24px' : '';
  }

  // Fade-up observer
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // Skill bars animation
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bars = e.target.querySelectorAll('.skill-bar-fill');
        bars.forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObserver.observe(skillsSection);

  // Counter animation
  function animateCount(el, target, suffix='') {
    let cur = 0; const duration = 1800; const step = target / (duration / 16);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.round(cur) + suffix;
      if (cur >= target) clearInterval(timer);
    }, 16);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCount(document.getElementById('stat-exp'), 2, '+');
      animateCount(document.getElementById('stat-proj'), 10, '+');
      animateCount(document.getElementById('stat-clients'), 5, '+');
      statsObserver.unobserve(entries[0].target);
    }
  }, { threshold: 0.4 });
  const aboutSection = document.getElementById('about');
  if (aboutSection) statsObserver.observe(aboutSection);

  // Project filter
  function filterProjects(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = ''; b.style.color = '';
    });
    btn.classList.add('active');
    btn.style.background = '#1A1A1A'; btn.style.color = '#F5F0E8'; btn.style.borderColor = '#1A1A1A';
    document.querySelectorAll('#projects-grid .project-card').forEach(card => {
      const cat = card.dataset.category;
      if (category === 'all' || cat === category) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  }
  // Set initial active style
  const firstFilter = document.querySelector('.filter-btn.active');
  if (firstFilter) { firstFilter.style.background = '#1A1A1A'; firstFilter.style.color = '#F5F0E8'; firstFilter.style.borderColor = '#1A1A1A'; }

  // Contact form
  // function submitForm() {
  //   const btn = event.target;
  //   btn.textContent = 'Sending...';
  //   btn.style.opacity = '0.7';
  //   setTimeout(() => {
  //     btn.textContent = '✓ Sent!';
  //     btn.style.background = '#16a34a';
  //     document.getElementById('form-success').classList.remove('hidden');
  //     setTimeout(() => {
  //       btn.textContent = 'Send Message →'; btn.style.opacity = ''; btn.style.background = '';
  //       document.getElementById('form-success').classList.add('hidden');
  //     }, 3000);
  //   }, 1200);
  // }
  
  // const form = document.getElementById('form');
  // const submitBtn = form.querySelector('button[type="submit"]');

  // form.addEventListener('submit', async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData(form);
  //     formData.append("access_key", "cb4b05e9-6273-42ed-873c-cfc75c535c18");

  //     const originalText = submitBtn.textContent;

  //     submitBtn.textContent = "Sending...";
  //     submitBtn.disabled = true;

  //     try {
  //         const response = await fetch("https://api.web3forms.com/submit", {
  //             method: "POST",
  //             body: formData
  //         });

  //         const data = await response.json();

  //         if (response.ok) {
  //             alert("Success! Your message has been sent.");
  //             form.reset();
  //         } else {
  //             alert("Error: " + data.message);
  //         }

  //     } catch (error) {
  //         alert("Something went wrong. Please try again.");
  //     } finally {
  //         submitBtn.textContent = originalText;
  //         submitBtn.disabled = false;
  //     }
  // });


  // Hero entrance animation
  window.addEventListener('load', () => {
    const left = document.getElementById('hero-left');
    const right = document.getElementById('hero-right');
    if (left && right) {
      left.style.opacity = '0'; left.style.transform = 'translateY(30px)';
      right.style.opacity = '0'; right.style.transform = 'translateY(30px)';
      setTimeout(() => { left.style.transition = 'opacity 0.9s ease, transform 0.9s ease'; left.style.opacity = '1'; left.style.transform = ''; }, 100);
      setTimeout(() => { right.style.transition = 'opacity 0.9s ease, transform 0.9s ease'; right.style.opacity = '1'; right.style.transform = ''; }, 300);
    }
  });