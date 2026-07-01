import { useEffect } from "react";
// Añadimos useLocation y useNavigationType al import de react-router
import { useLocation, useNavigationType } from "react-router";
import AppRouter from "./router";

function App() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Si el usuario vuelve Atrás (POP), NO tocamos el scroll.
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
