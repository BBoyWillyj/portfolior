import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mx = 0, my = 0;
    let fx = 0, fy = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
    };

    let animationFrameId;
    const animateFollower = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = `${fx}px`;
      follower.style.top = `${fy}px`;
      animationFrameId = requestAnimationFrame(animateFollower);
    };

    const handleMouseEnter = () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      follower.style.width = '48px';
      follower.style.height = '48px';
      follower.style.opacity = '0.3';
    };

    const handleMouseLeave = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.opacity = '0.6';
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(animateFollower);

    // Dynamic hover bindings using mutation observer
    const bindHovers = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, select, [data-hover]');
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    bindHovers();
    const observer = new MutationObserver(bindHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      const hoverables = document.querySelectorAll('a, button, input, textarea, select, [data-hover]');
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-follower" ref={followerRef}></div>
    </>
  );
}
