import { useState } from "react";
import { LanguageDropdown } from "../LanguageDropdown";
import api from "../../../config/api";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { deckRequestAction } from "../../../store/modules/decks/actions";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/rootReducer";

export const CreateDeckComponent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const deckPayload = {
    userId: user?.id,
    name: name,
    language: selectedLanguage,
    category: category,
    favorite: false,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (user?.id) {
        const response: AxiosResponse = await api.post("decks", deckPayload);
        if (response.data) {
          toast.success("Deck criado com sucesso");
          dispatch(deckRequestAction(user?.id));
        }
      }

      setName("");
      setCategory("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        error.response?.data.forEach((erro: AxiosError) =>
          toast.error(erro.message),
        );
        return;
      }
      toast.error("Erro inesperado");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-color-white font-sans tracking-tighter">
          Novo Baralho
        </h1>
        <p className="text-color-silver-2 text-2xl mt-6">
          Crie a estrutura do seu deck aqui
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center text-center w-4xl border border-color-white h-fit 
                      bg-color-silver-1/50 mt-16 p-6 rounded-lg"
        >
          <label htmlFor="deckName" className="text-2xl">
            Nome do Baralho
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Vocabulário de Viagem"
            className="h-11 w-90 rounded-lg bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white 
                    focus:shadow focus:shadow-color-white/35 autofill:bg-input-bg-main-color text-color-white p-4 outline-none"
          />

          <label className="text-2xl">Categoria</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Verbos, Expressões"
            className="h-11 w-90 rounded-lg bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white 
                    focus:shadow focus:shadow-color-white/35 autofill:bg-input-bg-main-color text-color-white p-4 outline-none"
          />
          <div className="flex gap-4 items-center mt-6">
            <label htmlFor="deckName" className="text-2xl">
              Idioma do Baralho:
            </label>
            <LanguageDropdown
              selectedLanguage={selectedLanguage}
              onChange={(language) => setSelectedLanguage(language)}
            />
          </div>

          <button
            type="submit"
            className="mt-6 h-11 bg-second-color  text-center text-color-white rounded-lg hover:brightness-110 scale-[0.98]
                            transition-all duration-200 cursor-pointer w-44"
          >
            Criar Baralho
          </button>
        </form>
      </div>
    </div>
  );
};
