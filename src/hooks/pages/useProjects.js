import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const portfolioAsyncOptions = {
  retryOnError: true,
  persistCache: true,
  refreshInterval: 60_000,
};

export default function useProjects(enabled = true) {
  const { data, loading, error, isRefreshing } = useAsyncResource(
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
  };
}
