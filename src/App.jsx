import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AboutSkeleton from "./pages/about/AboutSkeleton";
import LaboratorySkeleton from "./pages/laboratory/LaboratorySkeleton";
import ProjectsSkeleton from "./pages/projects/ProjectsSkeleton";
import ContactSkeleton from "./pages/contact/ContactSkeleton";
import HomeSkeleton from "./pages/home/HomeSkeleton";

// 🚀 Carga perezosa (lazy) de las páginas
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
        <Route path="/" element={<MainLayout />}>
          {/* Home con skeleton */}
          <Route
            index
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />

          {/* Sobre mí */}
          <Route
            path="sobre-mi"
            element={
              <Suspense fallback={<AboutSkeleton />}>
                <About />
              </Suspense>
            }
          />

          {/* Proyectos */}
          <Route
            path="proyectos"
            element={
              <Suspense fallback={<ProjectsSkeleton />}>
                <Projects />
              </Suspense>
            }
          />

          {/* Automatización */}
          <Route
            path="automatizacion"
            element={
              <Suspense fallback={null}>
                <Automation />
              </Suspense>
            }
          />

          {/* Infraestructura */}
          <Route
            path="infraestructura"
            element={
              <Suspense fallback={null}>
                <Infrastructure />
              </Suspense>
            }
          />

          {/* Contacto con skeleton */}
          <Route
            path="contacto"
            element={
              <Suspense fallback={<ContactSkeleton />}>
                <Contact />
              </Suspense>
            }
          />

          {/* Laboratorio con skeleton */}
          <Route
            path="laboratorio"
            element={
              <Suspense fallback={<LaboratorySkeleton />}>
                <Laboratory />
              </Suspense>
            }
          />

          {/* Detalle de laboratorio */}
          <Route
            path="laboratorio/:id"
            element={
              <Suspense fallback={null}>
                <LaboratoryDetail />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;