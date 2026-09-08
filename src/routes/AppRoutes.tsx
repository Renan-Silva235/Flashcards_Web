import { Routes, Route } from "react-router-dom";
import { PATHS } from "./Routes";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
    </Routes>
  );
};
