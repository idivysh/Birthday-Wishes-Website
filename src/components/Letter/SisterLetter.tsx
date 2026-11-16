"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { letter, letterHeading } from "@/data/letter";
import Section, { Heading } from "@/components/Section";

export default function SisterLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const total = letter.body.length;
  const [n, setN] = useState(0);
  const done = n >= total;

  useEffect(() => {
    if (!inView || done) return;
    const t = setInterval(() => setN((v) => Math.min(total, v + 2)), 28);
    return () => clearInterval(t);
  }, [inView, done, total]);

  return (
    <Section id="letter">
      <Heading>{letterHeading}</Heading>
      <div ref={ref} className="relative mx-auto max-w-2xl rotate-[-0.6deg] rounded-md border border-rose/30 bg-[#FFFBF5] p-2 shadow-[0_20px_60px_rgba(185,154,232,.35)]">
        <div className="rounded-sm border border-dashed border-rose/40 p-6 sm:p-10" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(185,154,232,.15) 32px)" }}>
          <p className="te whitespace-pre-line font-serif text-lg leading-8 text-plum sm:text-xl">
            {letter.body.slice(0, n)}
            {!done && <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-rose">&nbsp;</span>}
          </p>
          {done && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 font-script text-3xl text-rose sm:text-4xl">{letter.signature}</motion.p>
          )}
        </div>
      </div>
      {!done && inView && (
        <div className="mt-5 text-center">
          <button onClick={() => setN(total)} className="text-sm text-muted underline underline-offset-4">Show the whole letter</button>
        </div>
      )}
    </Section>
  );
}
