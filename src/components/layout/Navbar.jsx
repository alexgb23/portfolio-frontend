import { NavLink, Link } from "react-router-dom";
import { FaMoon, FaSun, FaArrowRight } from "react-icons/fa";

function Navbar({ isDarkMode, setIsDarkMode }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ALEX<span className="logo-accent">.SYS</span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/sobre-mi"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sobre mí
          </NavLink>
          <NavLink
            to="/proyectos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Proyectos
          </NavLink>
          <NavLink
            to="/automatizacion"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Automatización
          </NavLink>
          <NavLink
            to="/infraestructura"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Infraestructura
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contacto
          </NavLink>
          <NavLink
            to="/admin-login"
            className={({ isActive }) => (isActive ? "active" : "")}
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
