import { useState } from "react";
import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";
import { CardComponent } from "../CardComponent";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import api from "../../../config/api";

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
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
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
    console.log("PAYLOAD:", dataToUpdatePayload);
    try {
      if (data.id && deckId) {
        const response: AxiosResponse = await api.put(
          `/flashcards/${data.id}`,
          dataToUpdatePayload,
        );
        if (response) {
          toast.success("Card editado com sucesso.");
          dispatch(flashcardRequestAction(deckId));
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
    }
  };

  return (
    <>
      <p className="text-color-white">
        Você pode editar o seu card enquanto visualiza
      </p>
      <form onSubmit={handleSubmit}>
        <CardComponent
          mode="form"
          data={dataToUpdatePayload}
          onChange={onChangeField}
          textButton="Editar"
          onClose={onClose}
        />
        ;
      </form>
    </>
  );
};
