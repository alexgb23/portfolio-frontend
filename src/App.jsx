import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

// 🚀 Carga Perezosa (Lazy Loading) de las páginas
// Se empaquetan por separado y solo se descargan cuando el usuario entra a esa sección
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const Projects = lazy(() => import("./pages/projects/Projects"));
const Automation = lazy(() => import("./pages/automation/Automation"));
const Infrastructure = lazy(() => import("./pages/infrastructure/Infrastructure"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Laboratory = lazy(() => import("./pages/laboratory/Laboratory"));
const LaboratoryDetail = lazy(() => import("./pages/laboratory/LaboratoryDetail"));

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        {/* Tu Layout se mantiene fijo e intacto para heredar los estilos e importar los CSS correspondientes */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Envolvemos las páginas secundarias en un Suspense para gestionar su carga asíncrona */}
          <Route index element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          } />
          
          <Route path="sobre-mi" element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          } />
          
          <Route path="proyectos" element={
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
          } />
          
          <Route path="automatizacion" element={
            <Suspense fallback={null}>
              <Automation />
            </Suspense>
          } />
          
          <Route path="infraestructura" element={
            <Suspense fallback={null}>
              <Infrastructure />
            </Suspense>
          } />
          
          <Route path="contacto" element={
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          } />
          
          <Route path="laboratorio" element={
            <Suspense fallback={null}>
              <Laboratory />
            </Suspense>
          } />
          
          <Route path="laboratorio/:id" element={
            <Suspense fallback={null}>
              <LaboratoryDetail />
            </Suspense>
          } />
          
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
