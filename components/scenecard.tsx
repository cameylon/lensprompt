import React from "react";
import Link from "next/link";
import { generateScenePrompt, generateShareableURL } from "@/utils/sceneUtils";

export default function SceneCard({ scene, index, onDelete }) {
  const { title, tone, description, tags } = scene;
  const tagList = (tags || "").split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">{tone}</p>
      <div className="flex flex-wrap gap-1 text-xs">
        {tagList.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-700 text-white px-2 py-1 rounded-full border border-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <pre className="text-xs bg-gray-800 text-gray-300 p-2 rounded mt-2 overflow-auto max-h-48">
        {generateScenePrompt(scene)}
      </pre>
      <div className="flex justify-between items-center pt-2">
        <Link
          href={generateShareableURL(scene)}
          className="text-blue-400 text-xs underline"
        >
          View in Builder
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(index)}
            className="text-red-400 text-xs underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
