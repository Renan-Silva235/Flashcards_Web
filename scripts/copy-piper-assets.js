import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, "node_modules", "piper-tts-web", "dist");

if (!existsSync(source)) {
  console.warn("piper-tts-web not found, skipping asset copy");
  process.exit(0);
}

for (const dir of ["onnx", "piper"]) {
  cpSync(path.join(source, dir), path.join(root, "public", dir), {
    recursive: true,
  });
}

const voice = "tr_TR-dfki-medium";
const voiceDirectory = path.join(
  root,
  "public",
  "piper",
  "models",
  "tr",
  "tr_TR",
  "dfki",
  "medium",
);
const voiceBaseUrl =
  "https://huggingface.co/rhasspy/piper-voices/resolve/main/tr/tr_TR/dfki/medium";

mkdirSync(voiceDirectory, { recursive: true });

for (const extension of ["onnx.json", "onnx"]) {
  const filePath = path.join(voiceDirectory, `${voice}.${extension}`);
  const response = await fetch(`${voiceBaseUrl}/${voice}.${extension}`);

  if (!response.ok) {
    throw new Error(
      `Could not download Piper Turkish voice (${response.status} ${response.statusText})`,
    );
  }

  writeFileSync(filePath, Buffer.from(await response.arrayBuffer()));
}

console.log("Piper assets and Turkish voice copied to public/");
