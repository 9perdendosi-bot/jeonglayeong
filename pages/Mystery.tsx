
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  src: string;
}

const artworks: Artwork[] = [
  // 2022
  { id: 6, title: "The Wind", year: "2022", medium: "Charcoal, Watercolor", dimensions: "43 x 30.6 cm", src: "https://i.imgur.com/xELinb9.jpeg" },
  
  // 2023
  { id: 2, title: "투명한.", year: "2023", medium: "Charcoal, Watercolor, Mixed media", dimensions: "53 x 46 cm", src: "https://i.imgur.com/wKYn6JC.jpeg" },
  
  // 2024
  { id: 4, title: "제목(미정),(날아다니는 영향 같은 것)", year: "2024", medium: "Pencil, Watercolor", dimensions: "19 x 23.5 cm", src: "https://i.imgur.com/xMjEzb0.jpeg" },
  { id: 3, title: "제목(미정),(영향 또는 눈과 관련된 것)", year: "2024", medium: "Washer, Pencil, Watercolor", dimensions: "27.3 x 22.1 cm", src: "https://i.imgur.com/pWdJDO5.jpeg" },
  
  // 2025
  { id: 9, title: "사과 (위)", year: "2025", medium: "Pencil, Colored pencil, Ballpoint pen, Marker, Watercolor", dimensions: "29.6 x 17.8 cm", src: "https://i.imgur.com/PCplICF.jpeg" },
  { id: 8, title: "사과밭", year: "2025", medium: "Pencil, Colored pencil, Paint marker, Watercolor", dimensions: "29.6 x 17.8 cm", src: "https://i.imgur.com/MydznZR.jpeg" },
  { id: 1, title: "제목(미정)", year: "2025", medium: "Oil on canvas", dimensions: "72.5 x 60.6 cm", src: "https://i.imgur.com/vVNkaMM.jpeg" },
  { id: 5, title: "제목(미정)", year: "2025", medium: "Pencil, Watercolor", dimensions: "38 x 25.6 cm", src: "https://i.imgur.com/yVUAcfX.jpeg" },
  { id: 10, title: "제목(미정)", year: "2025", medium: "Pencil, Colored pencil, Watercolor", dimensions: "19.5 x 11.5 cm", src: "https://i.imgur.com/C7fkaKB.jpeg" },
  { id: 7, title: "제목(미정),(영혼 같은 것)", year: "2025", medium: "Pencil, Colored pencil, Watercolor", dimensions: "19.5 x 29.5 cm", src: "https://i.imgur.com/0k1o8NC.jpeg" },
];

export default function Mystery() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedArtwork]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    setSelectedArtwork(artworks[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setSelectedArtwork(artworks[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-white px-[1.5rem] md:px-[3rem] py-[4rem] w-full max-w-[1800px] mx-auto">
      
      {/* Header (Optional, keeping it minimal as requested) */}
      <div className="mb-12 border-t border-black pt-4 w-[2rem]">
        <h1 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Works</h1>
      </div>

      {/* Masonry Grid Layout using CSS Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-x-[2rem] space-y-[4rem]">
        {artworks.map((art) => (
          <div 
            key={art.id} 
            className="break-inside-avoid mb-[4rem] group cursor-pointer"
            onClick={() => setSelectedArtwork(art)}
          >
            <div className="w-full bg-gray-50 mb-3 overflow-hidden">
               <OptimizedImage 
                 src={art.src} 
                 alt={art.title} 
                 className="w-full h-auto transition-opacity hover:opacity-90"
                 imgClassName="w-full h-auto object-cover block"
                 fill={false}
                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
               />
            </div>
            
            <div className="flex flex-col gap-1 items-start">
              <h3 className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#1a1a1a]">
                {art.title}
              </h3>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-400 tracking-widest">
                {art.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row animate-in fade-in duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedArtwork(null)}
            className="absolute top-4 right-4 z-[110] p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-4 text-gray-300 hover:text-black transition-colors hidden md:block"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-4 text-gray-300 hover:text-black transition-colors hidden md:block"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>

          {/* 1. Left Sidebar: Information (Desktop: Left, Mobile: Bottom) */}
          <div className="
            order-2 md:order-1
            w-full md:w-[30%] lg:w-[25%] 
            h-auto md:h-full 
            p-6 md:p-12 
            flex flex-col justify-start md:justify-end 
            bg-white 
            border-t md:border-t-0 md:border-r border-gray-100
            z-[105]
          ">
            <div className="flex flex-col gap-6 md:gap-8 max-w-md">
              <div>
                <span className="block text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">
                  Title / Year
                </span>
                <p className="text-sm font-medium tracking-wide leading-relaxed break-keep">
                  {selectedArtwork.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">{selectedArtwork.year}</p>
              </div>

              <div>
                <span className="block text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">
                  Details
                </span>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {selectedArtwork.medium}<br/>
                  {selectedArtwork.dimensions}
                </p>
              </div>
            </div>
            
            {/* Mobile Navigation Controls */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 md:hidden">
               <button onClick={handlePrev} className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                 <ChevronLeft size={14}/> 이전
               </button>
               <button onClick={handleNext} className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                 다음 <ChevronRight size={14}/>
               </button>
            </div>
          </div>

          {/* 2. Right Area: Image (Desktop: Right, Mobile: Top) */}
          <div className="
            order-1 md:order-2
            flex-grow 
            h-[50vh] md:h-full 
            relative 
            flex items-center justify-center 
            p-4 md:p-12 
            bg-white
          ">
            <div className="relative w-full h-full max-w-[1200px] flex items-center justify-center">
              <img
                src={selectedArtwork.src}
                alt={selectedArtwork.title}
                className="max-w-full max-h-full object-contain shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
