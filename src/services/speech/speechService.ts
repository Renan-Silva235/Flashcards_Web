import { PiperWebEngine } from "piper-tts-web";

const engine = new PiperWebEngine();

function speakWithBrowserVoice(text: string, language: string): void {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.pitch = 1;
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
}

async function speakWithPiper(text: string, voice: string): Promise<void> {
  const { file } = (await engine.generate(text, voice)) as { file: Blob };

  const audioUrl = URL.createObjectURL(file);
  const audio = new Audio(audioUrl);
  audio.onended = () => URL.revokeObjectURL(audioUrl);
  await audio.play();
}

export async function speak(text: string, language: string): Promise<void> {
  if (!text) return;

  if (language !== "tr-TR") {
    speakWithBrowserVoice(text, language);
    return;
  }

  await speakWithPiper(text, "tr_TR-dfki-medium");
}
