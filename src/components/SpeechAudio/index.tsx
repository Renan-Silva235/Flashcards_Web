import { speak } from "../../services/speech/speechService";
import { getLanguageCode } from "../../services/speech/getLanguageCode";
import { IoVolumeMedium } from "react-icons/io5";
import { toast } from "react-toastify";

interface SpeechAudioProps {
  language: string;
  pronounce: string;
  label?: string; // com texto vira um botão em formato de pílula (ex.: "Ouvir Pronúncia")
}

export const SpeechAudio = ({
  language,
  pronounce,
  label,
}: SpeechAudioProps) => {
  const handleSpeak = () => {
    if (!pronounce) return;
    const languageCode = getLanguageCode(language);
    speak(pronounce, languageCode).catch((error) => {
      console.error("Falha ao reproduzir áudio:", error);
      toast.error("Não foi possível reproduzir o áudio. Tente novamente.");
    });
  };

  if (label)
    return (
      <button
        type="button"
        onClick={handleSpeak}
        className="flex items-center gap-2 h-11 px-5 rounded-lg bg-white/15 text-color-white text-base font-medium cursor-pointer active:bg-white/25 transition-colors duration-150"
      >
        <IoVolumeMedium className="text-2xl" />
        {label}
      </button>
    );

  return (
    <button
      type="button"
      aria-label="Ouvir pronúncia"
      onClick={handleSpeak}
      className="text-color-white text-2xl cursor-pointer hover:brightness-125 transition-all duration-150"
    >
      <IoVolumeMedium />
    </button>
  );
};
