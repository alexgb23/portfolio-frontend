import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const initialValue = {
  highlights: [],
};

const portfolioAsyncOptions = {
  retryOnError: true,
  persistCache: true,
  refreshInterval: 60_000,
};

export default function usePortfolioAbout(enabled = true) {
  const { data, loading, error, isRefreshing } = useAsyncResource(
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
  };
}
