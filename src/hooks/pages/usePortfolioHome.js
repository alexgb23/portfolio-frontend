import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const initialValue = {
  social_links: [],
  projects: [],
  laboratories: [],
};

function normalizeLaboratories(items) {
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    id: item?.id ?? null,
    title: item?.titulo ?? "",
    slug: item?.slug ?? "",
    category: item?.categoria ?? "",
    status: item?.estado ?? "",
    summary: item?.resumen ?? "",
    relatedAreas: Array.isArray(item?.areas_relacionadas)
      ? item.areas_relacionadas
      : [],
    coverImage: item?.cover_image ?? null,
    documentationCount: Number(item?.documentacion_count) || 0,
    progressCount: Number(item?.avances_count) || 0,
    raw: item,
  }));
}

export default function usePortfolioHome(enabled = true) {
  const { data, loading, error } = useAsyncResource(
    portfolioService.getHomeData,
    initialValue,
    [],
    "Home",
    enabled,
  );

  return {
    socialLinks: Array.isArray(data?.social_links) ? data.social_links : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    laboratories: normalizeLaboratories(data?.laboratories ?? data),
    loading,
    error,
  };
}
