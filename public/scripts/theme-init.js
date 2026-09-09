// /public/theme-init.js
(() => {
  const storageKey = "syskovex-theme-mode";

  try {
    const savedMode = localStorage.getItem(storageKey);
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const resolvedTheme =
      savedMode === "dark"
        ? "dark"
        : savedMode === "light"
          ? "light"
          : systemPrefersDark
            ? "dark"
            : "light";

    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.style.colorScheme = "dark";
  }
})();
