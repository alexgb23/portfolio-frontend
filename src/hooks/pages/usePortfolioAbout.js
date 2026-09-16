import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const initialValue = {
  highlights: [],
};

const portfolioAsyncOptions = {
  /*
   * Si el backend de Render está arrancando, reintenta sin mostrar
   * un error definitivo en la interfaz.
   */
  retryOnError: true,

  /*
   * Conserva la última respuesta válida en memoria, sessionStorage
   * y localStorage para poder pintar los highlights inmediatamente
   * mientras se actualizan en segundo plano.
   */
  persistCache: true,

  /*
   * Actualiza el contenido técnico cada minuto.
   */
  refreshInterval: 60_000,
};

export default function usePortfolioAbout(enabled = true) {
  const { data, loading, error, isRefreshing, isRetrying } = useAsyncResource(
    portfolioService.getAboutData,
    initialValue,
    [],
    "Portfolio about",
    enabled,
    portfolioAsyncOptions,
  );

  return {
    highlights: Array.isArray(data?.highlights) ? data.highlights : [],
    loading,
    error,
    isRefreshing,
    isRetrying,
  };
}
