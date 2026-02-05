
import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string; // Applied to the wrapper
  imgClassName?: string; // Applied to the img element
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

// Helper to generate Imgur srcset
export const getImgurSrcSet = (url: string) => {
  if (!url || !url.includes('imgur.com')) return undefined;
  
  const dotIndex = url.lastIndexOf('.');
  if (dotIndex === -1) return undefined;
  
  const base = url.substring(0, dotIndex);
  const ext = url.substring(dotIndex);
  
  // Imgur suffixes:
  // m = Medium Thumbnail (320x320)
  // l = Large Thumbnail (640x640)
  // h = Huge Thumbnail (1024x1024)
  // (none) = Original
  
  return `
    ${base}m${ext} 320w,
    ${base}l${ext} 640w,
    ${base}h${ext} 1024w,
    ${url} 1600w
  `;
};

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw", 
  priority = false,
  fill = true,
  onClick,
  style
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const srcSet = getImgurSrcSet(src);

  return (
    <div 
      className={`relative overflow-hidden bg-gray-100 ${className}`} 
      style={style} 
      onClick={onClick}
    >
      {/* Skeleton / Placeholder */}
      <div 
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} 
      />
      
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`
          transition-opacity duration-700 ease-out will-change-opacity
          ${fill ? 'w-full h-full' : ''} 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${imgClassName}
        `}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        decoding="async"
      />
    </div>
  );
}
