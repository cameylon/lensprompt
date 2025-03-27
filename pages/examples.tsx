import React from "react";
import Link from "next/link";
import { generateShareableURL } from "@/utils/sceneUtils";

const examples = [
  {
    title: "Midnight Alley Chase",
    tone: "Dark, high tension",
    description: "A detective weaves through neon-lit alleys as rain pours.",
    tags: "noir, chase, urban",
    genre: 80,
    toneSlider: 90,
    cameraStyle: 60,
  },
  {
    title: "Sunset Farewell",
    tone: "Bittersweet, emotional",
    description: "Two lovers part ways on a beach as the sun dips below the horizon.",
    tags: "romantic, emotional",
    genre: 40,
    toneSlider: 50,
    cameraStyle: 70,
  },
  {
    title: "Dawn of the Synth Rebellion",
    tone: "Epic, futuristic",
    description: "Cyborgs awaken to reclaim control under a blazing neon sky.",
    tags: "sci-fi, rebellion",
    genre: 90,
    toneSlider: 80,
    cameraStyle: 95,
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎞 Prompt Examples</h1>
      <p className="text-gray-400 mb-8">Click any example to launch the builder pre-filled.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((scene, i) => (
          <Link
            key={i}
            href={generateShareableURL(scene)}
            className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg space-y-2"
          >
            <h2 className="text-xl font-semibold">{scene.title}</h2>
            <p className="text-sm text-gray-400">{scene.tone}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{scene.description}</p>
            <div className="text-xs text-white/70 flex flex-wrap gap-2">
              {scene.tags.split(",").map((tag) => (
                <span key={tag} className="px-2 py-1 border border-gray-700 rounded-full">#{tag.trim()}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <Link href="/">
        <p className="mt-10 text-sm text-gray-400 underline">← Back to Home</p>
      </Link>
    </div>
  );
}