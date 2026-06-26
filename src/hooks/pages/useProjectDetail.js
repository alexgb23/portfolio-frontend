import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

export default function useProjectDetail(id) {
  const { data, loading, error } = useAsyncResource(
    () => portfolioService.getProjectDetail(id),
    null,
    [id],
    "Project detail"
  );

  return {
    project: data,
    loading,
    error,
  };
}
