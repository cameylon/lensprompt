// notionExport.ts — Push scene to Notion DB

export async function exportToNotion(scene, apiKey, databaseId) {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Title: {
            title: [{ text: { content: scene.title || "Untitled Scene" } }]
          },
          Tone: {
            rich_text: [{ text: { content: scene.tone || "" } }]
          },
          Description: {
            rich_text: [{ text: { content: scene.description || "" } }]
          },
          Tags: {
            multi_select: (scene.tags || "").split(",").map((tag) => ({ name: tag.trim() }))
          }
        }
      })
    });
  
    if (!response.ok) {
      throw new Error(`Notion export failed: ${response.status}`);
    }
  
    return await response.json();
  }
  