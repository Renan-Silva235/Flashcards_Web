import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import "./styles/global.css";
import { Bounce, Slide, ToastContainer, toast, type Id } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();

  // Snackbar no celular: só um aviso por vez, o novo substitui o anterior
  useEffect(() => {
    if (!isMobile) return;
    let lastId: Id | null = null;
    return toast.onChange((item) => {
      if (item.status !== "added") return;
      if (lastId !== null && lastId !== item.id) toast.dismiss(lastId);
      lastId = item.id;
    });
  }, [isMobile]);

  return (
    <>
      <AppRoutes />
      {isMobile ? (
        // Estilo de snackbar (barra fina embaixo) definido no global.css
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          closeButton={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Slide}
        />
      ) : (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      )}
    </>
  );
}

export default App;
