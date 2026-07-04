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

    type: item?.type ?? item?.tipo_proyecto ?? "",
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

    coverImage: item?.coverImage ?? item?.cover_image ?? null,

    stack: Array.isArray(item?.stack)
      ? item.stack
      : Array.isArray(item?.metadata?.stack)
        ? item.metadata.stack
        : [],

    documentation: normalizeArray(item?.documentation ?? item?.documentacion),
    progress: normalizeArray(item?.progress ?? item?.avances),
    ideas: normalizeArray(item?.ideas),
    resources: normalizeArray(item?.resources ?? item?.adjuntos),

    documentationUrls: Array.isArray(item?.documentationUrls)
      ? item.documentationUrls
      : Array.isArray(item?.documentacion_urls)
        ? item.documentacion_urls
        : [],

    metadata: item?.metadata ?? {},

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
    startDate: item?.startDate ?? item?.fecha_inicio ?? null,
    endDate: item?.endDate ?? item?.fecha_fin ?? null,

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
