import { useEffect, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

export default function useAsyncResource(
  fetcher,
  initialValue,
  deps = [],
  label = "Resource"
) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const result = await fetcher();

        if (!ignore) {
          setData(result ?? initialValue);
        }
      } catch (err) {
        if (!ignore) {
          setError(buildHookErrorMessage(label, err));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, deps);

  return { data, loading, error };
}
