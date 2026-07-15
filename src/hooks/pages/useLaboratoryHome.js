import { useMemo } from "react";
import useAsyncResource from "../core/useAsyncResource";
import { laboratoriosRealesService } from "../../services/api";

const initialValue = {
  featured_laboratories: [],
};

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeLaboratoryItems(payload) {
  const source = Array.isArray(payload?.featured_laboratories)
    ? payload.featured_laboratories
    : [];

  return source.map((item) => ({
    id: item?.id ?? null,
    title: item?.titulo ?? "",
    slug: item?.slug ?? "",
    category: item?.categoria ?? "laboratorio",
    status: item?.estado ?? "",
    active: Boolean(item?.activo ?? item?.estado === "activo"),
    summary: item?.resumen ?? "",
    areas_relacionadas: normalizeArray(item?.areas_relacionadas),
    stack: normalizeArray(item?.stack).map((tech) => ({
      label: tech?.label ?? "",
      slug: tech?.slug ?? "",
    })),
    projects_count: Number(item?.projects_count) || 0,
  }));
}

function computeStatsFromItems(items = []) {
  // 1) Laboratorios activos
  const activeLabs = items.filter((lab) => lab.active).length;

  // 2) Proyectos asociados
  const projectsCount = items.reduce(
    (acc, lab) => acc + (lab.projects_count || 0),
    0,
  );

  // 3) Tecnologías utilizadas (únicas por slug)
  const techSlugs = new Set();
  items.forEach((lab) => {
    normalizeArray(lab.stack).forEach((tech) => {
      if (tech.slug) techSlugs.add(tech.slug);
    });
  });
  const technologiesCount = techSlugs.size;

  // 4) Documentos técnicos -> ahora mismo no hay datos: 0
  const documentsCount = 0;

  return {
    active_laboratories: activeLabs,
    projects_count: projectsCount,
    technologies_count: technologiesCount,
    documents_count: documentsCount,
  };
}

function getTopTechnologiesFromItems(items = [], limit = 8) {
  const counter = new Map();

  items.forEach((lab) => {
    normalizeArray(lab.stack).forEach((tech) => {
      if (!tech.label) return;

      const key = tech.slug || tech.label.toLowerCase();

      if (!counter.has(key)) {
        counter.set(key, {
          label: tech.label,
          slug: tech.slug || "",
          count: 0,
        });
      }

      counter.get(key).count += 1;
    });
  });

  return Array.from(counter.values())
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.label.localeCompare(b.label, "es");
    })
    .slice(0, limit);
}

export default function useLaboratoryHome(enabled = true) {
  const { data, loading, error, isRefreshing } = useAsyncResource(
    laboratoriosRealesService.getHome,
    initialValue,
    [],
    "Laboratory home",
    enabled,
  );

  const items = useMemo(() => normalizeLaboratoryItems(data), [data]);

  const featuredItems = useMemo(() => items, [items]);

  const stats = useMemo(() => computeStatsFromItems(items), [items]);

  const topTechnologies = useMemo(
    () => getTopTechnologiesFromItems(items, 8),
    [items],
  );

  return {
    laboratoryHome: data,
    stats,
    items,
    featuredItems,
    topTechnologies,
    loading,
    error,
    isRefreshing,
  };
}
