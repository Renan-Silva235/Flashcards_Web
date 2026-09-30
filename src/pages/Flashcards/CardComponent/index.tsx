import React, { useRef, useState } from "react";
import { Modal } from "../../../components/Modal";
import type { FlashcardResponseApi } from "../../../store/modules/flashcards/interface";
import { ShowCard } from "../ShowCard";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteFlashCard } from "../DeleteFlashcard";
import { SpeechAudio } from "../../../components/SpeechAudio";
import { useSearchParams } from "react-router-dom";

interface CardComponentProps {
  mode: "view" | "form";
  data: FlashcardResponseApi;
  onChange?: (field: keyof FlashcardResponseApi, value: string) => void;
  textButton?: string;
  onClose?: () => void;
}

export const CardComponent = ({
  mode,
  data,
  onChange,
  textButton,
  onClose,
}: CardComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const deckLanguage = searchParams.get("deckLanguage");

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
    field: keyof FlashcardResponseApi,
  ) => {
    const element = ref.current;
    if (element && element.scrollWidth > element.clientWidth) {
      return;
    }
    onChange?.(field, event.target.value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    ref: React.RefObject<HTMLTextAreaElement | null>,
    field: keyof FlashcardResponseApi,
  ) => {
    const element = ref.current;
    if (element && element.scrollHeight > element.clientHeight) {
      return;
    }
    onChange?.(field, event.target.value);
  };

  return (
    <>
      <div
        className={
          mode === "view"
            ? "w-96 mt-7 h-fit border border-color-white rounded-lg bg-linear-to-r from-color-white/10 to-main-color shadow-lg shadow-black/50 transition-transform duration-300 hover:scale-100 hover:-translate-y-2 p-6"
            : "w-96 mt-7 h-fit border border-color-white rounded-lg bg-linear-to-r from-color-white/10 to-main-color shadow-lg shadow-black/50  p-6"
        }
      >
        {mode == "view" ? (
          <button onClick={() => setIsDeleteModalOpen(true)}>
            <MdDeleteOutline className="text-2xl text-color-red-1 cursor-pointer hover:brightness-120 transition-all duration-200" />
          </button>
        ) : (
          ""
        )}

        {mode === "view" ? (
          <>
            <p className="text-center text-color-white text-4xl">
              {data.word}{" "}
              <SpeechAudio
                language={deckLanguage ?? ""}
                pronounce={data.word}
              />
            </p>
          </>
        ) : (
          <>
            {/* <SpeechAudio language={} pronounce={data.word} /> */}
            <input
              ref={wordRef}
              type="text"
              value={data.word}
              placeholder="Palavra"
              onChange={(e) => handleInputChange(e, wordRef, "word")}
              className="text-center text-color-white text-4xl w-full"
            />
          </>
        )}
        {mode === "view" ? (
          <p className="text-color-white gap-3 font-normal m-3 text-center">
            {data.translation}
          </p>
        ) : (
          <input
            ref={translationRef}
            type="text"
            value={data.translation}
            placeholder="Tradução"
            onChange={(e) =>
              handleInputChange(e, translationRef, "translation")
            }
            className="text-color-white font-normal mt-3 text-center w-full"
          />
        )}

        <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
          <p className="text-color-yellow-1 text-2xl">Passado:</p>
          {mode === "view" ? (
            <>
              {data.past ? (
                <p className="text-color-white text-2xl">
                  {data.past}{" "}
                  <SpeechAudio
                    language={deckLanguage ?? ""}
                    pronounce={data.past}
                  />
                </p>
              ) : (
                ""
              )}
            </>
          ) : (
            <input
              ref={pastRef}
              type="text"
              value={data.past}
              onChange={(e) => handleInputChange(e, pastRef, "past")}
              className="text-color-white text-2xl w-full"
            />
          )}
        </div>
        <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
          <p className="text-color-yellow-1 text-2xl">Presente:</p>
          {mode === "view" ? (
            <>
              {data.present ? (
                <p className="text-color-white text-2xl">
                  {data.present}{" "}
                  <SpeechAudio
                    language={deckLanguage ?? ""}
                    pronounce={data.present}
                  />
                </p>
              ) : (
                ""
              )}
            </>
          ) : (
            <input
              ref={presentRef}
              type="text"
              value={data.present}
              onChange={(e) => handleInputChange(e, presentRef, "present")}
              className="text-color-white text-2xl w-full"
            />
          )}
        </div>
        <div className="mt-4 flex w-full gap-2.5 items-center whitespace-nowrap justify-start">
          <p className="text-color-yellow-1 text-2xl">Futuro:</p>
          {mode === "view" ? (
            <>
              {data.future ? (
                <p className="text-color-white text-2xl">
                  {data.future}{" "}
                  <SpeechAudio
                    language={deckLanguage ?? ""}
                    pronounce={data.future}
                  />
                </p>
              ) : (
                ""
              )}
            </>
          ) : (
            <input
              ref={futureRef}
              type="text"
              value={data.future}
              onChange={(e) => handleInputChange(e, futureRef, "future")}
              className="text-color-white text-2xl w-full"
            />
          )}
        </div>
        <div className="mt-4 flex flex-col w-full gap-2.5">
          {mode === "view" ? (
            <>
              <div className="relative flex items-center justify-center w-full min-h-10">
                <p className="text-center text-color-yellow-1 text-2xl">
                  Frase 1
                </p>
                {data.examplePhrase1 ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <SpeechAudio
                      language={deckLanguage ?? ""}
                      pronounce={data.examplePhrase1}
                      position-end
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-color-yellow-1 text-2xl">Frase 1</p>
          )}

          {mode === "view" ? (
            <textarea
              readOnly
              tabIndex={-1}
              defaultValue={data.examplePhrase1}
              className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
            />
          ) : (
            <textarea
              ref={phrase1Ref}
              value={data.examplePhrase1}
              tabIndex={-1}
              onChange={(e) =>
                handleTextareaChange(e, phrase1Ref, "examplePhrase1")
              }
              className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
            />
          )}
        </div>
        <div className="mt-4 flex flex-col w-full gap-2.5">
          {mode === "view" ? (
            <>
              <div className="relative flex items-center justify-center w-full min-h-10">
                <p className="text-center text-color-yellow-1 text-2xl">
                  Frase 2
                </p>
                {data.examplePhrase2 ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <SpeechAudio
                      language={deckLanguage ?? ""}
                      pronounce={data.examplePhrase2}
                      position-end
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-color-yellow-1 text-2xl">Frase 2</p>
          )}

          {mode === "view" ? (
            <textarea
              readOnly
              tabIndex={-1}
              defaultValue={data.examplePhrase2}
              className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
            />
          ) : (
            <textarea
              ref={phrase2Ref}
              value={data.examplePhrase2}
              tabIndex={-1}
              onChange={(e) =>
                handleTextareaChange(e, phrase2Ref, "examplePhrase2")
              }
              className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
            />
          )}
        </div>
        <div className="mt-4 flex flex-col w-full gap-2.5">
          {mode === "view" ? (
            <>
              <div className="relative flex items-center justify-center w-full min-h-10">
                <p className="text-center text-color-yellow-1 text-2xl">
                  Frase 3
                </p>
                {data.examplePhrase3 ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <SpeechAudio
                      language={deckLanguage ?? ""}
                      pronounce={data.examplePhrase3}
                      position-end
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-color-yellow-1 text-2xl">Frase 3</p>
          )}
          {mode === "view" ? (
            <textarea
              readOnly
              tabIndex={-1}
              defaultValue={data.examplePhrase3}
              className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
            />
          ) : (
            <textarea
              ref={phrase3Ref}
              value={data.examplePhrase3}
              tabIndex={-1}
              onChange={(e) =>
                handleTextareaChange(e, phrase3Ref, "examplePhrase3")
              }
              className="w-full h-18 resize-none overflow-hidden rounded-lg border border-color-white p-2.5 text-white outline-none 
                  caret-color-white focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35"
            />
          )}
        </div>
        <div className="mt-4 flex flex-col w-full gap-2.5 items-center">
          {mode === "view" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-color-yellow-1 w-55 h-11 rounded-lg cursor-pointer hover:brightness-110 scale-[0.98] transition-all duration-50"
            >
              Visualizar
            </button>
          ) : (
            <div className="flex w-full mt-3.5 justify-between gap-4 items-center whitespace-nowrap">
              <button
                type="submit"
                className="bg-color-yellow-1 w-40 h-11 rounded-lg cursor-pointer hover:brightness-110 scale-[0.98] transition-all duration-50"
              >
                {textButton}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex  bg-color-white rounded-lg w-40 
              justify-center h-11 cursor-pointer items-center hover:brightness-110"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ShowCard data={data} onClose={() => setIsModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteFlashCard
          onClose={() => setIsDeleteModalOpen(false)}
          flashcardId={data.id}
        />
      </Modal>
    </>
  );
};
