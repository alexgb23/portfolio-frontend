import useAsyncResource from "../core/useAsyncResource";
import { laboratoryService } from "../../services/api";

export default function useLaboratoryDetail(id) {
  const { data, loading, error } = useAsyncResource(
    () => laboratoryService.getLaboratoryDetail(id),
    null,
    [id],
    "Laboratory detail"
  );

  return {
    laboratoryItem: data,
    loading,
    error,
  };
}
