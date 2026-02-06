
import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // 마우스의 목표 위치 (Target)
  const mouse = useRef({ x: -100, y: -100 });
  // 커서의 현재 부드러운 위치 (Current)
  const pos = useRef({ x: -100, y: -100 });
  
  const requestRef = useRef<number | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkEnvironment = () => {
      // 1024px 미만 or 터치 디바이스(pointer: coarse)인 경우 커스텀 커서 비활성화
      const isSmallScreen = window.innerWidth < 1024;
      const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      
      setIsEnabled(!isSmallScreen && !isTouch);
    };

    // 초기 체크
    checkEnvironment();

    // 리사이즈 시 재확인
    window.addEventListener('resize', checkEnvironment);
    return () => window.removeEventListener('resize', checkEnvironment);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // 1. 마우스 위치 업데이트 (이벤트 발생 시 좌표만 기록)
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // 2. 인터랙티브 요소 호버 처리 (DOM 직접 조작)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.matches('a, button, input, textarea, [role="button"], .interactive') ||
        target.closest('a, button, input, textarea, [role="button"], .interactive') !== null;

      if (isInteractive && cursor) {
        cursor.style.width = '160px';
        cursor.style.height = '160px';
        cursor.style.opacity = '0.15';
        cursor.style.background = 'black';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.matches('a, button, input, textarea, [role="button"]') ||
        target.closest('a, button, input, textarea, [role="button"]') !== null;

      if (isInteractive && cursor) {
        cursor.style.width = '14px';
        cursor.style.height = '14px';
        cursor.style.opacity = '0.8';
        cursor.style.background = '#fa234a';
      }
    };

    // 3. 최적화된 렌더링 루프 (Lerp + GPU 가속)
    const animate = () => {
      const lerp = 0.12; // 쫀득한 움직임을 위한 보간값 (0~1)
      
      pos.current.x += (mouse.current.x - pos.current.x) * lerp;
      pos.current.y += (mouse.current.y - pos.current.y) * lerp;

      if (cursor) {
        // translate3d로 GPU 하드웨어 가속 강제 사용
        cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    
    requestRef.current = requestAnimationFrame(animate);

    // 4. 완벽한 이벤트 구독 해제 (Memory Leak 방지)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isEnabled]);

  // 비활성화 상태면 렌더링 안함
  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform transition-[width,height,opacity,background] duration-300 ease-out"
      style={{
        width: '14px',
        height: '14px',
        opacity: 0.8,
        backgroundColor: '#fa234a',
        transform: 'translate3d(-100px, -100px, 0)', // 초기 위치 하드웨어 가속 적용
      }}
    />
  );
}
