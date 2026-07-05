import { useState } from "react";
import { NavLink, Link } from "react-router";
import { FaMoon, FaSun, FaArrowRight, FaBars, FaTimes } from "react-icons/fa";

import "./Navbar.css";

function Navbar({ isDarkMode, themeMode, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const themeLabel =
    themeMode === "system"
      ? `Tema automático (${isDarkMode ? "oscuro" : "claro"})`
      : `Tema manual ${isDarkMode ? "oscuro" : "claro"}`;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="logo-avatar-wrapper">
            <img
              src="/avatar-nav-72.webp"
              srcSet="/avatar-nav-72.webp 1x, /avatar-nav-144.webp 2x"
              alt="Alex Avatar"
              className="logo-avatar"
              width="36"
              height="36"
              decoding="async"
            />
          </div>

          <div className="logo-meta">
            <div className="logo-text">
              ALEX<span className="logo-accent">.SYS</span>
            </div>
            <span className="logo-subtext">PORTFOLIO</span>
          </div>
        </Link>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/sobre-mi"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Sobre mí
          </NavLink>

          <NavLink
            to="/certificaciones"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
            style={{ display: "none" }}
          >
            Certificaciones
          </NavLink>

          <NavLink
            to="/proyectos"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Proyectos
          </NavLink>

          <NavLink
            to="/laboratorio"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Laboratorio
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `nav-contact-mobile ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            Contacto
          </NavLink>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className={`theme-toggle ${themeMode === "system" ? "is-system" : ""}`}
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Activar modo claro" : "Activar modo oscuro"
            }
            aria-pressed={isDarkMode}
            title={themeLabel}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <NavLink
            to="/contacto"
            className="nav-cta nav-contact-desktop"
            onClick={closeMenu}
          >
            Contacto
            <FaArrowRight />
          </NavLink>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú de navegación"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
