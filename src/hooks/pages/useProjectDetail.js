import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const portfolioAsyncOptions = {
  /*
   * Si Render está suspendido al abrir un proyecto, seguirá intentando
   * recuperar la respuesta sin declarar un error final de inmediato.
   */
  retryOnError: true,

  /*
   * Conserva el último detalle válido para ese slug en memoria,
   * sessionStorage y localStorage mientras llega una actualización.
   */
  persistCache: true,

  /*
   * Actualiza el detalle cada minuto mientras el usuario está en la página.
   */
  refreshInterval: 60_000,
};

export default function useProjectDetail(slug) {
  const { data, loading, error, isRefreshing, isRetrying } = useAsyncResource(
    () => portfolioService.getProjectDetail(slug),
    null,
    [slug],
    "Project detail",
    Boolean(slug),
    portfolioAsyncOptions,
  );

  return {
    project: data ?? null,
    loading,
    error,
    isRefreshing,
    isRetrying,
  };
}
