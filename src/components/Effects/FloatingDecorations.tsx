const items = [
  { e: "🦋", l: "6%", t: "14%", d: 0 }, { e: "🌸", l: "88%", t: "22%", d: 1.2 },
  { e: "🦋", l: "84%", t: "60%", d: 2 }, { e: "🌷", l: "8%", t: "70%", d: 0.8 },
  { e: "✨", l: "50%", t: "6%", d: 1.6 },
];
export default function FloatingDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <span key={i} className="floaty absolute text-2xl opacity-60 sm:text-3xl" style={{ left: it.l, top: it.t, animationDelay: `${it.d}s` }}>{it.e}</span>
      ))}
    </div>
  );
}
