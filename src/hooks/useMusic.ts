"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useMusic(src: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const a = new Audio(src);
    a.loop = true;
    a.volume = 0.5;
    const onErr = () => { setAvailable(false); setPlaying(false); };
    a.addEventListener("error", onErr);
    a.load();
    ref.current = a;
    return () => { a.removeEventListener("error", onErr); a.pause(); ref.current = null; };
  }, [src]);

  const play = useCallback(async () => {
    const a = ref.current;
    if (!a) return;
    try { await a.play(); setPlaying(true); } catch { setPlaying(false); }
  }, []);
  const pause = useCallback(() => { ref.current?.pause(); setPlaying(false); }, []);
  const toggle = useCallback(() => (ref.current && !ref.current.paused ? pause() : play()), [play, pause]);
  const toggleMute = useCallback(() => {
    const a = ref.current; if (!a) return;
    a.muted = !a.muted; setMuted(a.muted);
  }, []);
  const setVolume = useCallback((v: number) => {
    const a = ref.current; if (a) a.volume = v;
    setVolumeState(v);
  }, []);

  return { playing, muted, volume, available, play, toggle, toggleMute, setVolume };
}
