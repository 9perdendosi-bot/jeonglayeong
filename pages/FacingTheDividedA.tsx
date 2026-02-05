
import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import OptimizedImage, { getImgurSrcSet } from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "https://i.imgur.com/JMfYL0I.jpeg",
  "https://i.imgur.com/ZhdNcrD.jpeg",
  "https://i.imgur.com/q6klivM.jpeg",
  "https://i.imgur.com/HLBEFc6.jpeg",
  "https://i.imgur.com/eUEylM1.jpeg"
];

const drawingImages = [
  "https://i.imgur.com/BjTW5g4.jpeg",
  "https://i.imgur.com/Q1QQxbX.jpeg",
  "https://i.imgur.com/rxrzq6F.jpeg",
  "https://i.imgur.com/MQ33Xyn.jpeg",
  "https://i.imgur.com/jHnxIil.png",
  "https://i.imgur.com/aAzmBZs.jpeg"
];

// --- Lightbox Component ---
const Lightbox = ({ 
  images, 
  initialIndex, 
  onClose 
}: { 
  images: string[]; 
  initialIndex: number; 
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });

  // Reset zoom when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    lastPosition.current = { x: 0, y: 0 };
    setIsImageLoaded(false); // Reset load state
  }, [currentIndex]);

  // Entrance Animation
  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  // Image Entrance Animation (runs when isImageLoaded becomes true)
  useEffect(() => {
    if (isImageLoaded && imgRef.current) {
      gsap.fromTo(imgRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isImageLoaded]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  // Zoom Logic
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(1, scale + delta), 4);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
      lastPosition.current = { x: 0, y: 0 };
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      lastPosition.current = { x: 0, y: 0 };
    } else {
      setScale(2.5);
    }
  };

  // Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastPosition.current = position;
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f4f4f4]/98 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-[110] pointer-events-none">
         {/* Caption / Title Placeholder */}
         <div className="text-xs text-gray-400 font-mono tracking-widest uppercase pointer-events-auto">
            {currentIndex + 1} / {images.length}
            <div className="text-black font-bold mt-1">Drawing Archive</div>
         </div>

         <button 
          className="pointer-events-auto p-2 hover:bg-gray-200 rounded-full transition-colors group"
          onClick={onClose}
        >
          <X size={32} className="text-black group-hover:scale-90 transition-transform" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button 
        className="absolute left-[2%] md:left-[4%] z-[110] p-4 text-black/50 hover:text-black hover:scale-110 transition-all hidden md:block"
        onClick={handlePrev}
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>

      <button 
        className="absolute right-[2%] md:right-[4%] z-[110] p-4 text-black/50 hover:text-black hover:scale-110 transition-all hidden md:block"
        onClick={handleNext}
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
        onWheel={handleWheel}
      >
        {/* Loading Spinner for Lightbox */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black"></div>
          </div>
        )}

        <img 
          ref={imgRef}
          src={images[currentIndex]} 
          srcSet={getImgurSrcSet(images[currentIndex])}
          sizes="90vw"
          alt={`Drawing ${currentIndex + 1}`} 
          onLoad={() => setIsImageLoaded(true)}
          className={`
            max-w-[90vw] max-h-[85vh] object-contain shadow-2xl origin-center will-change-transform
            ${isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'}
            transition-opacity duration-300
            ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)'
          }}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={toggleZoom}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
        />
      </div>

      {/* Bottom Controls / Indicator */}
      <div className="absolute bottom-[2rem] left-0 right-0 flex justify-center items-center gap-6 pointer-events-none z-[110]">
         <div className="flex items-center gap-4 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-sm pointer-events-auto">
             <button onClick={handlePrev} className="md:hidden p-1 hover:text-gray-500"><ChevronLeft size={20}/></button>
             
             <span className="text-xs font-bold tracking-widest min-w-[3rem] text-center">
               {currentIndex + 1} <span className="text-gray-400">/</span> {images.length}
             </span>
             
             <button onClick={handleNext} className="md:hidden p-1 hover:text-gray-500"><ChevronRight size={20}/></button>
         </div>
         
         {/* Zoom Hint (Desktop) */}
         <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
            {scale > 1 ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
            <span>{scale > 1 ? 'Drag to Pan' : 'Scroll/Click to Zoom'}</span>
         </div>
      </div>
    </div>
  );
};


export default function FacingTheDividedA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    // We use gsap.matchMedia for responsive animation control
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // DESKTOP: >= 768px
      mm.add("(min-width: 768px)", () => {
        const track = horizontalTrackRef.current;
        const container = containerRef.current;
        
        if (!track || !container) return;

        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, trackWidth - viewportWidth);
        };

        gsap.to(track, {
          x: () => -getScrollAmount(), 
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });
      });

      // MOBILE: < 768px
      // Ensure GSAP doesn't interfere with native scrolling by resetting any potential transforms
      mm.add("(max-width: 767px)", () => {
        const track = horizontalTrackRef.current;
        if (track) {
          gsap.set(track, { clearProps: "all" });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Banner - Fluid height using vh */}
      <div className="w-full h-[40vh] md:h-[85vh] relative bg-white overflow-hidden">
        <OptimizedImage
          src="https://i.imgur.com/zcICRjS.jpeg" 
          alt="Lantern Banner" 
          className="w-full h-full"
          imgClassName="object-cover"
          sizes="100vw"
          priority={true} // LCP optimization
        />
      </div>

      {/* Main Container */}
      {/* Mobile: Normal block layout. Desktop: Pinned container (h-screen) */}
      <div 
        ref={containerRef} 
        className="w-full relative flex flex-col bg-white md:h-[100dvh] md:overflow-hidden"
      >
        
        {/* Text Area (Top Summary) - Fluid Padding and Typography */}
        <div className="flex-none pt-[3vh] md:pt-[5vh] px-[5%] md:px-[3rem] w-full z-10">
           <div className="max-w-4xl">
             <h2 className="font-medium mb-[0.5rem] tracking-tight text-black leading-tight text-[clamp(1.5rem,5vw,3.75rem)]">
               분열된 a 직면하기
             </h2>
             <p className="text-black mb-[1rem] md:mb-[1.5rem] font-normal text-[clamp(0.875rem,2vw,1.5rem)]">
               2025, 해체된 사과 및 혼합 재료, 가변설치
             </p>
             <p className="text-gray-500 max-w-4xl leading-relaxed text-justify break-keep text-[clamp(0.8125rem,1.2vw,1.125rem)]">
               빨간 사과 껍질은 거울에 비친 나로, 우리는 거울을 볼 때 나라고 생각하지만 그것은 내가 아닌 나의 이미지일 뿐이다. 변질된 내용물이 박제된 사과의 모습은 어떠한 ‘이미지’로 고정되었다. 우리는 사과의 표면인 빨간색의 존재로 자신을 받아들이려 하며 이것은 타인에게 보여주고 싶어 하는 꾸며진 자아이다.
             </p>
           </div>
        </div>

        {/* Gallery Track Container */}
        {/* Mobile: Horizontal Scroll (Native). Desktop: Flex center (GSAP) */}
        <div className="flex-grow w-full relative mt-[2rem] md:mt-0 flex items-center md:overflow-hidden">
          <div 
            ref={horizontalTrackRef} 
            className="
              flex flex-nowrap items-center w-full
              /* Mobile Styles */
              h-[50vh] overflow-x-auto snap-x snap-mandatory scroll-smooth px-[5%] gap-[1rem]
              /* Desktop Styles */
              md:h-[65vh] md:overflow-visible md:px-0 md:gap-[2.5rem] md:snap-none
            "
            style={{
                WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
                scrollbarWidth: 'none', // Hide scrollbar Firefox
                msOverflowStyle: 'none', // Hide scrollbar IE/Edge
            }}
          >
            {/* Inline style to hide scrollbar for Webkit */}
            <style>{`
                div::-webkit-scrollbar { display: none; }
            `}</style>

            {/* Desktop Spacer - Hidden on Mobile */}
            <div className="hidden md:block flex-shrink-0 w-[40vw] md:w-[30vw]"></div>
            
            {galleryImages.map((src, index) => (
                <div 
                  key={index}
                  className="
                    flex-shrink-0 relative shadow-sm bg-gray-50 flex items-center justify-center
                    /* Mobile: show next image slightly (85vw) + snap center */
                    w-[85vw] h-full snap-center
                    /* Desktop */
                    md:w-[45vw] md:h-full
                  "
                >
                  <OptimizedImage
                    src={src}
                    alt={`Installation View ${index + 1}`}
                    className="w-full h-full"
                    imgClassName="object-cover"
                    sizes="(max-width: 768px) 85vw, 45vw"
                  />
                </div>
            ))}

            {/* Desktop Spacer - Hidden on Mobile */}
            <div className="hidden md:block flex-shrink-0 w-0 md:w-0"></div>
          </div>
        </div>
      </div>

      {/* Extended Description Area */}
      <div className="w-full bg-white pt-[1rem] pb-[5rem] px-[6%] md:px-[3rem]">
        <div className="max-w-4xl">
          <p className="text-gray-500 leading-relaxed text-justify break-keep mb-[6rem] text-[clamp(0.8125rem,1.2vw,1.125rem)]">
            타인에게 보이는 ‘나’는 껍데기일 뿐이라는 은유로 보이기도 한다. 우리는 껍질_이미지만 보고 그것을 사과라고 부르며 그 껍질을 지탱하고 의미를 부여하는 씨앗과 과즙, 과육은 모든 이미지와 언어가 생성되기 이전_사회가 규정하기 이전_의 가장 원초적인 인간의 본질에 해당한다. 사과 껍질 아래에 단어들을 배치하고 정렬한 행위는 인간이 사회 속에서 어떻게 규정되는지를 보여주며 박제된 껍질은 자아이자 페르소나로서 사과의 내용물을 보호하는 듯하지만 외부의 시선이 닿는 유일한 면이기도 하다. 배열된 사과 껍질과 이를 의미하는 각 단어들을 구성하는 선반, 그리고 분리된 과육, 씨앗, 과즙이 위치한 좌대는 어떻게 본질을 소외시키면서 동시에 구성하는지 상기시킨다.
          </p>
        </div>

        {/* Drawings Section */}
        <section className="mt-[3rem] md:mt-[6rem]">
          <div className="flex items-center gap-4 mb-[2rem] md:mb-[3rem]">
            <h3 className="font-bold uppercase tracking-widest text-black text-[clamp(1.25rem,3vw,1.875rem)]">Drawings</h3>
            <div className="h-px flex-grow bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1rem] md:gap-[1.5rem]">
            {drawingImages.map((src, index) => (
              <div 
                key={index}
                className="group relative aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <OptimizedImage
                  src={src} 
                  alt={`Drawing ${index + 1}`} 
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  imgClassName="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center z-10">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[3rem] text-center pb-[3rem]">
            <p className="text-gray-400 uppercase tracking-[0.3em] text-[clamp(0.625rem,0.8vw,0.75rem)]">
              간극에 대한 해부 언어 사이의 잔여<br/>
              2024-2025
            </p>
          </div>
        </section>

        {/* Updated Collection Inquiry Area */}
        <div className="mt-[5rem] border-t border-gray-100 pt-[4rem] pb-[8rem] text-center">
          <h4 className="font-bold text-black mb-[2rem] uppercase tracking-widest text-[clamp(0.875rem,1.2vw,1rem)]">작품 소장에 관하여</h4>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep whitespace-pre-line text-[clamp(0.75rem,1.5vw,0.9rem)]">
            본 작업은 향후 다른 매체와 새로운 연작으로 확장될 가능성을 지니고 있습니다.
            작품 소장 및 가격 조건은 작가와의 상담을 통해 유연하게 조율 가능하며
            문턱을 낮추고 소통하고자 하오니, 소장 및 예산에 관한 상의는 편하게 연락 주시기 바랍니다.
            <span className="block mt-[1rem] text-black font-medium">( 010-6806-4644 )</span>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox 
          images={drawingImages} 
          initialIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
        />
      )}
    </div>
  );
}
