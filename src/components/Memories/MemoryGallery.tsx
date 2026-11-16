"use client";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { memories, memoriesHeading } from "@/data/memories";
import Section, { Heading } from "@/components/Section";
import SafeImage from "./SafeImage";
import PhotoLightbox from "./PhotoLightbox";

const rot = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3.5, 2];

export default function MemoryGallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <Section id="memories">
      <Heading sub="Our little world">{memoriesHeading}</Heading>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
        {memories.map((m, i) => (
          <motion.button
            key={i} onClick={() => setActive(i)} aria-label={`Open photo: ${m.caption}`}
            className="rounded-sm bg-white p-2 pb-3 text-left shadow-[0_10px_30px_rgba(53,34,62,.15)] sm:p-3 sm:pb-4"
            initial={{ opacity: 0, y: 30, rotate: rot[i % rot.length] }} whileInView={{ opacity: 1, y: 0, rotate: rot[i % rot.length] }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 5 }} whileTap={{ scale: 0.97 }}
          >
            <SafeImage src={m.src} alt={m.caption} label={`Add ${m.src.split("/").pop()}`} className="aspect-square w-full" />
            <p className="mt-2 text-center font-script text-base leading-tight text-plum sm:text-xl">{m.caption}</p>
          </motion.button>
        ))}
      </div>
      <PhotoLightbox photos={memories} index={active} onClose={close} onChange={setActive} />
    </Section>
  );
}
