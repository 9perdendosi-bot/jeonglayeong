import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "https://i.imgur.com/JMfYL0I.jpeg",
  "https://i.imgur.com/ZhdNcrD.jpeg",
  "https://i.imgur.com/q6klivM.jpeg",
  "https://i.imgur.com/HLBEFc6.jpeg",
  "https://i.imgur.com/eUEylM1.jpeg"
];

export default function FacingTheDividedA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = horizontalTrackRef.current;
      const container = containerRef.current;
      
      if (!track || !container) return;

      // Calculate the distance to scroll horizontally
      // We use a function to recalculate on resize automatically via ScrollTrigger's invalidateOnRefresh
      const getScrollAmount = () => {
        // Calculate total scrollable width: Track Width - Viewport Width
        // Added a buffer (padding) to ensure the last item is fully revealed
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth);
      };

      gsap.to(track, {
        // Move to negative X value (Move Left) when scrolling down
        x: () => -getScrollAmount(), 
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,        // Pin the container while scrolling
          start: "top top", // Start animation when container hits top of viewport
          end: () => `+=${getScrollAmount()}`, // The scroll distance corresponds to the horizontal width
          scrub: 1,         // Smooth scrubbing effect
          invalidateOnRefresh: true, // Recalculate values on window resize
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Fixed Top Banner (Kept as requested) */}
      <div className="w-full h-[60vh] relative bg-black overflow-hidden">
        <img 
          src="https://i.imgur.com/zcICRjS.jpeg" 
          alt="Lantern Banner" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* 2. Pinned Horizontal Scroll Section */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col bg-white">
        
        {/* Sticky Header: Title & Description */}
        <div className="flex-none pt-12 pb-8 px-6 md:px-12 w-full z-10 bg-white/95 backdrop-blur-sm">
           <div className="max-w-4xl">
             <h2 className="text-4xl md:text-6xl font-medium mb-3 tracking-tight text-black">
               분열된 a 직면하기
             </h2>
             <p className="text-xl md:text-2xl text-black mb-6 font-normal">
               2025, 해체된 사과 및 혼합 재료, 가변설치
             </p>
             <p className="text-base md:text-lg text-gray-500 max-w-4xl leading-relaxed text-justify break-keep">
               빨간 사과 껍질은 거울에 비친 나로, 우리는 거울을 볼 때 나라고 생각하지만 그것은 내가 아닌 나의 이미지일 뿐이다. 변질된 내용물이 박제된 사과의 모습은 어떠한 ‘이미지’로 고정되었다. 우리는 사과의 표면인 빨간색의 존재로 자신을 받아들이려 하며 이것은 타인에게 보여주고 싶어 하는 꾸며진 자아이다_타인에게 보이는 ‘나’는 껍데기일 뿐이라는 은유로 보이기도 한다. 우리는 껍질_이미지만 보고 그것을 사과라고 부르며 그 껍질을 지탱하고 의미를 부여하는 씨앗과 과즙, 과육은 모든 이미지와 언어가 생성되기 이전_사회가 규정하기 이전_의 가장 원초적인 인간의 본질에 해당한다. 사과 껍질 아래에 단어들을 배치하고 정렬한 행위는 인간이 사회 속에서 어떻게 규정되는지를 보여주며 박제된 껍질은 자아이자 페르소나로서 사과의 내용물을 보호하는 듯하지만 외부의 시선이 닿는 유일한 면이기도 하다. 배열된 사과 껍질과 이를 의미하는 각 단어들을 구성하는 선반, 그리고 분리된 과육, 씨앗, 과즙이 위치한 좌대는 어떻게 본질을 소외시키면서 동시에 구성하는지 상기시킨다.
             </p>
           </div>
        </div>

        {/* Horizontal Track */}
        <div className="flex-grow flex items-center w-full relative pb-12 md:pb-20">
          <div 
            ref={horizontalTrackRef} 
            className="flex flex-nowrap items-center px-6 md:px-12 gap-5 md:gap-10 h-[50vh] will-change-transform"
          >
            {/* Added spacer before first item */}
            <div className="flex-shrink-0 w-[10vw] md:w-[15vw]"></div>

            {/* Render Actual Images */}
            {galleryImages.map((src, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[80vw] md:w-[40vw] h-full bg-gray-100 flex items-center justify-center relative overflow-hidden"
              >
                <img 
                  src={src}
                  alt={`Installation View ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Extra padding at the end for visual breathing room */}
            <div className="flex-shrink-0 w-[5vw]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}