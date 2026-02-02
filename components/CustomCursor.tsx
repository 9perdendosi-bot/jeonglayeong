import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Store positions in refs to avoid re-renders during animation loop
  const mousePosition = useRef({ x: -100, y: -100 });
  const cursorPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Initial mouse position listener
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = 
        target.matches('a, button, input, textarea') ||
        target.closest('a, button, input, textarea') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation loop for smooth movement (Lerp)
    let animationFrameId: number;
    
    const animateCursor = () => {
      // The "smoothness" factor. Lower = smoother/slower lag. Higher = snappier.
      // 0.15 provides a nice fluid feeling.
      const smoothness = 0.15;

      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      cursorPosition.current.x += dx * smoothness;
      cursorPosition.current.y += dy * smoothness;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    // Start the loop
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-[width,height,opacity,background-color] duration-300 ease-out"
      style={{
        // Radial gradient: Center(#3220f8) -> Middle(#e8023f) -> Outer(#fa234a)
        // Middle color updated to #e8023f with 10% stop as requested
        background: isHovering 
          ? 'radial-gradient(circle, #3220f8 0%, #e8023f 10%, #fa234a 100%)' 
          : '#fa234a',
        width: isHovering ? '160px' : '14px',
        height: isHovering ? '160px' : '14px',
        opacity: isHovering ? 0.5 : 0.8,
        // Start off-screen
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform, width, height'
      }}
    />
  );
}