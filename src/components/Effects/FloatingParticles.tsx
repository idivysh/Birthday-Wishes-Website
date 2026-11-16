// Deterministic positions (no Math.random) so server and client markup match.
export default function FloatingParticles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white shadow-[0_0_12px_#fff]"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, width: 3 + (i % 4) * 2, height: 3 + (i % 4) * 2, animationDelay: `${(i % 7) * 0.6}s` }}
        />
      ))}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-pink/50 blur-3xl" />
      <div className="absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-lav/60 blur-3xl" />
    </div>
  );
}
