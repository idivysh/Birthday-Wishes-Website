"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const colors = ["#F7C9DD", "#DCCBFA", "#B99AE8", "#E98AB6", "#FFFFFF", "#FCE4EF"];

/** Increase `fire` (e.g. fire={n+1}) to trigger a burst. */
export default function Confetti({ fire, count = 40, fromTop = false }: { fire: number; count?: number; fromTop?: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (fire > 0) { setShow(true); const t = setTimeout(() => setShow(false), 3800); return () => clearTimeout(t); }
  }, [fire]);
  const pieces = useMemo(
    () => Array.from({ length: count }).map((_, i) => ({
      x: (Math.random() - 0.5) * (fromTop ? 500 : 700), y: fromTop ? 500 + Math.random() * 300 : -(150 + Math.random() * 300),
      r: Math.random() * 720, c: colors[i % colors.length], s: 6 + Math.random() * 8, left: fromTop ? Math.random() * 100 : 50,
      round: i % 3 === 0,
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fire, count, fromTop]
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {show && pieces.map((p, i) => (
          <motion.span
            key={`${fire}-${i}`}
            className="absolute"
            style={{ left: `${p.left}%`, top: fromTop ? "-5%" : "50%", width: p.s, height: p.s, background: p.c, borderRadius: p.round ? "50%" : 2 }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: p.y, opacity: [1, 1, 0], rotate: p.r }}
            transition={{ duration: fromTop ? 3 : 2.2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
