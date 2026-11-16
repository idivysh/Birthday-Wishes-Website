"use client";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { birthday as b } from "@/data/birthday";
import type { useMusic } from "@/hooks/useMusic";

export default function MusicPlayer({ music }: { music: ReturnType<typeof useMusic> }) {
  const { playing, muted, volume, available, toggle, toggleMute, setVolume } = music;
  return (
    <div className="glass fixed right-3 top-3 z-40 flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-xs text-plum">
      <button onClick={toggle} disabled={!available} aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose to-purple text-white disabled:opacity-40">
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      {available ? (
        <>
          <span aria-hidden className="flex h-4 items-end gap-[2px]">
            {[0, 0.3, 0.6].map((d) => <i key={d} className="eq-bar" style={{ animationPlayState: playing ? "running" : "paused", animationDelay: `${d}s` }} />)}
          </span>
          <span className="hidden max-w-[140px] truncate sm:inline">{b.music.title}</span>
          <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          <input type="range" min={0} max={1} step={0.05} value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volume" className="hidden w-16 accent-rose sm:block" />
        </>
      ) : (
        <span title={`Add your audio file at public${b.music.src}`} className="pr-1">Music unavailable 🎵</span>
      )}
    </div>
  );
}
