import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const portfolioAsyncOptions = {
  /*
   * Render puede estar suspendido al entrar. El hook seguirá reintentando
   * y devolverá isRetrying: true mientras intenta recuperar el backend.
   */
  retryOnError: true,

  /*
   * Conserva proyectos válidos en caché de memoria, sessionStorage
   * y localStorage mientras se actualizan en segundo plano.
   */
  persistCache: true,

  /*
   * Sincroniza el listado cada minuto.
   */
  refreshInterval: 60_000,
};

export default function useProjects(enabled = true) {
  const { data, loading, error, isRefreshing, isRetrying } = useAsyncResource(
    portfolioService.getProjects,
    [],
    [],
    "Projects",
    enabled,
    portfolioAsyncOptions,
  );

  return {
    projects: Array.isArray(data) ? data : [],
    loading,
    error,
    isRefreshing,
    isRetrying,
  };
}
