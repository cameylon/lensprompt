import React, { useEffect, useState } from "react";
import { loadSavedScenes, generateScenePrompt, generateShareableURL } from "@/utils/sceneUtils";
import Link from "next/link";

export default function SavedScenesPage() {
  const [scenes, setScenes] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const saved = loadSavedScenes();
    setScenes(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = scenes.filter((_, i) => i !== index);
    localStorage.setItem("lensPromptScenes", JSON.stringify(updated));
    setScenes(updated);
  };

  const tagCounts = scenes.reduce((acc, scene) => {
    (scene.tags || "").split(",").forEach((t) => {
      const tag = t.trim().toLowerCase();
      if (tag) acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const allTags = Object.keys(tagCounts);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  let filteredScenes = scenes.filter(scene => {
    const sceneTags = (scene.tags || "").split(",").map(t => t.trim().toLowerCase());
    const matchTags = activeTags.length === 0 || activeTags.every(tag => sceneTags.includes(tag));
    const matchSearch = searchTerm.trim() === "" || (
      scene.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scene.tone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scene.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchTags && matchSearch;
  });

  if (sortBy === "title") {
    filteredScenes.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredScenes = filteredScenes.reverse();
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">💾 Saved Cinematic Scenes</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title, mood, or tag..."
          className="w-full md:w-1/2 p-2 text-sm rounded bg-gray-900 border border-gray-700 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 text-sm rounded bg-gray-900 border border-gray-700 text-white"
        >
          <option value="recent">Sort by Recent</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border text-sm flex items-center gap-2 ${activeTags.includes(tag) ? "bg-white text-black" : "bg-gray-800 text-white border-gray-600"}`}
            >
              <span>#{tag} ({tagCounts[tag]})</span>
              {activeTags.includes(tag) && <span className="text-red-500">✕</span>}
            </button>
          ))}
        </div>
      )}

      {filteredScenes.length === 0 ? (
        <p className="text-gray-400">No matching scenes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenes.map((scene, idx) => (
            <div key={idx} className="bg-gray-900 p-4 rounded-xl shadow-lg space-y-2">
              <h2 className="text-xl font-semibold">{scene.title}</h2>
              <p className="text-sm text-gray-400">{scene.tone}</p>
              <div className="flex flex-wrap gap-1 text-xs">
                {(scene.tags || "").split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-white px-2 py-1 rounded-full border border-gray-600"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
              <pre className="text-xs bg-gray-800 text-gray-300 p-2 rounded mt-2 overflow-auto max-h-48">
                {generateScenePrompt(scene)}
              </pre>
              <div className="flex justify-between items-center pt-2">
                <Link href={generateShareableURL(scene)} className="text-blue-400 text-xs underline">
                  View in Builder
                </Link>
                <button onClick={() => handleDelete(idx)} className="text-red-400 text-xs underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/app">
        <p className="mt-10 text-sm text-gray-400 underline">← Back to Scene Builder</p>
      </Link>
    </div>
  );
}
