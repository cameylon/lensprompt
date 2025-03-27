// exportPdf.ts — PDF download of prompt
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateScenePrompt } from "./sceneUtils";

export function exportPromptToPDF(sceneData) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("🎬 LensPrompt Scene Export", 14, 22);

  const prompt = generateScenePrompt(sceneData);
  const lines = doc.splitTextToSize(prompt, 180);

  doc.setFontSize(12);
  autoTable(doc, {
    startY: 30,
    head: [["Generated Prompt"]],
    body: lines.map((line) => [line]),
    styles: { fontSize: 10, cellPadding: 2 }
  });

  const filename = sceneData.title ? `Scene - ${sceneData.title}.pdf` : "scene-prompt.pdf";
  doc.save(filename);
}