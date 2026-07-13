import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar";

/*
  Carga diferida del modal:
  - No se descarga el componente CvModal al inicio.
  - Solo se carga cuando hace falta mostrarlo.
  - Esto mejora un poco el rendimiento inicial.
*/
const CvModal = lazy(() => import("../modal/CvModal"));

function MainLayout() {
  /*
    themeMode:
    - "system" => sigue la preferencia del sistema operativo
    - "light"  => fuerza modo claro
    - "dark"   => fuerza modo oscuro
  */
  const [themeMode, setThemeMode] = useState("system");

  /*
    isCvOpen:
    - true  => la modal del CV está visible
    - false => la modal está cerrada
  */
  const [isCvOpen, setIsCvOpen] = useState(false);

  /*
    cvSocialLinks:
    - guarda los enlaces sociales que quieres mostrar dentro de la modal
    - se rellenan desde páginas hijas usando Outlet context
  */
  const [cvSocialLinks, setCvSocialLinks] = useState([]);

  /*
    systemPrefersDark:
    - lee si el sistema del usuario prefiere tema oscuro
    - solo se evalúa en navegador, no en SSR
  */
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  /*
    Este effect escucha cambios del sistema:
    - si el usuario cambia el tema del sistema operativo
    - tu app se actualiza automáticamente si themeMode === "system"
  */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      setSystemPrefersDark(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  /*
    isDarkMode resuelve el modo final real:
    - si themeMode es "dark", siempre oscuro
    - si themeMode es "light", siempre claro
    - si themeMode es "system", depende del sistema
  */
  const isDarkMode =
    themeMode === "dark" || (themeMode === "system" && systemPrefersDark);

  /*
    Este effect aplica el tema al documento HTML:
    - data-theme="dark" o "light"
    - colorScheme ayuda al navegador con inputs, scrollbars, etc.
  */
  useEffect(() => {
    const resolvedTheme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [isDarkMode]);

  /*
    toggleTheme cambia entre claro y oscuro manualmente.
    Si estabas en "system", primero calcula cuál era el real.
  */
  const toggleTheme = useCallback(() => {
    setThemeMode((currentMode) => {
      const currentIsDark =
        currentMode === "system" ? systemPrefersDark : currentMode === "dark";

      return currentIsDark ? "light" : "dark";
    });
  }, [systemPrefersDark]);

  /*
    openCvModal:
    - abre la modal
    - esta función es la que necesita Navbar para que
      al pulsar "Ver CV" ocurra algo de verdad
  */
  const openCvModal = useCallback(() => {
    setIsCvOpen(true);
  }, []);

  /*
    closeCvModal:
    - cierra la modal
    - se le pasa al componente CvModal
  */
  const closeCvModal = useCallback(() => {
    setIsCvOpen(false);
  }, []);

  /*
    updateCvSocialLinks:
    - permite que una página hija actualice los enlaces sociales
      que luego verá CvModal
    - por eso lo envías por Outlet context
  */
  const updateCvSocialLinks = useCallback((links) => {
    setCvSocialLinks(Array.isArray(links) ? links : []);
  }, []);

  /*
    Datos estructurados SEO del sitio
  */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://alex.syskovex.com/#website",
    name: "Portfolio técnico de Alex Galvez",
    url: "https://alex.syskovex.com/",
    inLanguage: "es-ES",
  };

  /*
    Escape de </script> por seguridad al inyectar JSON-LD
  */
  const safeJsonLd = JSON.stringify(websiteSchema).replace(/<\//g, "<\\/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      {/*
        AQUÍ ESTABA EL FALLO PRINCIPAL:
        Antes no le pasabas onOpenCv al Navbar.
        Entonces Navbar recibía undefined y al clicar "Ver CV"
        no podía abrir la modal.

        Ahora sí:
        - Navbar llama a onOpenCv()
        - onOpenCv ejecuta openCvModal()
        - openCvModal hace setIsCvOpen(true)
        - entonces se renderiza CvModal
      */}
      <Navbar
        isDarkMode={isDarkMode}
        themeMode={themeMode}
        toggleTheme={toggleTheme}
        onOpenCv={openCvModal}
      />

      <main className="container">
        {/*
          Outlet pinta la página hija actual.
          Además le pasas context para que páginas hijas puedan usar:
          - openCvModal
          - closeCvModal
          - setCvSocialLinks

          React Router permite compartir este contexto padre-hijo
          con <Outlet context={...}> y useOutletContext(). 
        */}
        <Outlet
          context={{
            openCvModal,
            closeCvModal,
            setCvSocialLinks: updateCvSocialLinks,
          }}
        />
      </main>

      <Suspense fallback={null}>
        {/*
          La modal solo existe en el DOM cuando isCvOpen === true.
          Eso evita render innecesario.

          Props:
          - isOpen: indica al modal que está abierto
          - onClose: función para cerrarlo
          - socialLinks: enlaces a mostrar en la modal
        */}
        {isCvOpen ? (
          <CvModal
            isOpen={isCvOpen}
            onClose={closeCvModal}
            socialLinks={cvSocialLinks}
          />
        ) : null}
      </Suspense>
    </>
  );
}

export default MainLayout;
