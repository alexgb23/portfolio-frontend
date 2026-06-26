import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

export default function useProjects() {
  const { data, loading, error } = useAsyncResource(
    portfolioService.getProjects,
    [],
    [],
    "Projects"
  );

  return {
    projects: Array.isArray(data) ? data : [],
    loading,
    error,
  };
}
