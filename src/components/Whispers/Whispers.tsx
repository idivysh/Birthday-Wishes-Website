"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { whispers, whispersIntro } from "@/data/whispers";

export default function Whispers({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const last = i === whispers.length - 1;
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-20 text-center">
      <p className="mb-8 font-script text-3xl text-rose">{whispersIntro}</p>
      <div className="flex min-h-[240px] max-w-md items-center">
        <AnimatePresence mode="wait">
          <motion.p key={i} initial={{ opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.7 }}
            className="font-serif text-2xl leading-relaxed text-plum sm:text-3xl">
            {whispers[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div aria-hidden className="mt-6 flex gap-1.5">
        {whispers.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-rose" : "w-1.5 bg-rose/30"}`} />)}
      </div>
      <button onClick={() => (last ? onDone() : setI(i + 1))}
        className="mt-10 rounded-full bg-gradient-to-r from-rose to-purple px-8 py-3 font-medium text-white shadow-glow transition hover:scale-105">
        {last ? "Read my letter 💌" : "Tap to continue"}
      </button>
    </section>
  );
}
