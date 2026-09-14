import React, { useRef, useState } from "react";
import api from "../../../config/api";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { flashcardRequestAction } from "../../../store/modules/flashcards/actions";

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

  //pegar as referências dos inputs
  const wordRef = useRef<HTMLInputElement>(null);
  const translationRef = useRef<HTMLInputElement>(null);
  const pastRef = useRef<HTMLInputElement>(null);
  const presentRef = useRef<HTMLInputElement>(null);
  const futureRef = useRef<HTMLInputElement>(null);
  const phrase1Ref = useRef<HTMLTextAreaElement>(null);
  const phrase2Ref = useRef<HTMLTextAreaElement>(null);
  const phrase3Ref = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement | null>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const element = ref.current;
    if (element && element.scrollWidth > element.clientWidth) {
      return;
    }
    setValue(event.target.value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    ref: React.RefObject<HTMLTextAreaElement | null>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const element = ref.current;
    if (element && element.scrollHeight > element.clientHeight) {
      return;
    }
    setValue(event.target.value);
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
    <form
      onSubmit={handleSubmit}
      className="w-96 mt-7 h-fit border border-color-white rounded-lg bg-linear-to-r from-color-white/10 to-main-color 
      shadow-lg shadow-black/50  cursor-pointer p-6"
    >
      <input
        ref={wordRef}
        type="text"
        value={word}
        placeholder="Palavra"
        onChange={(e) => handleInputChange(e, wordRef, setWord)}
        className="text-center text-color-white text-4xl w-full"
      />
      <input
        ref={translationRef}
        type="text"
        value={translation}
        placeholder="Tradução"
        onChange={(e) => handleInputChange(e, translationRef, setTranslation)}
        className="text-color-white font-normal mt-3 text-center w-full"
      />
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Passado:</p>
        <input
          ref={pastRef}
          type="text"
          value={past}
          onChange={(e) => handleInputChange(e, pastRef, setPast)}
          className="text-color-white text-2xl w-full"
        />
      </div>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Presente:</p>
        <input
          ref={presentRef}
          type="text"
          value={present}
          onChange={(e) => handleInputChange(e, presentRef, setPresent)}
          className="text-color-white text-2xl w-full"
        />
      </div>
      <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
        <p className="text-color-yellow-1 text-2xl">Futuro:</p>
        <input
          ref={futureRef}
          type="text"
          value={future}
          onChange={(e) => handleInputChange(e, futureRef, setFuture)}
          className="text-color-white text-2xl w-full"
        />
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 1</p>
        <textarea
          ref={phrase1Ref}
          value={phrase1}
          tabIndex={-1}
          onChange={(e) => handleTextareaChange(e, phrase1Ref, setPhrase1)}
          className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 2</p>
        <textarea
          ref={phrase2Ref}
          value={phrase2}
          tabIndex={-1}
          onChange={(e) => handleTextareaChange(e, phrase2Ref, setPhrase2)}
          className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
      </div>
      <div className="mt-4 flex flex-col w-full gap-2.5">
        <p className="text-center text-color-yellow-1 text-2xl">Frase 3</p>
        <textarea
          ref={phrase3Ref}
          value={phrase3}
          tabIndex={-1}
          onChange={(e) => handleTextareaChange(e, phrase3Ref, setPhrase3)}
          className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
        />
      </div>
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
