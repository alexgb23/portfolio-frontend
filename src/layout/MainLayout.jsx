import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { usePortfolioHome } from "../hooks/usePortfolioData";

const CvModal = lazy(() => import("../modal/CvModal"));

const THEME_STORAGE_KEY = "syskovex-theme-mode";

function getStoredThemeMode() {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (
      savedMode === "light" ||
      savedMode === "dark" ||
      savedMode === "system"
    ) {
      return savedMode;
    }
  } catch {
    return "system";
  }

  return "system";
}

function getSystemPrefersDark() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function MainLayout() {
  const location = useLocation();

  const isProjectDetailRoute = /^\/proyectos\/[^/]+$/.test(location.pathname);

  const [themeMode, setThemeMode] = useState(getStoredThemeMode);
  const [systemPrefersDark, setSystemPrefersDark] =
    useState(getSystemPrefersDark);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [cvSocialLinks, setCvSocialLinks] = useState([]);

  // ÚNICA PETICIÓN DE DATOS DE HOME PARA TODO EL LAYOUT
  const { socialLinks, projects, laboratories, loading, error, isRefreshing } =
    usePortfolioHome();

  const isDarkMode =
    themeMode === "dark" || (themeMode === "system" && systemPrefersDark);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignora errores de localStorage.
    }
  }, [themeMode]);

  useEffect(() => {
    const resolvedTheme = isDarkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode((currentMode) => {
      const currentIsDark =
        currentMode === "system" ? systemPrefersDark : currentMode === "dark";

      return currentIsDark ? "light" : "dark";
    });
  }, [systemPrefersDark]);

  const openCvModal = useCallback(() => {
    setIsCvOpen(true);
  }, []);

  const closeCvModal = useCallback(() => {
    setIsCvOpen(false);
  }, []);

  const updateCvSocialLinks = useCallback((links) => {
    setCvSocialLinks(Array.isArray(links) ? links : []);
  }, []);

  const websiteSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://alex.syskovex.com/#website",
      name: "Portfolio técnico de Alexander Galvez",
      url: "https://alex.syskovex.com/",
      inLanguage: "es-ES",
    }),
    [],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(websiteSchema).replace(/<\//g, "<\\/"),
    [websiteSchema],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      {!isProjectDetailRoute && (
        <Navbar
          isDarkMode={isDarkMode}
          themeMode={themeMode}
          toggleTheme={toggleTheme}
          onOpenCv={openCvModal}
        />
      )}

      <main
        className={
          isProjectDetailRoute
            ? "layout-main layout-main--project-detail"
            : "layout-main"
        }
      >
        <Outlet
          context={{
            openCvModal,
            closeCvModal,
            setCvSocialLinks: updateCvSocialLinks,
            socialLinks,
            projects,
            laboratories,
            loading,
            error,
            isRefreshing,
          }}
        />
      </main>

      <Footer socialLinks={socialLinks} />

      <Suspense fallback={null}>
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
