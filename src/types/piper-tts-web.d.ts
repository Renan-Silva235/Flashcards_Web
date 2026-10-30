declare module "piper-tts-web" {
  export class OnnxWebRuntime {
    constructor(options?: { basePath?: string; numThreads?: number });

    destroy(): void;
  }

  export class PiperWebEngine {
    constructor(options?: unknown);

    generate(text: string, voice: string, speakerId?: number): Promise<unknown>;

    destroy(): void;
  }

  export class RemoteVoiceProvider {
    constructor(options?: { baseUrl?: string; separator?: string });

    destroy(): void;
  }
}
