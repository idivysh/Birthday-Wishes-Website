"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import SafeImage from "./SafeImage";

type Photo = { src: string; caption: string };

export default function PhotoLightbox({ photos, index, onClose, onChange }: { photos: Photo[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const n = photos.length;
  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % n);
      if (e.key === "ArrowLeft") onChange((index - 1 + n) % n);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [index, n, onClose, onChange]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div role="dialog" aria-modal aria-label="Photo viewer" className="fixed inset-0 z-[70] flex items-center justify-center bg-plum/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white"><X /></button>
          <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onChange((index - 1 + n) % n); }} className="absolute left-2 z-10 rounded-full bg-white/25 p-2 text-white sm:left-6"><ChevronLeft /></button>
          <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onChange((index + 1) % n); }} className="absolute right-2 z-10 rounded-full bg-white/25 p-2 text-white sm:right-6"><ChevronRight /></button>
          <motion.figure key={index} onClick={(e) => e.stopPropagation()} className="max-w-md rounded-sm bg-white p-3 pb-5 shadow-2xl sm:max-w-xl sm:p-4"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.4 }}>
            <SafeImage src={photos[index].src} alt={photos[index].caption} label={`Add ${photos[index].src.split("/").pop()}`} className="aspect-[4/5] max-h-[65vh] w-full" />
            <figcaption className="mt-3 text-center font-script text-2xl text-plum">{photos[index].caption}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
