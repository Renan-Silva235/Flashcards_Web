interface VerifyCodeProps {
  onClose: () => void;
}

export const VerifyCode = ({ onClose }: VerifyCodeProps) => {
  return (
    <div className="flex flex-col text-center gap-4 w-full h-fit bg-main-color text-color-white p-6 rounded-lg ">
      <h1 className="text-3xl">Verificar Código</h1>
      <p className="text-base text-color-silver-2">
        Digite o código enviado para o seu e-mail.
      </p>

      <form className="flex flex-col gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Código"
          className="border border-color-white w-full text-center h-11 rounded-lg p-4 outline-none"
        />
        <button className="bg-linear-to-r from-btn-main-color to-second-color h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200">
          Verificar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-transparent h-11 w-full rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
