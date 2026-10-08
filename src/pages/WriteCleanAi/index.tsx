import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";
import { getApiErrorMessages } from "../../utils/apiError";
import { usePreferredLanguage } from "../../hooks/usePreferredLanguage";
import { getLanguageLabel } from "../../utils/languages";
import { LanguageDropdown } from "../Dashboard/LanguageDropdown";
import { Loading } from "../../components/Loading";
import { EssayResult } from "./EssayResult";
import type { EssayCorrectionResult } from "./types";

const MAX_LENGTH = 2000;

export const WriteCleanAi = () => {
  const [selectedLanguage, setSelectedLanguage] = usePreferredLanguage();
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<EssayCorrectionResult | null>(null);
  const [submittedText, setSubmittedText] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text.trim()) {
      toast.error("Erro: Escreva um texto para corrigir.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const response = await api.post<EssayCorrectionResult>(
        "/api/essays/correct",
        {
          language: selectedLanguage,
          text,
        },
      );

      if (response.data.languageMismatch) {
        toast.error(
          `O texto parece estar em ${response.data.detectedLanguage}, mas o idioma selecionado é ${getLanguageLabel(selectedLanguage)}. Selecione o idioma correto e tente novamente.`,
        );
        return;
      }

      setSubmittedText(text);
      setResult(response.data);
    } catch (error: unknown) {
      getApiErrorMessages(
        error,
        "Erro ao corrigir o texto, tente novamente.",
      ).forEach((message) => toast.error(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full items-start gap-x-3 gap-y-4">
        <div className="w-full sm:flex-1 sm:basis-32 sm:min-w-0">
          <h1
            className="font-black text-4xl font-sans tracking-tight inline-block
                      bg-linear-to-r from-btn-main-color via-color-purple-1 to-second-color
                      bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            WriteClean AI
          </h1>
          <p className="text-color-silver-2 mt-2">
            Escreva com liberdade. A WriteClean AI aponta o que pode melhorar no
            seu texto e sugere como um nativo diria a mesma frase — tudo
            explicado em português, pra te ajudar a evoluir no idioma.
          </p>
        </div>
        <div className="shrink-0">
          <LanguageDropdown
            selectedLanguage={selectedLanguage}
            onChange={(language) => setSelectedLanguage(language)}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-9">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Escreva aqui o seu texto..."
          rows={10}
          className="w-full rounded-lg p-4 border border-transparent outline-none caret-color-white text-white resize-none
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-color-silver-2 text-sm">
            {text.length}/{MAX_LENGTH}
          </span>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-linear-to-r from-btn-main-color to-second-color h-11 px-8 rounded-lg
                      cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Corrigindo..." : "Corrigir"}
          </button>
        </div>
        <p className="text-color-silver-2 text-xs text-center mt-3">
          A WriteClean AI pode cometer erros. Revise as correções antes de
          confiar nelas.
        </p>
      </form>

      {isLoading && (
        <div className="w-full rounded-2xl border border-color-silver-1 bg-[#0d1424] shadow-2xl shadow-black/50 p-10 mt-8 flex items-center justify-center">
          <Loading />
        </div>
      )}

      {!isLoading && result && (
        <EssayResult result={result} originalText={submittedText} />
      )}
    </>
  );
};
