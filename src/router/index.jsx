import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AboutSkeleton from "../pages/about/AboutSkeleton";
import LaboratorySkeleton from "../pages/laboratory/LaboratorySkeleton";
import ProjectsSkeleton from "../pages/projects/ProjectsSkeleton";
import ContactSkeleton from "../pages/contact/ContactSkeleton";
import HomeSkeleton from "../pages/home/HomeSkeleton";

const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const Automation = lazy(() => import("../pages/automation/Automation"));
const Infrastructure = lazy(
  () => import("../pages/infrastructure/Infrastructure"),
);
const Contact = lazy(() => import("../pages/contact/Contact"));
const Laboratory = lazy(() => import("../pages/laboratory/Laboratory"));
const LaboratoryDetail = lazy(
  () => import("../pages/laboratory/LaboratoryDetail"),
);

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="sobre-mi"
          element={
            <Suspense fallback={<AboutSkeleton />}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="proyectos"
          element={
            <Suspense fallback={<ProjectsSkeleton />}>
              <Projects />
            </Suspense>
          }
        />

        <Route
          path="automatizacion"
          element={
            <Suspense fallback={<div>Cargando...</div>}>
              <Automation />
            </Suspense>
          }
        />

        <Route
          path="infraestructura"
          element={
            <Suspense fallback={<div>Cargando...</div>}>
              <Infrastructure />
            </Suspense>
          }
        />

        <Route
          path="contacto"
          element={
            <Suspense fallback={<ContactSkeleton />}>
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
