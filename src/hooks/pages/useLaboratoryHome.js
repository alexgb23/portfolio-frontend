import useAsyncResource from "../core/useAsyncResource";
import { laboratoriosRealesService } from "../../services/api";

const initialValue = { data: [] };

function normalizeLaboratoryItems(payload) {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  return source.map((item) => ({
    id: item?.id ?? null,
    title: item?.title ?? item?.titulo ?? "",
    slug: item?.slug ?? "",
    category: item?.category ?? item?.categoria ?? "",
    status: item?.status ?? item?.estado ?? "",
    summary: item?.summary ?? item?.resumen ?? "",
    relatedAreas: Array.isArray(item?.relatedAreas)
      ? item.relatedAreas
      : Array.isArray(item?.areas_relacionadas)
        ? item.areas_relacionadas
        : [],
    coverImage: item?.coverImage ?? item?.cover_image ?? null,
    documentationCount:
      Number(item?.documentationCount ?? item?.documentacion_count) || 0,
    progressCount: Number(item?.progressCount ?? item?.avances_count) || 0,
    is_featured: Boolean(item?.is_featured ?? item?.es_destacado ?? false),
    raw: item,
  }));
}

export default function useLaboratoryHome(enabled = true) {
  const { data, loading, error } = useAsyncResource(
    laboratoriosRealesService.getHome,
    initialValue,
    [],
    "Laboratory home",
    enabled,
  );

  const items = normalizeLaboratoryItems(data);

  const featuredItems = items.filter((item) => item?.is_featured);
  const fallbackItems = items.filter((item) => !item?.is_featured);

  return {
    laboratoryHome: data,
    items,
    featuredItems: featuredItems.length > 0 ? featuredItems : fallbackItems,
    loading,
    error,
  };
}
