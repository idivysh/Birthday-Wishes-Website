"use client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { birthday } from "@/data/birthday";
import { useMusic } from "@/hooks/useMusic";
import InvitationScreen from "@/components/Invitation/InvitationScreen";
import BirthdayHero from "@/components/Hero/BirthdayHero";
import MemoryGallery from "@/components/Memories/MemoryGallery";
import ReasonsWall from "@/components/Reasons/ReasonsWall";
import SiblingZone from "@/components/SiblingZone/SiblingZone";
import Whispers from "@/components/Whispers/Whispers";
import SisterLetter from "@/components/Letter/SisterLetter";
import BirthdayCake from "@/components/BirthdayWish/BirthdayCake";
import FinalSurprise from "@/components/FinalSurprise/FinalSurprise";
import MusicPlayer from "@/components/Music/MusicPlayer";
import FloatingParticles from "@/components/Effects/FloatingParticles";

type Step = { id: string; cta?: string; hideNext?: boolean; render: (next: () => void, replay: () => void) => ReactNode };

// ✏️ Reorder, add or remove screens here. `cta` is the label on the bottom button.
const steps: Step[] = [
  { id: "hero", cta: "Tap to continue ✨", render: () => <BirthdayHero /> },
  { id: "memories", cta: "Next: why you're special 💖", render: () => <MemoryGallery /> },
  { id: "reasons", cta: "Next: our funny side 😜", render: () => <ReasonsWall /> },
  { id: "sibling", cta: "Next: something from my heart 🥹", render: () => <SiblingZone /> },
  { id: "whispers", hideNext: true, render: (next) => <Whispers onDone={next} /> },
  { id: "letter", cta: "Next: make a wish 🎂", render: () => <SisterLetter /> },
  { id: "wish", cta: "One last thing 🎁", render: () => <BirthdayCake /> },
  { id: "final", hideNext: true, render: (_n, replay) => <FinalSurprise onReplay={replay} /> },
];

export default function Page() {
  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const music = useMusic(birthday.music.src);

  // Called from the user's click on the envelope, so browsers allow audio.
  const handleOpen = useCallback(() => { setOpened(true); music.play(); }, [music]);
  const next = useCallback(() => setStep((s) => Math.min(s + 1, steps.length - 1)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const replay = useCallback(() => { setOpened(false); setStep(0); setRun((r) => r + 1); }, []);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [step, opened]);

  const cur = steps[step];
  return (
    <MotionConfig reducedMotion="user">
      <FloatingParticles />
      <AnimatePresence>{!opened && <InvitationScreen key={`inv-${run}`} onOpen={handleOpen} />}</AnimatePresence>
      {opened && (
        <main key={`main-${run}`}>
          <MusicPlayer music={music} />
          <div aria-hidden className="fixed left-3 top-5 z-40 flex gap-1">
            {steps.map((s, i) => <span key={s.id} className={`h-1.5 rounded-full transition-all ${i === step ? "w-5 bg-rose" : i < step ? "w-1.5 bg-rose/60" : "w-1.5 bg-rose/25"}`} />)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={cur.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }}>
              {cur.render(next, replay)}
            </motion.div>
          </AnimatePresence>
          {!cur.hideNext && (
            <div className="fixed inset-x-0 bottom-5 z-40 flex items-center justify-center gap-2 px-4">
              {step > 0 && (
                <button onClick={back} aria-label="Go back" className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-plum"><ArrowLeft size={18} /></button>
              )}
              <button onClick={next} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-purple px-7 py-3.5 text-sm font-medium text-white shadow-glow transition hover:scale-105 sm:text-base">
                {cur.cta ?? "Next"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </main>
      )}
    </MotionConfig>
  );
}
