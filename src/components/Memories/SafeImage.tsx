"use client";
import { useState } from "react";

/** Shows the photo, or a pretty placeholder if the file is missing. */
export default function SafeImage({ src, alt, className = "", label }: { src: string; alt: string; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div role="img" aria-label={alt} className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush via-lav to-pink text-center text-muted ${className}`}>
        <span className="text-4xl">💖</span>
        <span className="px-3 text-[11px] leading-tight">{label ?? "Add your photo here"}</span>
      </div>
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
