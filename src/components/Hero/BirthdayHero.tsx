"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { birthday as b } from "@/data/birthday";
import Confetti from "@/components/Effects/Confetti";
import FloatingDecorations from "@/components/Effects/FloatingDecorations";
import SafeImage from "@/components/Memories/SafeImage";

const balloons = [
  { l: "5%", c: "from-pink to-rose", d: 0 }, { l: "15%", c: "from-lav to-purple", d: 1 },
  { l: "80%", c: "from-lav to-purple", d: 0.5 }, { l: "91%", c: "from-pink to-rose", d: 1.5 },
];

export default function BirthdayHero() {
  const [fire, setFire] = useState(0);
  useEffect(() => { const t = setTimeout(() => setFire(1), 400); return () => clearTimeout(t); }, []);
  const stagger = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 + i * 0.25, duration: 0.9 } });

  return (
    <section id="home" className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-32 pt-20 text-center">
      <Confetti fire={fire} count={50} fromTop />
      <FloatingDecorations />
      {balloons.map((bl, i) => (
        <div key={i} aria-hidden className="floaty absolute bottom-[8%] hidden sm:block" style={{ left: bl.l, animationDelay: `${bl.d}s` }}>
          <div className={`h-20 w-16 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br ${bl.c} opacity-80 shadow-glow`} />
          <div className="mx-auto h-16 w-px bg-rose/50" />
        </div>
      ))}
      <motion.div {...stagger(0)} className="mb-6 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-glow sm:h-36 sm:w-36">
        <SafeImage src={b.heroImage} alt={b.name} label={b.name[0]} className="h-full w-full" />
      </motion.div>
      <motion.p {...stagger(1)} className="font-serif text-lg tracking-[0.25em] text-purple sm:text-2xl">{b.hero.kicker}</motion.p>
      <motion.h1 {...stagger(2)} className="mt-2 bg-gradient-to-r from-rose via-purple to-rose bg-clip-text font-serif text-5xl font-bold tracking-wider text-transparent sm:text-8xl">
        {b.name.toUpperCase()}
      </motion.h1>
      <motion.div {...stagger(3)} className="relative my-6">
        <motion.span animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }} className="block font-serif text-8xl font-bold text-plum/90 sm:text-9xl [text-shadow:0_0_40px_#F7C9DD]">{b.age}</motion.span>
      </motion.div>
      <motion.p {...stagger(4)} className="font-script text-2xl text-rose sm:text-3xl">{b.hero.line}</motion.p>
      <motion.p {...stagger(5)} className="mt-4 max-w-md text-muted sm:text-lg">{b.hero.emotional}</motion.p>
      <motion.p {...stagger(6)} className="te mt-5 text-xl text-plum sm:text-2xl">{b.hero.telugu}</motion.p>
      <motion.p {...stagger(8)} className="mt-8 text-sm text-muted">{b.hero.scroll}</motion.p>
    </section>
  );
}
