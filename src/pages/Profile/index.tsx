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
      <div className="flex flex-col w-full h-fit items-center text-center justify-center p-6">
        <span className="text-second-color">
          <CgProfile size={110} />
        </span>
        <h2 className="mt-6 text-color-white text-2xl">{user?.email}</h2>
        <div className="flex flex-col gap-6 w-96 mt-12 ">
          <p className="text-start text-color-silver-2">Sua Conta</p>
          <div className="flex flex-col w-full h-fit bg-color-silver-1 rounded-lg p-6 gap-4">
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
        <div className="flex flex-col gap-6 w-96 mt-12 ">
          <p className="text-start text-color-silver-2">Configurações</p>
          <div className="flex flex-col w-full h-fit bg-color-silver-1 rounded-lg p-6 gap-4">
            <div className="flex justify-between hover:brightness-110 transition-all duration-200 cursor-pointer">
              <div className="flex whitespace-nowrap gap-2">
                <span className="text-second-color">
                  <GiPadlock size={24} />
                </span>
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="w-full h-full rounded-lg text-color-white text-start cursor-pointer"
                >
                  Alterar Senha
                </button>
              </div>
              <p className="text-color-silver-2">{">"}</p>
            </div>
            <div className="w-full border-b border-b-color-silver-2"></div>
            <div className="flex justify-between hover:brightness-110 transition-all duration-200 cursor-pointer">
              <div className="flex whitespace-nowrap gap-2">
                <span className="text-color-red-1">
                  <MdOutlineLogout size={24} />
                </span>
                <button
                  type="button"
                  onClick={() => setConfirmLogout(true)}
                  className="w-full h-full rounded-lg text-color-red-1 text-start cursor-pointer"
                >
                  Sair da Conta
                </button>{" "}
              </div>
              <p className="text-color-silver-2">{">"}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={verifyCode} onClose={() => setVerifyCode(false)}>
        <VerifyCode
          onClose={() => setVerifyCode(false)}
          onSuccess={(code) => {
            setVerifyCode(false);
            setVerifiedCode(code);
          }}
        />
      </Modal>
      <Modal isOpen={!!verifiedCode} onClose={() => setVerifiedCode("")}>
        <ChangePassword
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
