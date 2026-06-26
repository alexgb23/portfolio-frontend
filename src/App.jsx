import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Automation from "./pages/automation/Automation";
import Infrastructure from "./pages/infrastructure/Infrastructure";
import Contact from "./pages/contact/Contact";
import Laboratory from "./pages/laboratory/Laboratory";
import LaboratoryDetail from "./pages/laboratory/LaboratoryDetail";

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
          <Route path="laboratorio" element={<Laboratory />} />
          <Route path="laboratorio/:id" element={<LaboratoryDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
