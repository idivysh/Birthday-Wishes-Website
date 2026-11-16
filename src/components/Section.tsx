"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("relative z-10 mx-auto w-full max-w-5xl px-5 pb-36 pt-20 sm:px-8", className)}>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        {children}
      </motion.div>
    </section>
  );
}

export function Heading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-serif text-3xl font-semibold leading-tight text-plum sm:text-5xl">{children}</h2>
      {sub && <p className="mt-3 text-muted">{sub}</p>}
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent" />
    </div>
  );
}
