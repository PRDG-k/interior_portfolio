import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
}

export const SafeImage = ({ src, fallbackSrc, alt, className, ...props }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Update imgSrc if src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      // If fallback also fails, or no fallback, we can show a placeholder or just let it be broken
      // For now, let's try a generic placeholder if everything fails
      if (imgSrc !== 'https://picsum.photos/seed/error/800/1200') {
        setImgSrc('https://picsum.photos/seed/error/800/1200');
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      // For external images that might block hotlinking
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
