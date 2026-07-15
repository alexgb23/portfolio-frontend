import { useMemo } from "react";
import useAsyncResource from "../core/useAsyncResource";
import { laboratoriosRealesService } from "../../services/api";

const initialValue = {
  stats: {
    active_laboratories: 0,
    technologies_count: 0,
    documents_count: 0,
    projects_count: 0,
  },
  top_technologies: [],
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
    category: item?.categoria ?? "Laboratorio",
    status: item?.estado ?? "",
    summary: item?.resumen ?? "",
    areas_relacionadas: normalizeArray(item?.areas_relacionadas),
    stack: normalizeArray(item?.stack).map((tech) => ({
      label: tech?.label ?? "",
      slug: tech?.slug ?? "",
    })),
    projects_count: Number(item?.projects_count) || 0,
    documentationCount: Number(item?.documentationCount) || 0,
    progressCount: Number(item?.progressCount) || 0,
    ideasCount: Number(item?.ideasCount) || 0,
    is_featured: true,
  }));
}

function normalizeStats(payload) {
  const source = payload?.stats ?? {};
  return {
    active_laboratories: Number(source?.active_laboratories) || 0,
    technologies_count: Number(source?.technologies_count) || 0,
    documents_count: Number(source?.documents_count) || 0,
    projects_count: Number(source?.projects_count) || 0,
  };
}

function getTopTechnologiesFromItems(items = [], limit = 8) {
  const counter = new Map();

  items.forEach((item) => {
    normalizeArray(item?.stack).forEach((tech) => {
      if (!tech?.label) return;
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
  const stats = useMemo(() => normalizeStats(data), [data]);
  const topTechnologies = useMemo(
    () => getTopTechnologiesFromItems(items, 8),
    [items],
  );

  const featuredItems = useMemo(() => items, [items]);

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
