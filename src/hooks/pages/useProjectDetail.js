import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

export default function useProjectDetail(slug) {
  const { data, loading, error } = useAsyncResource(
    () => portfolioService.getProjectDetail(slug),
    null,
    [slug],
    "Project detail",
    Boolean(slug),
  );

  return {
    project: data,
    loading,
    error,
  };
}
