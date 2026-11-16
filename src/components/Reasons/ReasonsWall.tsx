"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { reasons, reasonsHeading } from "@/data/reasons";
import Section, { Heading } from "@/components/Section";

export default function ReasonsWall() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="reasons">
      <Heading sub="Tap a note to read it">{reasonsHeading}</Heading>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {reasons.map((r, i) => {
          const isOpen = open === i;
          return (
            <motion.button
              key={i} layout aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}
              className={`glass rounded-2xl p-4 text-left transition ${isOpen ? "col-span-2 bg-white/80 shadow-glow" : "hover:-translate-y-1"}`}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
            >
              <div className="flex items-center justify-between text-xs font-semibold text-rose">
                <span>#{i + 1}</span><Heart size={14} fill={isOpen ? "#E98AB6" : "none"} />
              </div>
              <p className="mt-2 font-serif text-lg font-semibold text-plum sm:text-xl">{r.short}</p>
              <AnimatePresence>
                {isOpen && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden text-sm text-muted sm:text-base">
                    {r.full}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
