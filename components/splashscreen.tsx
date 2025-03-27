import React, { useEffect, useRef } from "react";

export default function SplashScreen() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <video
        src="/splash-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      />
      <div className="relative z-10 text-white text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-wider">
          🎬 LensPrompt
        </h1>
        <p className="text-sm md:text-lg text-white/70">Craft cinematic prompts with AI</p>
      </div>
      <audio ref={audioRef} src="/orchestral-swell.mp3" preload="auto" />
    </div>
  );
}