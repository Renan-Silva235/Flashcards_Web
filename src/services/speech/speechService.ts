import * as Speech from "expo-speech";

export function speak(text: string, language = "en-US"): void {
  if (!text) return;

  Speech.stop();

  Speech.speak(text, {
    language,
    pitch: 1,
    rate: 0.9,
  });
}
