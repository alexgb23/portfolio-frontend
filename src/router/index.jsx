import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import LaboratorySkeleton from "../pages/laboratory/LaboratorySkeleton";

function lazyWithPreload(importer) {
  const Component = lazy(importer);
  Component.preload = importer;
  return Component;
}

export const Home = lazyWithPreload(() => import("../pages/home/Home"));
export const About = lazyWithPreload(() => import("../pages/about/About"));
export const Projects = lazyWithPreload(
  () => import("../pages/projects/Projects"),
);
export const Automation = lazyWithPreload(
  () => import("../pages/automation/Automation"),
);
export const Infrastructure = lazyWithPreload(
  () => import("../pages/infrastructure/Infrastructure"),
);
export const Contact = lazyWithPreload(
  () => import("../pages/contact/Contact"),
);
export const Laboratory = lazyWithPreload(
  () => import("../pages/laboratory/Laboratory"),
);
export const LaboratoryDetail = lazyWithPreload(
  () => import("../pages/laboratory/LaboratoryDetail"),
);

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="sobre-mi"
          element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="proyectos"
          element={
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
          }
        />

        <Route
          path="automatizacion"
          element={
            <Suspense fallback={null}>
              <Automation />
            </Suspense>
          }
        />

        <Route
          path="infraestructura"
          element={
            <Suspense fallback={null}>
              <Infrastructure />
            </Suspense>
          }
        />

        <Route
          path="contacto"
          element={
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          }
        />

        <Route
          path="laboratorio"
          element={
            <Suspense fallback={<LaboratorySkeleton />}>
              <Laboratory />
            </Suspense>
          }
        />

        <Route
          path="laboratorio/:id"
          element={
            <Suspense fallback={<LaboratorySkeleton />}>
              <LaboratoryDetail />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
