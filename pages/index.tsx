import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SplashScreen from "@/components/SplashScreen";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-10">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        🎥 LensPrompt
      </h1>
      <p className="text-gray-400 text-center max-w-xl mb-10">
        AI-powered cinematic scene builder. Craft, customize, and export visual storytelling prompts with sliders, mood tags, and film vibes.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => router.push("/app")} className="text-lg px-6 py-3">
          🎬 Launch Scene Builder
        </Button>
        <Button onClick={() => router.push("/examples")} variant="ghost">
          ✨ View Examples
        </Button>
        <Button onClick={() => router.push("/saved")} variant="outline">
          💾 Saved Scenes
        </Button>
      </div>
    </main>
  );
}
