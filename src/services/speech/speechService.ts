import type { PiperWebEngine } from "piper-tts-web";

// O piper-tts-web tem ~46MB (WASM embutido): só é baixado na primeira vez que
// um áudio em turco é pedido, em vez de pesar no carregamento do app inteiro
let enginePromise: Promise<PiperWebEngine> | null = null;

function getPiperEngine(): Promise<PiperWebEngine> {
  enginePromise ??= import("piper-tts-web")
    .then(
      ({ OnnxWebRuntime, PiperWebEngine, RemoteVoiceProvider }) =>
        new PiperWebEngine({
          voiceProvider: new RemoteVoiceProvider({
            baseUrl: "/piper/models/",
          }),
          onnxRuntime: new OnnxWebRuntime({ numThreads: 1 }),
        }),
    )
    .catch((error) => {
      // Permite tentar de novo (ex.: a rede caiu no meio do download)
      enginePromise = null;
      throw error;
    });
  return enginePromise;
}

const audioContext = new AudioContext();
let currentAudio: AudioBufferSourceNode | null = null;
const GENERATION_TIMEOUT_MS = 30000;

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

  const engine = await getPiperEngine();
  let file: Blob;
  try {
    const generation = engine.generate(text, voice) as Promise<{
      file: Blob;
    }>;
    ({ file } = await Promise.race([
      generation,
      new Promise<never>((_, reject) => {
        setTimeout(
          () =>
            reject(
              new Error(
                "A geração do áudio demorou mais que o esperado. Tente novamente.",
              ),
            ),
          GENERATION_TIMEOUT_MS,
        );
      }),
    ]));
  } catch (error) {
    // Depois de uma falha o motor do Piper pode ficar travado: descarta e
    // cria um novo na próxima tentativa
    engine.destroy();
    enginePromise = null;
    throw error;
  }
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
