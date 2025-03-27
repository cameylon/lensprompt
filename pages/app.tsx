import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import SplashScreen from "@/components/SplashScreen";
import {
  generateScenePrompt,
  saveSceneToLocalStorage,
  generateShareableURL
} from "@/utils/sceneUtils";
import { exportPromptToPDF } from "@/utils/exportPdf";
import { exportToNotion } from "@/utils/notionExport";

const genreLevels = ["Fantasy", "Drama", "Sci-Fi", "Noir", "Action"];
const toneLevels = ["Light", "Melancholic", "Tense", "Surreal", "Dark"];
const cameraLevels = ["Static", "Tracking", "Handheld", "Drone", "Cinematic"];
const predefinedTags = ["sci-fi", "dialogue", "emotional", "dreamlike", "noir", "romantic"];

export default function SceneBuilderApp() {
  const router = useRouter();
  const { sceneTitle, mood, context } = router.query;

  const [title, setTitle] = useState("");
  const [tone, setTone] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [genre, setGenre] = useState(50);
  const [toneSlider, setToneSlider] = useState(50);
  const [cameraStyle, setCameraStyle] = useState(50);
  const [notionKey, setNotionKey] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof sceneTitle === "string") setTitle(sceneTitle);
    if (typeof mood === "string") setTone(mood);
    if (typeof context === "string") setDescription(context);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [sceneTitle, mood, context]);

  const sceneData = { title, tone, description, tags, genre, toneSlider, cameraStyle };
  const livePrompt = generateScenePrompt(sceneData);
  const shareURL = generateShareableURL(sceneData);

  const handleCopyLink = async () => {
    const fullURL = `${window.location.origin}${shareURL}`;
    await navigator.clipboard.writeText(fullURL);
    alert("Shareable link copied: " + fullURL);
  };

  const handleExportPDF = () => exportPromptToPDF(sceneData);

  const handleNotionExport = async () => {
    try {
      await exportToNotion(sceneData, notionKey, databaseId);
      alert("✅ Scene exported to Notion!");
    } catch (err) {
      alert("❌ Notion export failed: " + err.message);
    }
  };

  const parsedTags = tags.split(",").map(t => t.trim()).filter(Boolean);
  const addSuggestedTag = (tag) => {
    if (!parsedTags.includes(tag)) {
      setTags(prev => prev ? `${prev}, ${tag}` : tag);
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="min-h-screen bg-black text-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">🎬 Build Your Cinematic Scene</h1>
        <Input placeholder="Scene Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Mood / Context" value={tone} onChange={(e) => setTone(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

        {parsedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {parsedTags.map((tag, i) => (
              <span key={i} className="bg-gray-800 px-2 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {predefinedTags.map(tag => (
            <button
              key={tag}
              className="text-xs bg-gray-800 px-2 py-1 rounded-full border border-gray-700 hover:bg-gray-600"
              onClick={() => addSuggestedTag(tag)}
            >
              + {tag}
            </button>
          ))}
        </div>

        <div>
          <p className="text-sm">🎭 Genre: {genreLevels[Math.floor((genre / 100) * genreLevels.length)]}</p>
          <Slider value={[genre]} onValueChange={([v]) => setGenre(v)} />
        </div>
        <div>
          <p className="text-sm">🎨 Tone: {toneLevels[Math.floor((toneSlider / 100) * toneLevels.length)]}</p>
          <Slider value={[toneSlider]} onValueChange={([v]) => setToneSlider(v)} />
        </div>
        <div>
          <p className="text-sm">📷 Camera Style: {cameraLevels[Math.floor((cameraStyle / 100) * cameraLevels.length)]}</p>
          <Slider value={[cameraStyle]} onValueChange={([v]) => setCameraStyle(v)} />
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Button onClick={() => alert("Prompt Generated:\n" + livePrompt)}>🎞 Generate Prompt</Button>
          <Button onClick={() => saveSceneToLocalStorage(sceneData)} variant="outline">💾 Save</Button>
          <Button onClick={handleCopyLink} variant="ghost">🔗 Copy Link</Button>
          <Button onClick={handleExportPDF} variant="secondary">🖨 PDF</Button>
        </div>

        <div className="pt-6 space-y-2">
          <Input placeholder="Notion API Key" value={notionKey} onChange={(e) => setNotionKey(e.target.value)} />
          <Input placeholder="Database ID" value={databaseId} onChange={(e) => setDatabaseId(e.target.value)} />
          <Button onClick={handleNotionExport}>📤 Export to Notion</Button>
        </div>
      </div>

      <div className="bg-gray-100 text-black p-4 rounded-xl overflow-auto">
        <h2 className="text-xl font-bold mb-2">🪞 Live Preview</h2>
        <pre className="whitespace-pre-wrap text-sm">{livePrompt}</pre>
      </div>
    </div>
  );
}
