import { useEffect, useRef, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

function hasMeaningfulData(value, initialValue) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (!value || typeof value !== "object") {
    return value !== initialValue && value != null && value !== "";
  }

  const initialObject =
    initialValue && typeof initialValue === "object" ? initialValue : {};

  return Object.keys(value).some((key) => {
    const current = value[key];
    const initial = initialObject[key];

    if (Array.isArray(current)) {
      return current.length > 0;
    }

    if (current && typeof current === "object") {
      return hasMeaningfulData(current, initial);
    }

    return current != null && current !== "" && current !== initial;
  });
}

const resourceCache = new Map();
const pendingRequests = new Map();

const CACHE_TTL = 5 * 60 * 1000;
const STARTUP_RETRY_MS = 3_000;
const MAX_RETRY_DELAY_MS = 15_000;

function getStorageKey(cacheKey) {
  return `syskovex:async-resource:${cacheKey}`;
}

function getPersistentCache(cacheKey) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(getStorageKey(cacheKey));

    if (!raw) {
      return null;
    }

    const cached = JSON.parse(raw);

    if (!cached || typeof cached !== "object" || !cached.data || !cached.time) {
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function setPersistentCache(cacheKey, data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      getStorageKey(cacheKey),
      JSON.stringify({
        data,
        time: Date.now(),
      }),
    );
  } catch {
    // Si no hay storage disponible, continúa con la caché en memoria.
  }
}

function getCachedEntry(cacheKey, persistCache) {
  const memoryCached = resourceCache.get(cacheKey);

  if (memoryCached) {
    return memoryCached;
  }

  if (!persistCache) {
    return null;
  }

  const persistentCached = getPersistentCache(cacheKey);

  if (!persistentCached) {
    return null;
  }

  resourceCache.set(cacheKey, persistentCached);

  return persistentCached;
}

function setCachedEntry(cacheKey, data, persistCache) {
  const entry = {
    data,
    time: Date.now(),
  };

  resourceCache.set(cacheKey, entry);

  if (persistCache) {
    setPersistentCache(cacheKey, data);
  }
}

function getSharedRequest(cacheKey, fetcher) {
  const pending = pendingRequests.get(cacheKey);

  if (pending) {
    return pending;
  }

  const request = Promise.resolve()
    .then(fetcher)
    .finally(() => {
      pendingRequests.delete(cacheKey);
    });

  pendingRequests.set(cacheKey, request);

  return request;
}

/**
 * Hook reutilizable para recursos asíncronos.
 *
 * Los últimos dos parámetros son opcionales:
 *
 * retryOnError:
 * - false por defecto: conserva el comportamiento de tus hooks actuales.
 * - true: reintenta automáticamente si el backend está arrancando.
 *
 * persistCache:
 * - false por defecto: caché solo en memoria.
 * - true: guarda datos válidos en sessionStorage y los muestra tras F5.
 */
export default function useAsyncResource(
  fetcher,
  initialValue,
  deps = [],
  label = "Resource",
  enabled = true,
  options = {},
) {
  const {
    retryOnError = false,
    persistCache = false,
    refreshInterval = 0,
  } = options;

  const cacheKey = JSON.stringify([label, enabled, persistCache, ...deps]);

  const timerRef = useRef(null);
  const attemptRef = useRef(0);
  const fetcherRef = useRef(fetcher);

  fetcherRef.current = fetcher;

  const [state, setState] = useState(() => {
    if (!enabled) {
      return {
        data: initialValue,
        loading: false,
        error: "",
        isRefreshing: false,
      };
    }

    const cached = getCachedEntry(cacheKey, persistCache);
    const cachedHasData = hasMeaningfulData(cached?.data, initialValue);

    if (cachedHasData) {
      return {
        data: cached.data,
        loading: false,
        error: "",
        isRefreshing: true,
      };
    }

    return {
      data: initialValue,
      loading: true,
      error: "",
      isRefreshing: false,
    };
  });

  useEffect(() => {
    let ignore = false;

    const clearTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = (delay) => {
      clearTimer();

      timerRef.current = window.setTimeout(() => {
        void load();
      }, delay);
    };

    const load = async () => {
      if (ignore || !enabled) {
        return;
      }

      setState((previous) => {
        const hasPreviousData = hasMeaningfulData(previous.data, initialValue);

        return {
          ...previous,
          loading: !hasPreviousData,
          isRefreshing: hasPreviousData,
          error: "",
        };
      });

      try {
        const result = await getSharedRequest(cacheKey, fetcherRef.current);

        if (ignore) {
          return;
        }

        const data = result ?? initialValue;
        const hasNewData = hasMeaningfulData(data, initialValue);

        if (!hasNewData) {
          throw new Error("La API todavía no ha devuelto datos");
        }

        attemptRef.current = 0;

        setCachedEntry(cacheKey, data, persistCache);

        setState({
          data,
          loading: false,
          error: "",
          isRefreshing: false,
        });

        if (refreshInterval > 0) {
          schedule(refreshInterval);
        }
      } catch (error) {
        if (ignore) {
          return;
        }

        const hasCachedData = hasMeaningfulData(
          getCachedEntry(cacheKey, persistCache)?.data,
          initialValue,
        );

        setState((previous) => {
          const hasPreviousData = hasMeaningfulData(
            previous.data,
            initialValue,
          );

          return {
            ...previous,
            loading: !hasPreviousData,
            isRefreshing: hasPreviousData,
            error: buildHookErrorMessage(label, error),
          };
        });

        if (retryOnError) {
          attemptRef.current += 1;

          const retryDelay = Math.min(
            STARTUP_RETRY_MS * attemptRef.current,
            MAX_RETRY_DELAY_MS,
          );

          schedule(retryDelay);
          return;
        }

        if (hasCachedData) {
          return;
        }
      }
    };

    if (!enabled) {
      attemptRef.current = 0;
      clearTimer();

      setState({
        data: initialValue,
        loading: false,
        error: "",
        isRefreshing: false,
      });

      return () => {
        ignore = true;
        clearTimer();
      };
    }

    const cached = getCachedEntry(cacheKey, persistCache);
    const cachedHasData = hasMeaningfulData(cached?.data, initialValue);

    if (cachedHasData) {
      /*
       * Hay datos de antes:
       * - No se muestra el div de carga.
       * - La API se consulta en segundo plano.
       * - Si Render está apagado, se conservan los datos previos.
       */
      setState({
        data: cached.data,
        loading: false,
        error: "",
        isRefreshing: true,
      });
    } else {
      setState({
        data: initialValue,
        loading: true,
        error: "",
        isRefreshing: false,
      });
    }

    attemptRef.current = 0;
    void load();

    return () => {
      ignore = true;
      clearTimer();
    };
  }, [
    cacheKey,
    enabled,
    initialValue,
    persistCache,
    refreshInterval,
    retryOnError,
  ]);

  return state;
}
