import useAsyncResource from "../core/useAsyncResource";
import { laboratoryService } from "../../services/api";

export default function useLaboratoryHome() {
  const { data, loading, error } = useAsyncResource(
    laboratoryService.getLaboratoryHome,
    {
      summary: {},
      featured_items: [],
    },
    [],
    "Laboratory home",
  );

  return {
    laboratoryHome: data,
    summary: data?.summary ?? {},
    featuredItems: Array.isArray(data?.featured_items)
      ? data.featured_items
      : [],
    loading,
    error,
  };
}
