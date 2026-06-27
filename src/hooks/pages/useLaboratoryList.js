import useAsyncResource from "../core/useAsyncResource";
import { laboratoryService } from "../../services/api";

export default function useLaboratoryList() {
  const { data, loading, error } = useAsyncResource(
    laboratoryService.getLaboratoryList,
    [],
    [],
    "Laboratory list"
  );

  return {
    laboratoryItems: Array.isArray(data) ? data : [],
    loading,
    error,
  };
}