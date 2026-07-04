import useAsyncResource from "../core/useAsyncResource";
import { laboratoriosRealesService } from "../../services/api";

const initialValue = { data: null };

function normalizeLaboratoryDetail(payload) {
  const source =
    payload && typeof payload === "object" && payload.data
      ? payload.data
      : payload;

  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return null;
  }

  return {
    id: source?.id ?? null,
    title: source?.title ?? source?.titulo ?? "",
    slug: source?.slug ?? "",
    category: source?.category ?? source?.categoria ?? "",
    status: source?.status ?? source?.estado ?? "",
    summary: source?.summary ?? source?.resumen ?? "",
    description: source?.description ?? source?.descripcion ?? "",
    objective: source?.objective ?? source?.objetivo ?? "",
    currentResult: source?.currentResult ?? source?.resultado_actual ?? "",
    technicalNotes: source?.technicalNotes ?? source?.notas_tecnicas ?? "",
    relatedAreas: Array.isArray(source?.relatedAreas)
      ? source.relatedAreas
      : Array.isArray(source?.areas_relacionadas)
        ? source.areas_relacionadas
        : [],
    coverImage: source?.coverImage ?? source?.cover_image ?? null,
    galleryUrls: Array.isArray(source?.galleryUrls)
      ? source.galleryUrls
      : Array.isArray(source?.galeria_urls)
        ? source.galeria_urls
        : [],
    documentationUrls: Array.isArray(source?.documentationUrls)
      ? source.documentationUrls
      : Array.isArray(source?.documentacion_urls)
        ? source.documentacion_urls
        : [],
    metadata:
      source?.metadata && typeof source.metadata === "object"
        ? source.metadata
        : {},
    documentationCount:
      Number(source?.documentationCount ?? source?.documentacion_count) || 0,
    progressCount: Number(source?.progressCount ?? source?.avances_count) || 0,
    ideas: Array.isArray(source?.ideas) ? source.ideas : [],
    advances: Array.isArray(source?.advances)
      ? source.advances
      : Array.isArray(source?.avances)
        ? source.avances
        : [],
    attachments: Array.isArray(source?.attachments)
      ? source.attachments
      : Array.isArray(source?.adjuntos)
        ? source.adjuntos
        : [],
    documentation: Array.isArray(source?.documentation)
      ? source.documentation
      : Array.isArray(source?.documentacion)
        ? source.documentacion
        : [],
    raw: source,
  };
}

export default function useLaboratoryDetail(slug, enabled = true) {
  const shouldFetch = enabled && Boolean(slug);

  const { data, loading, error } = useAsyncResource(
    () => laboratoriosRealesService.getDetail(slug),
    initialValue,
    [slug],
    "Laboratory detail",
    shouldFetch,
  );

  const laboratory = normalizeLaboratoryDetail(data);

  return {
    laboratory,
    detail: laboratory,
    loading,
    error,
  };
}
