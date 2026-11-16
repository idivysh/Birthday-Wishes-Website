"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { likelyHeading, likelyQuestions, siblingCards, siblingHeading } from "@/data/sibling";
import Section, { Heading } from "@/components/Section";

export default function SiblingZone() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <Section id="sibling">
      <Heading>{siblingHeading}</Heading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siblingCards.map((c, i) => (
          <motion.button
            key={i} onClick={() => setFlipped(flipped === i ? null : i)} aria-pressed={flipped === i}
            className="glass min-h-[120px] rounded-2xl p-5 text-center"
            whileHover={{ rotate: i % 2 ? 1.5 : -1.5, scale: 1.03 }} whileTap={{ scale: 0.96 }}
          >
            <p className="font-serif text-xl font-semibold text-plum">{c.title}</p>
            <AnimatePresence mode="wait">
              <motion.p key={String(flipped === i)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-muted">
                {flipped === i ? c.note : "Tap to read the fine print 👀"}
              </motion.p>
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <h3 className="mb-6 mt-16 text-center font-serif text-2xl font-semibold text-plum sm:text-4xl">{likelyHeading}</h3>
      <div className="mx-auto max-w-2xl space-y-3">
        {likelyQuestions.map((q, i) => (
          <div key={i} className="glass rounded-2xl p-4">
            <button className="flex w-full items-center justify-between gap-3 text-left" aria-expanded={!!revealed[i]} onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}>
              <span className="font-medium text-plum">{q.q}</span>
              <span className="rounded-full bg-rose/15 px-3 py-1 text-xs text-rose">{revealed[i] ? "Hide" : "Reveal"}</span>
            </button>
            <AnimatePresence>
              {revealed[i] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <p className="mt-3 flex items-start gap-2 text-muted">
                    <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }} className="text-2xl">{q.emoji}</motion.span>
                    <span>{q.a}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
