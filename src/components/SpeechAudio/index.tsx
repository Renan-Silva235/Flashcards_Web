import { speak } from "../../services/speech/speechService";
import { getLanguageCode } from "../../services/speech/getLanguageCode";
import { IoVolumeMedium } from "react-icons/io5";

interface SpeechAudioProps {
  language: string;
  pronounce: string;
}

export const SpeechAudio = ({ language, pronounce }: SpeechAudioProps) => {
  const handleSpeak = () => {
    if (!pronounce) return;
    const languageCode = getLanguageCode(language);
    console.log("language code: ", languageCode);
    speak(pronounce, languageCode);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className="text-color-white text-2xl cursor-pointer hover:brightness-125 transition-all duration-150"
    >
      <IoVolumeMedium />
    </button>
  );
};
