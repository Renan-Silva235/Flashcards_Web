import { Routes, Route } from "react-router-dom";
import { PATHS } from "./Routes";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoute } from "./PrivateRoute";
import { Flashcards } from "../pages/Flashcards";
import { CreateDeckComponent } from "../pages/Dashboard/CreateDeck";
import { StudySessionPage } from "../pages/StudySessionPage";
import { Profile } from "../pages/Profile";
import { WriteCleanAi } from "../pages/WriteCleanAi";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.REGISTER} element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.NEW_DECK} element={<Dashboard />} />
        <Route path={PATHS.STUDY_SESSION} element={<StudySessionPage />} />
        <Route path={PATHS.STATISTICS} element={<Dashboard />} />
        <Route path={PATHS.FLASHCARDS} element={<Flashcards />} />
        <Route path={PATHS.DECK_CREATE} element={<CreateDeckComponent />} />
        <Route path={PATHS.PROFILE} element={<Profile />} />
        <Route path={PATHS.WRITECLEANAI} element={<WriteCleanAi />} />
      </Route>
    </Routes>
  );
};
