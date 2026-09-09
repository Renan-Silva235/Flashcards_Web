import validator from "validator";

export const isEmailValidate = (email: string) => {
  return validator.isEmail(email);
};

export const isPasswordValidate = (password: string) => {
  if (password.length < 6)
    return "Senha precisa conter no mínimo 6 caracteres.";
};
