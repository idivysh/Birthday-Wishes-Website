"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { birthday as b } from "@/data/birthday";
import Section from "@/components/Section";
import Confetti from "@/components/Effects/Confetti";

export default function FinalSurprise({ onReplay }: { onReplay: () => void }) {
  const [open, setOpen] = useState(false);
  const [fire, setFire] = useState(0);
  const reveal = () => { if (open) return; setOpen(true); setFire(1); };

  return (
    <Section id="final" className="pb-40">
      <Confetti fire={fire} count={70} fromTop />
      <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-plum sm:text-5xl">{b.final.title}</h2>
      <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button key="gift" onClick={reveal} aria-label="Open the gift" exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className="floaty relative h-40 w-44">
              <div className="absolute bottom-0 h-28 w-full rounded-lg bg-gradient-to-br from-pink to-rose shadow-glow" />
              <div className="absolute bottom-0 left-1/2 h-28 w-6 -translate-x-1/2 bg-lav" />
              <div className="absolute top-3 h-12 w-full rounded-lg bg-gradient-to-br from-lav to-purple" />
              <div className="absolute left-1/2 top-3 h-12 w-6 -translate-x-1/2 bg-pink" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl">🎀</span>
              <span className="absolute -bottom-9 left-0 right-0 text-sm text-muted">{b.final.hint}</span>
            </motion.button>
          ) : (
            <motion.div key="msg" initial={{ opacity: 0, scale: 0.7, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1 }} className="glass relative rounded-3xl p-8 shadow-glow sm:p-12">
              {["💖", "💗", "💕", "💞", "💓"].map((h, i) => (
                <motion.span key={i} aria-hidden className="absolute text-2xl" style={{ left: `${10 + i * 20}%`, bottom: "100%" }}
                  animate={{ y: [0, -50, -90], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}>{h}</motion.span>
              ))}
              <p className="whitespace-pre-line font-serif text-xl leading-relaxed text-plum sm:text-2xl">{b.final.message}</p>
              <p className="te mt-6 text-lg text-rose sm:text-xl">{b.final.telugu}</p>
              <button onClick={onReplay} className="mt-8 rounded-full bg-gradient-to-r from-rose to-purple px-7 py-3 font-medium text-white shadow-glow transition hover:scale-105">
                {b.final.replay}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
