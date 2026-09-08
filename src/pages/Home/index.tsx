import { useNavigate } from "react-router-dom";
import { MdOutlineTrendingFlat } from "react-icons/md";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center relative justify-center top-28 h-96 m-52">
      <div className="flex-col flex-wrap relative h-full p-8 mr-auto">
        <h1 className="text-color-white font-bold text-6xl mb-6">
          Flash Cards <br />
          <span className="bg-linear-to-r from-btn-main-color to-second-color/55 bg-clip-text text-transparent">
            Language
          </span>
        </h1>
        <p className="text-color-silver-2 mt-2 m-b-2 text-lg">
          Crie seus próprios decks, pratique palavras e acompanhe sua evolução
          em um só lugar.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="border-color-white w-auto h-11 
      bg-linear-to-r from-btn-main-color to-second-color rounded-lg 
      text-color-white cursor-pointer 
      hover:from-second-color hover:to-btn-main-color p-3
        flex gap-2 items-center m-3.5 whitespace-nowrap
      "
        >
          <span className="font-bold">Começar Agora</span>
          <MdOutlineTrendingFlat className="w-6" />
        </button>
      </div>
      <div
        className="flex flex-col flex-1 border border-color-silver-1 h-full m-3.5 mt-9 mb-9 rounded-3xl cursor-pointer items-center 
                      justify-center bg-linear-to-r from-color-silver-1/20 to-main-color
                      shadow-lg hover:shadow-color-silver-2/10 transition-shadow duration-500
                      "
      >
        <p className="text-color-silver-2 font-medium relative right-40 mb-6">
          Seu próximo estudo
        </p>
        <div className="flex flex-col h-60 w-full text-center max-w-md border bg-linear-to-r from-btn-main-color to-second-color/20 rounded-2xl p-4">
          <p className="text-color-white font-medium text-lg mt-2.5">
            INGLÊS • VERBO
          </p>
          <p className="text-color-white font-bold text-4xl m-auto">to learn</p>
          <p className="text-color-white font-medium text-base m-auto">
            clique para revelar a tradução
          </p>
        </div>
      </div>
    </main>
  );
};
