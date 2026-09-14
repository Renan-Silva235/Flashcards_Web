import { useRef, useState } from "react";

/*
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lastValidValue = useRef<string>(examplePhrase1 || "");
  
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const el = textareaRef.current;
      if (!el) return;
  
      if (el.scrollHeight > el.clientHeight) {
        el.value = lastValidValue.current;
        return;
      }
  
      lastValidValue.current = el.value;

*/
export const CreateCardComponent = () => {
  const [word, setWord] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [past, setPast] = useState<string>("");
  const [present, setPresent] = useState<string>("");
  const [future, setFuture] = useState<string>("");
  const [phrase1, setPhrase1] = useState<string>("");
  const [phrase2, setPhrase2] = useState<string>("");
  const [phrase3, setPhrase3] = useState<string>("");

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

  return (
    <div
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
    </div>
  );
};
