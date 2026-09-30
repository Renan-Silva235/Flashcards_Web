import { cpSync, existsSync } from "node:fs";
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

console.log("piper-tts-web assets copied to public/");
