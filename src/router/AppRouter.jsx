import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Infrastructure from "./pages/infrastructure/Infrastructure";
import Automation from "./pages/automation/Automation";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import CardPrueba from "./pages/tarjetas de prueba/card_prua";
import Dashboard from "./pages/dashboard/Dashboard";

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
          <Route path="card-prueba" element={<CardPrueba />} />
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
