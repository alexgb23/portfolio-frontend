import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Infrastructure from "./pages/Infrastructure";
import Automation from "./pages/Automation";
import Contact from "./pages/Contact";

// 1. Importa tus nuevas páginas de administración
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🟢 RUTAS PÚBLICAS: Comparten el diseño de MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre-mi" element={<About />} />
          <Route path="proyectos" element={<Projects />} />
          <Route path="infraestructura" element={<Infrastructure />} />
          <Route path="automatizacion" element={<Automation />} />
          <Route path="contacto" element={<Contact />} />
        </Route>

        {/* 🔴 RUTAS DE ADMINISTRACIÓN: Independientes de MainLayout */}
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* 🔄 REDIRECCIÓN: Si escriben una URL rota, los manda al Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
