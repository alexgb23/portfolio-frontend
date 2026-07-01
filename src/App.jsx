import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import AppRouter from "./router";

function App() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Si el usuario vuelve Atrás (POP), NO tocamos el scroll. El navegador recordará su posición.
    if (navType === "POP") return;

    // Solo va arriba si es un enlace nuevo (PUSH) o un cambio manual de página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, navType]);

  return <AppRouter />;
}

export default App;
