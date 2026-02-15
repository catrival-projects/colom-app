'use client';

/**
 * MapIframe Component
 * Pure presentational component for rendering embedded map iframe
 */
export interface MapIframeProps {
  src: string;
  title: string;
  height?: number | string;
  width?: number | string;
  allowFullScreen?: boolean;
}

export function MapIframe({
  src,
  title,
  height = 450,
  width = '100%',
  allowFullScreen = true,
}: MapIframeProps) {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen={allowFullScreen}
    />
  );
}
