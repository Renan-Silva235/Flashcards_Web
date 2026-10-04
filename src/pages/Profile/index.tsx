import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios, { type AxiosResponse } from "axios";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import type { RootState } from "../../store/rootReducer";
import api from "../../config/api";
import { VerifyCode } from "../../components/VerifyCode";
import { ChangePassword } from "../../components/ChangePassword";
import { ConfirmLogout } from "../../components/ConfirmLogout";
import { Modal } from "../../components/Modal";
import { toast } from "react-toastify";
interface ProfileData {
  name: string;
  email: string;
  totalDecks: number;
  totalFlashcards: number;
  favoriteDecks: number;
}

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [verifyCode, setVerifyCode] = useState<boolean>(false);
  const [verifiedCode, setVerifiedCode] = useState<string>("");
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);

  const handleSendCode = async () => {
    try {
      await api.post("/auth/password/send-code", {
        email: user?.email,
      });

      toast.success("Código enviado para o seu e-mail.");
      setVerifyCode(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error("Erro ao enviar código de validação, tente novamente.");
      setVerifyCode(false);
      return;
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const response: AxiosResponse = await api.get<ProfileData>(
          `/auth/profile/${user.id}`,
        );
        setProfile(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Erro ao buscar perfil: ",
            error.response?.data?.message,
          );
        }
      }
    };

    fetchProfile();
  }, [user?.id]);

  return (
    <>
      <div className="flex flex-col w-full h-fit items-center text-center justify-center py-2 sm:p-6">
        <span className="text-second-color">
          <CgProfile
            size={110}
            className="w-20 h-20 sm:w-[110px] sm:h-[110px]"
          />
        </span>
        {/* break-all: e-mails longos quebram em vez de estourar a largura */}
        <h2 className="mt-4 sm:mt-6 max-w-full break-all text-color-white text-lg sm:text-2xl">
          {user?.email}
        </h2>
        <div className="flex flex-col gap-3 sm:gap-6 w-full max-w-96 mt-8 sm:mt-12">
          <p className="text-start text-color-silver-2">Sua Conta</p>
          <div className="flex flex-col w-full h-fit bg-color-silver-1 rounded-lg p-4 sm:p-6 gap-4">
            <div className="flex justify-between border-b border-b-color-silver-2 pb-3">
              <p className="text-color-white text-start">Decks</p>
              <p className="text-second-color">{profile?.totalDecks ?? 0}</p>
            </div>
            <div className="flex justify-between border-b border-b-color-silver-2 pb-3">
              <p className="text-color-white text-start">Flashcards</p>
              <p className="text-second-color">
                {profile?.totalFlashcards ?? 0}
              </p>
            </div>
            <div className="flex justify-between border-b border-b-color-silver-2 pb-3">
              <p className="text-color-white text-start">Favoritos</p>
              <p className="text-second-color">{profile?.favoriteDecks ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6 w-full max-w-96 mt-8 sm:mt-12">
          <p className="text-start text-color-silver-2">Configurações</p>
          <div className="flex flex-col w-full h-fit bg-color-silver-1 rounded-lg p-4 sm:p-6 gap-4">
            {/* A linha inteira é o botão: área de toque maior no celular */}
            <button
              type="button"
              onClick={handleSendCode}
              className="flex min-h-11 items-center justify-between gap-2 rounded-lg -mx-2 px-2 w-[calc(100%+1rem)] text-color-white text-start cursor-pointer hover:bg-white/5 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <span className="text-second-color">
                  <GiPadlock size={24} />
                </span>
                Alterar Senha
              </span>
              <span className="text-color-silver-2">{">"}</span>
            </button>
            <div className="w-full border-b border-b-color-silver-2"></div>
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              className="flex min-h-11 items-center justify-between gap-2 rounded-lg -mx-2 px-2 w-[calc(100%+1rem)] text-color-red-1 text-start cursor-pointer hover:bg-white/5 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <MdOutlineLogout size={24} />
                Sair da Conta
              </span>
              <span className="text-color-silver-2">{">"}</span>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={verifyCode} onClose={() => setVerifyCode(false)}>
        <VerifyCode
          email={user?.email ?? ""}
          endpoint="/auth/password/verify-code"
          onClose={() => setVerifyCode(false)}
          onSuccess={(code) => {
            setVerifyCode(false);
            setVerifiedCode(code);
          }}
        />
      </Modal>
      <Modal isOpen={!!verifiedCode} onClose={() => setVerifiedCode("")}>
        <ChangePassword
          email={user?.email ?? ""}
          code={verifiedCode}
          onClose={() => setVerifiedCode("")}
        />
      </Modal>
      <Modal isOpen={confirmLogout} onClose={() => setConfirmLogout(false)}>
        <ConfirmLogout onClose={() => setConfirmLogout(false)} />
      </Modal>
    </>
  );
};
