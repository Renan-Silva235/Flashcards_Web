import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";
import { Navigate } from "react-router-dom";
import { PATHS } from "./Routes";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-20 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to={PATHS.LOGIN} replace />
  );
};
