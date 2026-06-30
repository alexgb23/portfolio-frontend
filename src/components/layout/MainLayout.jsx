import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function MainLayout() {
  const [themeMode, setThemeMode] = useState("system");
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

  const isDarkMode = useMemo(() => {
    if (themeMode === "dark") return true;
    if (themeMode === "light") return false;
    return systemPrefersDark;
  }, [themeMode, systemPrefersDark]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setThemeMode((currentMode) => {
      const currentIsDark =
        currentMode === "system" ? systemPrefersDark : currentMode === "dark";

      return currentIsDark ? "light" : "dark";
    });
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://alex.syskovex.com/#website",
    name: "Portfolio técnico de Alex Galvez",
    url: "https://alex.syskovex.com/",
    inLanguage: "es-ES",
  };

  const safeJsonLd = JSON.stringify(websiteSchema).replace(/<\//g, "<\\/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <Navbar
        isDarkMode={isDarkMode}
        themeMode={themeMode}
        toggleTheme={toggleTheme}
      />

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
