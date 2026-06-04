import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaMoon, FaSun, FaArrowRight, FaBars, FaTimes } from "react-icons/fa";

import "./Navbar.css";

function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Función clave: Cierra el menú al cambiar de sección o pulsar la X
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO OPTIMIZADO: Incluye el avatar para modo móvil */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          {/* Nuevo contenedor oculto en PC que se activa en móvil a la izquierda */}
          <div className="logo-avatar-wrapper">
            <img
              src="/imagen_portfolio_mia_retocada.webp"
              alt="Alex Avatar"
              className="logo-avatar"
            />
          </div>

          {/* Bloque de texto de tu marca */}
          <div className="logo-meta">
            <div className="logo-text">
              ALEX<span className="logo-accent">.SYS</span>
            </div>
            <span className="logo-subtext">PORTFOLIO</span>
          </div>
        </Link>

        {/* Añade la clase 'active' si isOpen es true */}
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink
            to="/sobre-mi"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Sobre mí
          </NavLink>
          <NavLink
            to="/proyectos"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Proyectos
          </NavLink>
          <NavLink
            to="/automatizacion"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Automatización
          </NavLink>
          <NavLink
            to="/infraestructura"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Infraestructura
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Contacto
          </NavLink>
          <NavLink
            to="/admin-login"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Admin
          </NavLink>

          <NavLink
            to="/card-prueba"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            card-prueba
          </NavLink>

        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <NavLink to="/contacto" className="nav-cta">
            Contacto <FaArrowRight />
          </NavLink>

          {/* Botón dinámico: Cambia entre hamburguesa y X para cerrar */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú de navegación"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
