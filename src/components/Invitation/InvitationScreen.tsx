"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { birthday } from "@/data/birthday";
import Confetti from "@/components/Effects/Confetti";

export default function InvitationScreen({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(0);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setBurst(1);
    setTimeout(onOpen, 1900); // music is started by the parent on this user gesture
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-cloud via-blush to-lav px-6 text-center"
      exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.9 }}
    >
      <Confetti fire={burst} count={36} />
      <motion.div
        aria-hidden className="absolute h-64 w-64 rounded-full bg-white blur-3xl"
        initial={{ opacity: 0.3, scale: 0.8 }} animate={opening ? { opacity: 0.95, scale: 5 } : { opacity: 0.4, scale: 1 }} transition={{ duration: 1.6 }}
      />
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="relative font-script text-4xl text-rose sm:text-5xl">
        {birthday.invite.greeting}
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="relative mt-3 max-w-xs text-muted sm:max-w-md">
        {birthday.invite.sub}
      </motion.p>

      <motion.button
        onClick={open} aria-label={birthday.invite.cta}
        className="relative mt-12 h-48 w-72 [perspective:900px]"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.9 }}
        whileHover={opening ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.97 }}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-pink to-purple shadow-glow ${opening ? "" : "floaty"}`}>
          <motion.div className="absolute inset-x-6 bottom-3 top-3 z-10 flex items-center justify-center rounded-xl bg-cloud shadow-md"
            animate={opening ? { y: -90 } : { y: 0 }} transition={{ delay: 0.6, duration: 0.9 }}>
            <span className="font-script text-3xl text-rose">For you ❤️</span>
          </motion.div>
          <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-br from-pink to-lav" style={{ clipPath: "polygon(0 35%, 50% 68%, 100% 35%, 100% 100%, 0 100%)" }} />
          <motion.div
            className="absolute inset-x-0 top-0 h-24 origin-top bg-gradient-to-b from-lav to-pink"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }} transition={{ duration: 0.8 }}
          />
          <span className="absolute left-1/2 top-[52%] z-40 -translate-x-1/2 -translate-y-1/2 text-2xl">{opening ? "" : "💌"}</span>
        </div>
      </motion.button>

      <motion.button
        onClick={open} disabled={opening}
        className="relative mt-14 rounded-full bg-gradient-to-r from-rose to-purple px-8 py-3 font-medium text-white shadow-glow transition disabled:opacity-60"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
      >
        {birthday.invite.cta}
      </motion.button>
    </motion.div>
  );
}
