export const Login = () => {
  return (
    <main className="flex flex-col font-sans w-4xl h-fit m-auto justify-center relative top-52 pl-57.5 pr-57.5">
      <h1 className="font-inter text-color-white text-5xl text-center font-extrabold">
        Flash Cards
      </h1>
      <p className="text-center text-color-silver-2 mt-1.5 mb-1.5">
        Aprenda idiomas de forma inteligente
      </p>
      <form action="" className="flex flex-col mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="seu@email.com"
            className="w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color"
          />
        </div>

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          placeholder="********"
          className="w-full h-11 rounded-lg p-2.5 border border-transparent outline-none caret-color-white text-white
                    bg-input-bg-main-color focus:bg-input-bg-main-color focus:border focus:border-color-white focus:shadow focus:shadow-color-white/35
                      autofill:bg-input-bg-main-color"
        />
        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-linear-to-r from-btn-main-color to-second-color text-color-white font-bold 
                    mt-5 hover:brightness-110 active:scale-[0.98] cursor-pointer transition-all duration-300"
        >
          Enviar
        </button>
      </form>
      <div className="flex-col flex-1 items-center text-center mt-5">
        <p className="text-color-silver-2">Não tem conta?</p>
        <button className="mt-5 bg-color-silver-1 w-full h-11 rounded-lg text-color-white font-bold hover:brightness-110 active:scale-50 cursor-pointer transition-all duration-300">
          Criar Conta
        </button>
      </div>
    </main>
  );
};
