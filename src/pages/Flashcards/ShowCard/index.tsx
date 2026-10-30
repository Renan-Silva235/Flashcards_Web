import { useState } from "react";
import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";
import { CardComponent } from "../CardComponent";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import api from "../../../config/api";
import { SpeechAudio } from "../../../components/SpeechAudio";
import { CardFormScreen } from "../CardFormScreen";

interface ShowCardProps {
  data: FlashcardResponseApi;
  onClose: () => void;
}

export const ShowCard = ({ data, onClose }: ShowCardProps) => {
  const [word, setWord] = useState<string>(data.word);
  const [translation, setTranslation] = useState<string>(data.translation);
  const [past, setPast] = useState<string>(data.past);
  const [present, setPresent] = useState<string>(data.present);
  const [future, setFuture] = useState<string>(data.future);
  const [phrase1, setPhrase1] = useState<string>(data.examplePhrase1);
  const [phrase2, setPhrase2] = useState<string>(data.examplePhrase2);
  const [phrase3, setPhrase3] = useState<string>(data.examplePhrase3);
  // Só no celular: começa na visualização e o botão Editar abre a tela de edição
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  const deckLanguage = searchParams.get("deckLanguage") ?? "";
  const dispatch = useDispatch();

  const onChangeField = (field: string, value: string) => {
    if (field === "word") setWord(value);
    if (field === "translation") setTranslation(value);
    if (field === "past") setPast(value);
    if (field === "present") setPresent(value);
    if (field === "future") setFuture(value);
    if (field === "examplePhrase1") setPhrase1(value);
    if (field === "examplePhrase2") setPhrase2(value);
    if (field === "examplePhrase3") setPhrase3(value);
  };

  const dataToUpdatePayload = {
    ...data,
    word,
    translation,
    past,
    present,
    future,
    examplePhrase1: phrase1,
    examplePhrase2: phrase2,
    examplePhrase3: phrase3,
    difficulty: "EASY",
    status: "LEARNING",
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (data.id && deckId) {
        const response: AxiosResponse = await api.put(
          `/flashcards/${data.id}`,
          dataToUpdatePayload,
        );
        if (response) {
          toast.success("Card editado com sucesso.");
          dispatch(flashcardRequestAction(deckId));
          setIsEditing(false);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        error.response?.data.forEach((erro: AxiosError) =>
          toast.error(erro.message),
        );
        return;
      }

      toast.error("Erro inesperado.");
    } finally {
      setIsSaving(false);
    }
  };

  // Cancelar a edição descarta o que foi digitado e volta para a visualização
  const handleCancelEdit = () => {
    setWord(data.word);
    setTranslation(data.translation);
    setPast(data.past);
    setPresent(data.present);
    setFuture(data.future);
    setPhrase1(data.examplePhrase1);
    setPhrase2(data.examplePhrase2);
    setPhrase3(data.examplePhrase3);
    setIsEditing(false);
  };

  const form = (
    <form onSubmit={handleSubmit}>
      <CardComponent
        mode="form"
        data={dataToUpdatePayload}
        onChange={onChangeField}
        textButton="Editar"
        onClose={onClose}
      />
    </form>
  );

  const tenses = [
    { label: "Passado", value: past },
    { label: "Presente", value: present },
    { label: "Futuro", value: future },
  ].filter((tense) => tense.value);
  const phrases = [phrase1, phrase2, phrase3].filter(Boolean);

  return (
    <>
      {/* Celular/tablet: visualização só leitura, com áudio em cada linha */}
      <div className="lg:hidden w-full rounded-2xl border border-color-silver-1 bg-input-bg-main-color p-5 text-color-white">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 break-words text-3xl font-bold">{word}</h2>
          <div className="shrink-0 pt-1">
            <SpeechAudio language={deckLanguage} pronounce={word} />
          </div>
        </div>
        <p className="mt-2 text-color-silver-2 break-words">{translation}</p>

        {tenses.length > 0 && (
          <ul className="mt-5 flex flex-col gap-3">
            {tenses.map((tense) => (
              <li
                key={tense.label}
                className="flex items-center justify-between gap-3"
              >
                <p className="min-w-0 break-words">
                  <span className="text-color-silver-2">{tense.label}:</span>{" "}
                  {tense.value}
                </p>
                <SpeechAudio language={deckLanguage} pronounce={tense.value} />
              </li>
            ))}
          </ul>
        )}

        {phrases.length > 0 && (
          <ul className="mt-5 flex flex-col gap-3">
            {phrases.map((phrase, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3"
              >
                <p className="min-w-0 break-words">
                  <span className="text-color-silver-2">•</span> {phrase}
                </p>
                <SpeechAudio language={deckLanguage} pronounce={phrase} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="h-12 rounded-lg bg-amber-500 font-bold text-color-white cursor-pointer active:brightness-110"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-lg bg-second-color font-bold text-color-white cursor-pointer active:brightness-110"
          >
            Fechar
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <p className="text-color-white">
          Você pode editar o seu card enquanto visualiza
        </p>
        {form}
      </div>

      {isEditing && (
        <CardFormScreen
          title="Editar card"
          submitLabel="Salvar"
          data={dataToUpdatePayload}
          onChange={onChangeField}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
          isSaving={isSaving}
        />
      )}
    </>
  );
};
