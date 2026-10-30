import { PiperWebEngine, RemoteVoiceProvider } from "piper-tts-web";

const voiceProvider = new RemoteVoiceProvider({
  baseUrl: "/piper/models/",
});
const engine = new PiperWebEngine({ voiceProvider });
let currentAudio: HTMLAudioElement | null = null;

function speakWithBrowserVoice(text: string, language: string): void {
  if (!("speechSynthesis" in window)) {
    throw new Error("Este navegador não oferece suporte a síntese de voz.");
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.pitch = 1;
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
}

async function speakWithPiper(text: string, voice: string): Promise<void> {
  const { file } = (await engine.generate(text, voice)) as { file: Blob };

  currentAudio?.pause();
  if (currentAudio?.src) URL.revokeObjectURL(currentAudio.src);

  const audioUrl = URL.createObjectURL(file);
  const audio = new Audio(audioUrl);
  currentAudio = audio;

  const releaseAudio = () => {
    URL.revokeObjectURL(audioUrl);
    if (currentAudio === audio) currentAudio = null;
  };

  audio.addEventListener("ended", releaseAudio, { once: true });
  audio.addEventListener("error", releaseAudio, { once: true });

  try {
    await audio.play();
  } catch (error) {
    releaseAudio();
    throw new Error("O navegador bloqueou a reprodução do áudio.", {
      cause: error,
    });
  }
}

export async function speak(text: string, language: string): Promise<void> {
  if (!text) return;

  if (language !== "tr-TR") {
    speakWithBrowserVoice(text, language);
    return;
  }

  await speakWithPiper(text, "tr_TR-dfki-medium");
}
