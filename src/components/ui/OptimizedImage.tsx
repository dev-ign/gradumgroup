import { useState, type ImgHTMLAttributes } from 'react';
import imageManifest from '../../data/optimizedImages.json';
import { imageSizes } from '../../data/imageSizes';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
};

export function OptimizedImage({ src, sizes = imageSizes.hero, onError, ...props }: ImageProps) {
  const [fallback, setFallback] = useState(false);
  const image = imageManifest[src as keyof typeof imageManifest];
  if (!image) return <img src={src} sizes={sizes} onError={onError} {...props} />;

  return (
    <img
      {...props}
      src={fallback ? image.fallback : image.webp[image.webp.length - 1].src}
      srcSet={fallback ? undefined : image.webp.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={sizes}
      width={props.width ?? image.width}
      height={props.height ?? image.height}
      onError={(event) => {
        if (!fallback) setFallback(true);
        onError?.(event);
      }}
    />
  );
}
