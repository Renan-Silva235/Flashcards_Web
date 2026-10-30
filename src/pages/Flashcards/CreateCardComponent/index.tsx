import React, { useState } from "react";
import api from "../../../config/api";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";
import { CardComponent } from "../CardComponent";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/rootReducer";
import { deckRequestAction } from "../../../store/modules/decks/actions";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { CardFormScreen } from "../CardFormScreen";

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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (deckId && user) {
        const response: AxiosResponse = await api.post(
          "/flashcards",
          flashcardPayload,
        );

        if (response) {
          toast.success("Card Criado com sucesso.");
          dispatch(flashcardRequestAction(deckId));
          dispatch(deckRequestAction(user.id));
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
    } finally {
      setIsSaving(false);
    }
  };

  const formData = {
    word,
    translation,
    past,
    present,
    future,
    examplePhrase1: phrase1,
    examplePhrase2: phrase2,
    examplePhrase3: phrase3,
  };

  // Celular/tablet: mesma tela cheia do Editar, com os campos vazios.
  // Depois de criar ela continua aberta e limpa, para cadastrar vários cards seguidos
  if (isMobile)
    return (
      <CardFormScreen
        title="Novo card"
        submitLabel="Criar card"
        data={formData}
        onChange={onChangeField}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSaving={isSaving}
      />
    );

  return (
    <form onSubmit={handleSubmit}>
      <CardComponent
        mode="form"
        data={formData}
        onChange={onChangeField}
        textButton="Criar Card"
        onClose={onClose}
      />
    </form>
  );
};
