// sceneUtils.ts — core logic for prompts, saving, and share URLs

export function generateScenePrompt({ title, tone, description, tags, genre, toneSlider, cameraStyle }) {
    return `🎬 Scene: ${title}
  🎭 Tone: ${tone}
  📝 Description: ${description}
  📚 Tags: ${tags}
  🎞 Genre Intensity: ${genre}%
  🎨 Mood Saturation: ${toneSlider}%
  📷 Camera Style Index: ${cameraStyle}%
  
  --
  Generated with LensPrompt.`;
  }
  
  export function saveSceneToLocalStorage(sceneData) {
    const saved = JSON.parse(localStorage.getItem("lensPromptScenes") || "[]");
    saved.push(sceneData);
    localStorage.setItem("lensPromptScenes", JSON.stringify(saved));
  }
  
  export function loadSavedScenes() {
    return JSON.parse(localStorage.getItem("lensPromptScenes") || "[]");
  }
  
  export function generateShareableURL(scene) {
    const query = new URLSearchParams({
      sceneTitle: scene.title,
      mood: scene.tone,
      context: scene.description
    });
    return `/app?${query.toString()}`;
  }
  