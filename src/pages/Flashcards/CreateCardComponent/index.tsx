import React, { useState } from "react";
import api from "../../../config/api";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import { CardComponent } from "../CardComponent";

interface CreateCardComponentProps {
  onClose: () => void;
}

export const CreateCardComponent = ({ onClose }: CreateCardComponentProps) => {
  const [word, setWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [past, setPast] = useState<string>("");
  const [present, setPresent] = useState<string>("");
  const [future, setFuture] = useState<string>("");
  const [phrase1, setPhrase1] = useState<string>("");
  const [phrase2, setPhrase2] = useState<string>("");
  const [phrase3, setPhrase3] = useState<string>("");
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

  const flashcardPayload = {
    deckId: deckId,
    word: word,
    translation: translation,
    past: past,
    present: present,
    future: future,
    examplePhrase1: phrase1,
    examplePhrase2: phrase2,
    examplePhrase3: phrase3,
    difficulty: "EASY",
    status: "LEARNING",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (deckId) {
        const response: AxiosResponse = await api.post(
          "/flashcards",
          flashcardPayload,
        );

        if (response) {
          toast.success("Card Criado com sucesso.");
          dispatch(flashcardRequestAction(deckId));
        }

        setWord("");
        setTranslation("");
        setPast("");
        setPresent("");
        setFuture("");
        setPhrase1("");
        setPhrase2("");
        setPhrase3("");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        error.response?.data.forEach((erro: AxiosError) =>
          toast.error(erro.message),
        );
        return;
      }

      toast.error("erro inesperado.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardComponent
        mode="form"
        data={{
          word,
          translation,
          past,
          present,
          future,
          examplePhrase1: phrase1,
          examplePhrase2: phrase2,
          examplePhrase3: phrase3,
        }}
        onChange={onChangeField}
      />
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex mt-3.5 bg-color-white rounded-lg w-40 
                    justify-center h-11 cursor-pointer items-center hover:brightness-110"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex mt-3.5 bg-color-yellow-1 rounded-lg w-40 
                    justify-center h-11 cursor-pointer items-center hover:brightness-110"
        >
          Criar Card
        </button>
      </div>
    </form>
  );
};
