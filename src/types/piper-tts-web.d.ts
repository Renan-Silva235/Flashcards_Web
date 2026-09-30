declare module "piper-tts-web" {
  export class PiperWebEngine {
    constructor(options?: unknown);

    generate(text: string, voice: string, speakerId?: number): Promise<unknown>;

    destroy(): void;
  }
}
