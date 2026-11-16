"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { birthday as b } from "@/data/birthday";
import Section, { Heading } from "@/components/Section";
import Confetti from "@/components/Effects/Confetti";

export default function BirthdayCake() {
  const [out, setOut] = useState(false);
  const [fire, setFire] = useState(0);
  const candles = Array.from({ length: b.age });
  const wish = () => { setOut(true); setFire((f) => f + 1); };

  return (
    <Section id="wishes">
      <Heading>{b.wish.title}</Heading>
      <Confetti fire={fire} count={60} />
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div role="img" aria-label={`Birthday cake with ${b.age} candles`} className="relative">
          <div className="mb-[-2px] flex max-w-[300px] flex-wrap justify-center gap-x-1.5 gap-y-3 px-2">
            {candles.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  className="h-3.5 w-2.5 rounded-full bg-gradient-to-t from-orange-300 to-yellow-100 shadow-[0_0_10px_#FFE08A]"
                  animate={out ? { opacity: 0, scale: 0, y: -8 } : { opacity: 1, y: 0, scale: [1, 1.15, 0.95, 1] }}
                  transition={out ? { delay: i * 0.05, duration: 0.4 } : { duration: 1 + (i % 3) * 0.2, repeat: Infinity }}
                />
                <div className={`h-6 w-1.5 rounded-sm ${i % 2 ? "bg-lav" : "bg-pink"}`} />
              </div>
            ))}
          </div>
          <div className="mx-auto h-14 w-64 rounded-t-2xl bg-gradient-to-b from-white to-blush shadow-md sm:w-72" />
          <div className="mx-auto h-16 w-72 rounded-b-2xl bg-gradient-to-b from-pink to-rose shadow-glow sm:w-80">
            <div className="h-3 w-full rounded-t-2xl bg-white/60" />
          </div>
          <div className="mx-auto mt-1 h-3 w-80 max-w-full rounded-full bg-lav/70 sm:w-96" />
        </div>

        {!out ? (
          <motion.button onClick={wish} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="mt-10 rounded-full bg-gradient-to-r from-rose to-purple px-8 py-3 font-medium text-white shadow-glow">
            {b.wish.button}
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="mt-10 text-center">
            <p className="font-serif text-2xl text-plum sm:text-3xl">{b.wish.message}</p>
            <p className="te mt-4 text-lg text-rose sm:text-xl">{b.wish.telugu}</p>
            <button onClick={() => setOut(false)} className="mt-5 text-sm text-muted underline underline-offset-4">Relight the candles</button>
          </motion.div>
        )}
      </div>
    </Section>
  );
}
