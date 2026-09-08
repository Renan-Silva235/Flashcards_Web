import { Routes, Route } from "react-router-dom";
import { PATHS } from "./Routes";
import { Home } from "../pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
    </Routes>
  );
};
