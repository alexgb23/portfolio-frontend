import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaMoon, FaSun, FaArrowRight, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Función clave: Cierra el menú al cambiar de sección o pulsar la X
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          ALEX<span className="logo-accent">.SYS</span>
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
