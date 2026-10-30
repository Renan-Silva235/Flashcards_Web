import { PiperWebEngine, RemoteVoiceProvider } from "piper-tts-web";

const voiceProvider = new RemoteVoiceProvider({
  baseUrl: "/piper/models/",
});
const engine = new PiperWebEngine({ voiceProvider });
const audioContext = new AudioContext();
let currentAudio: AudioBufferSourceNode | null = null;

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
  // Resume synchronously from the click handler so autoplay policies allow the
  // generated audio to play after Piper finishes processing the text.
  await audioContext.resume();
  currentAudio?.stop();
  currentAudio = null;

  const { file } = (await engine.generate(text, voice)) as { file: Blob };
  const audioData = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(audioData);
  const audio = audioContext.createBufferSource();
  audio.buffer = audioBuffer;
  audio.connect(audioContext.destination);
  currentAudio = audio;
  audio.onended = () => {
    if (currentAudio === audio) currentAudio = null;
  };

  audio.start();
}

export async function speak(text: string, language: string): Promise<void> {
  if (!text) return;

  if (language !== "tr-TR") {
    speakWithBrowserVoice(text, language);
    return;
  }

  await speakWithPiper(text, "tr_TR-dfki-medium");
}
