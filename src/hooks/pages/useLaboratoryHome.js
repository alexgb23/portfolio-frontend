import { useMemo } from "react";
import useAsyncResource from "../core/useAsyncResource";
import { laboratoriosRealesService } from "../../services/api";

const initialValue = { data: [] };

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

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
    category:
      item?.category ?? item?.categoria ?? item?.tipo_proyecto ?? "Laboratorio",
    area: item?.area ?? item?.area_principal ?? "",
    status: item?.status ?? item?.estado ?? "",
    summary: item?.summary ?? item?.resumen ?? "",
    description: item?.description ?? item?.descripcion ?? "",
    objective: item?.objective ?? item?.objetivo ?? "",
    currentResult: item?.currentResult ?? item?.resultado_actual ?? "",
    technicalNotes: item?.technicalNotes ?? item?.notas_tecnicas ?? "",
    relatedAreas: Array.isArray(item?.relatedAreas)
      ? item.relatedAreas
      : Array.isArray(item?.areas_relacionadas)
        ? item.areas_relacionadas
        : [],
    stack: Array.isArray(item?.stack)
      ? item.stack
      : Array.isArray(item?.metadata?.stack)
        ? item.metadata.stack
        : [],
    docs: normalizeArray(item?.documentation ?? item?.documentacion),
    progress: normalizeArray(item?.progress ?? item?.avances),
    ideas: normalizeArray(item?.ideas),
    resources: normalizeArray(item?.resources ?? item?.adjuntos),
    documentationCount:
      Number(item?.documentationCount ?? item?.documentacion_count) || 0,
    progressCount: Number(item?.progressCount ?? item?.avances_count) || 0,
    ideasCount:
      Number(item?.ideasCount ?? item?.ideas_count) ||
      normalizeArray(item?.ideas).length,
    resourcesCount:
      Number(item?.resourcesCount ?? item?.adjuntos_count) ||
      normalizeArray(item?.resources ?? item?.adjuntos).length,
    updatedAt: item?.updatedAt ?? item?.updated_at ?? null,
    is_featured: Boolean(item?.is_featured ?? item?.es_destacado ?? false),
  }));
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

  const featuredItems = useMemo(() => {
    const featured = items.filter((item) => item.is_featured);
    const fallback = items.filter((item) => !item.is_featured);
    return featured.length > 0 ? featured : fallback;
  }, [items]);

  return {
    laboratoryHome: data,
    items,
    featuredItems,
    loading,
    error,
    isRefreshing,
  };
}
