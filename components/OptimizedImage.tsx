
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
// Updated to support WebP format prioritization
export const getImgurSrcSet = (url: string, format?: 'webp') => {
  if (!url || !url.includes('imgur.com')) return undefined;
  
  const dotIndex = url.lastIndexOf('.');
  if (dotIndex === -1) return undefined;
  
  const base = url.substring(0, dotIndex);
  const originalExt = url.substring(dotIndex);
  // If webp requested, force .webp extension, otherwise use original
  const ext = format === 'webp' ? '.webp' : originalExt;
  
  // Imgur suffixes:
  // m = Medium Thumbnail (320x320)
  // l = Large Thumbnail (640x640)
  // h = Huge Thumbnail (1024x1024)
  // (none) = Original (mapped to 1600w for high-res screens)
  
  return `
    ${base}m${ext} 320w,
    ${base}l${ext} 640w,
    ${base}h${ext} 1024w,
    ${base}${ext} 1600w
  `;
};

// Helper to get tiny thumbnail for blur-up effect (Imgur 't' suffix = 160x160)
const getTinyImgurUrl = (url: string) => {
   if (!url || !url.includes('imgur.com')) return url;
   const dotIndex = url.lastIndexOf('.');
   if (dotIndex === -1) return url;
   const base = url.substring(0, dotIndex);
   const ext = url.substring(dotIndex);
   return `${base}t${ext}`;
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
  
  const originalSrcSet = getImgurSrcSet(src);
  const webpSrcSet = getImgurSrcSet(src, 'webp');
  const tinySrc = getTinyImgurUrl(src);

  return (
    <div 
      className={`relative overflow-hidden bg-gray-100 ${className}`} 
      style={style} 
      onClick={onClick}
    >
      {/* 1. Blur-up Placeholder (Tiny Image) */}
      {/* This loads very fast and provides a blurred preview */}
      {tinySrc && (
        <img
          src={tinySrc}
          alt=""
          aria-hidden="true"
          className={`
            absolute inset-0 w-full h-full object-cover filter blur-xl scale-110
            transition-opacity duration-700
            ${isLoaded ? 'opacity-0' : 'opacity-100'}
          `}
        />
      )}

      {/* 2. Main Picture Element with WebP Support */}
      <picture>
        {/* Prioritize WebP format */}
        {webpSrcSet && <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />}
        
        {/* Fallback to original format */}
        <img
          src={src}
          srcSet={originalSrcSet}
          sizes={sizes}
          alt={alt}
          className={`
            relative z-10
            transition-opacity duration-500 ease-out will-change-opacity
            ${fill ? 'w-full h-full' : ''} 
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${imgClassName}
          `}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          decoding="async"
        />
      </picture>
    </div>
  );
}
