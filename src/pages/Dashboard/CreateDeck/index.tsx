import { useState } from "react";
import { LanguageDropdown } from "../LanguageDropdown";
import { usePreferredLanguage } from "../../../hooks/usePreferredLanguage";
import api from "../../../config/api";
import axios, { type AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { deckRequestAction } from "../../../store/modules/decks/actions";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/rootReducer";

export const CreateDeckComponent = () => {
  const [preferredLanguage] = usePreferredLanguage();
  // Começa no idioma salvo, mas trocar aqui não altera a preferência do dashboard
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(preferredLanguage);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  // O dono do deck é definido pela API a partir do token de login
  const deckPayload = {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-color-white font-sans tracking-tighter text-center">
          Novo Baralho
        </h1>
        <p className="text-color-silver-2 text-lg sm:text-2xl mt-3 sm:mt-6 text-center">
          Crie a estrutura do seu deck aqui
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center text-center w-full max-w-4xl border border-color-white h-fit 
                      bg-color-silver-1/50 mt-8 sm:mt-16 p-4 sm:p-6 rounded-lg"
        >
          <label htmlFor="deckName" className="text-lg sm:text-2xl">
            Nome do Baralho
          </label>
          <input
            id="deckName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Vocabulário de Viagem"
            className="h-11 w-full sm:w-90 min-w-0 rounded-lg bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white 
                    focus:shadow focus:shadow-color-white/35 autofill:bg-input-bg-main-color text-color-white p-4 outline-none"
          />

          <label htmlFor="deckCategory" className="text-lg sm:text-2xl">
            Categoria
          </label>
          <input
            id="deckCategory"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Verbos, Expressões"
            className="h-11 w-full sm:w-90 min-w-0 rounded-lg bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white 
                    focus:shadow focus:shadow-color-white/35 autofill:bg-input-bg-main-color text-color-white p-4 outline-none"
          />
          {/* No celular o rótulo fica em cima do dropdown */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center mt-4 sm:mt-6">
            <label className="text-lg sm:text-2xl">Idioma do Baralho:</label>
            <LanguageDropdown
              selectedLanguage={selectedLanguage}
              onChange={(language) => setSelectedLanguage(language)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 sm:mt-6 h-11 bg-second-color  text-center text-color-white rounded-lg hover:brightness-110 scale-[0.98]
                            transition-all duration-200 cursor-pointer w-full sm:w-44"
          >
            Criar Baralho
          </button>
        </form>
      </div>
    </div>
  );
};
