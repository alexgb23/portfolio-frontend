import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Automation from "./pages/automation/Automation";
import Infrastructure from "./pages/infrastructure/Infrastructure";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import CardPrueba from "./pages/tarjetas_de_prueba/card_prua";
import Dashboard from "./pages/dashboard/Dashboard";
import Laboratory from "./pages/laboratory/Laboratory";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre-mi" element={<About />} />
          <Route path="proyectos" element={<Projects />} />
          <Route path="automatizacion" element={<Automation />} />
          <Route path="infraestructura" element={<Infrastructure />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="card-prueba" element={<CardPrueba />} />
          <Route path="laboratorio" element={<Laboratory />} />
        </Route>

        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
