import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar";

const CvModal = lazy(() => import("../modal/CvModal"));

const THEME_STORAGE_KEY = "syskovex-theme-mode";

function MainLayout() {
  const navbarWrapperRef = useRef(null);

  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === "undefined") return "system";

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
  });

  const [isCvOpen, setIsCvOpen] = useState(false);
  const [cvSocialLinks, setCvSocialLinks] = useState([]);

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignora errores de storage
    }
  }, [themeMode]);

  const isDarkMode =
    themeMode === "dark" || (themeMode === "system" && systemPrefersDark);

  useEffect(() => {
    const resolvedTheme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navbarWrapperRef.current) return;

    const updateNavbarHeight = () => {
      const height = navbarWrapperRef.current?.offsetHeight ?? 82;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`,
      );
    };

    updateNavbarHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateNavbarHeight();
    });

    resizeObserver.observe(navbarWrapperRef.current);
    window.addEventListener("resize", updateNavbarHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

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
      name: "Portfolio técnico de Alex Galvez",
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

      <div ref={navbarWrapperRef}>
        <Navbar
          isDarkMode={isDarkMode}
          themeMode={themeMode}
          toggleTheme={toggleTheme}
          onOpenCv={openCvModal}
        />
      </div>

      <main className="container">
        <Outlet
          context={{
            openCvModal,
            closeCvModal,
            setCvSocialLinks: updateCvSocialLinks,
          }}
        />
      </main>

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