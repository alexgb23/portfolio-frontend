import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const portfolioAsyncOptions = {
  retryOnError: true,
  persistCache: true,
  refreshInterval: 60_000,
};

export default function useProjectDetail(slug) {
  const { data, loading, error, isRefreshing } = useAsyncResource(
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
  };
}
