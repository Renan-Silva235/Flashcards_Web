import { Routes, Route } from "react-router-dom";
import { PATHS } from "./Routes";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.NEW_DECK} element={<Dashboard />} />
        <Route path={PATHS.STUDY_SESSION} element={<Dashboard />} />
        <Route path={PATHS.STATISTICS} element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
