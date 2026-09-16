// src/core/useAsyncResource.js (portfolio)

import { useEffect, useRef, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

/**
 * Versión adaptada para soportar tanto datos simples como health metrics.
 * Considera "significativos" ciertos campos clave aunque otros estén vacíos.
 */
function hasMeaningfulData(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  // Campos que, si existen, ya consideramos que hay datos útiles
  if (value.status) return true;
  if (value.service) return true;
  if (value.timestamp) return true;
  if (value.request_duration_ms != null) return true;

  // Arrays: al menos un elemento
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  // Objetos: basta con algún valor no nulo/vacío
  return Object.values(value).some((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === "object") {
      // En objetos anidados, también vale con status/service/timestamp
      if (v.status || v.service || v.timestamp) return true;
      return Object.keys(v).length > 0;
    }
    return v != null && v !== "";
  });
}

const resourceCache = new Map();
const pendingRequests = new Map();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutos
const STARTUP_RETRY_MS = 3_000;
const MAX_RETRY_DELAY_MS = 45_000; // más paciencia para arranques lentos

function getStorageKey(cacheKey, type = "local") {
  return `portfolio:async-resource:${type}:${cacheKey}`;
}

function getSessionResource(cacheKey) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(
      getStorageKey(cacheKey, "session"),
    );
    if (!raw) return null;

    const cached = JSON.parse(raw);
    if (!cached || typeof cached !== "object" || !cached.data || !cached.time) {
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function setSessionResource(cacheKey, data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      getStorageKey(cacheKey, "session"),
      JSON.stringify({
        data,
        time: Date.now(),
      }),
    );
  } catch {
    // Ignorar si sessionStorage no está disponible
  }
}

function getLocalResource(cacheKey) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(cacheKey, "local"));
    if (!raw) return null;

    const cached = JSON.parse(raw);
    if (!cached || typeof cached !== "object" || !cached.data || !cached.time) {
      return null;
    }

    const ageMs = Date.now() - cached.time;
    if (ageMs > CACHE_TTL) {
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function setLocalResource(cacheKey, data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getStorageKey(cacheKey, "local"),
      JSON.stringify({
        data,
        time: Date.now(),
      }),
    );
  } catch {
    // Ignorar si localStorage no está disponible
  }
}

function getCachedEntry(cacheKey, persistCache) {
  // 1. Memoria
  const memoryCached = resourceCache.get(cacheKey);
  if (memoryCached) {
    return memoryCached;
  }

  if (!persistCache) {
    return null;
  }

  // 2. localStorage (principal)
  const localCached = getLocalResource(cacheKey);
  if (localCached) {
    resourceCache.set(cacheKey, localCached);
    return localCached;
  }

  // 3. sessionStorage (extra)
  const sessionCached = getSessionResource(cacheKey);
  if (sessionCached) {
    resourceCache.set(cacheKey, sessionCached);
    return sessionCached;
  }

  return null;
}

function setCachedEntry(cacheKey, data, persistCache) {
  const entry = {
    data,
    time: Date.now(),
  };

  // Memoria
  resourceCache.set(cacheKey, entry);

  if (persistCache) {
    // localStorage como caché principal
    setLocalResource(cacheKey, data);
    // sessionStorage como extra
    setSessionResource(cacheKey, data);
  }
}

function getSharedRequest(cacheKey, fetcher) {
  const pending = pendingRequests.get(cacheKey);

  if (pending) {
    return pending;
  }

  const request = Promise.resolve()
    .then(fetcher)
    .then((result) => {
      const data = result ?? null;

      /*
       * No guardamos respuestas vacías. Si Render aún está arrancando
       * y tu fetcher devuelve null, {} o una respuesta sin contenido,
       * conservamos los últimos datos reales disponibles.
       */
      if (hasMeaningfulData(data)) {
        setCachedEntry(cacheKey, data, true); // <-- guarda en caché
      }

      return data;
    })
    .finally(() => {F
      pendingRequests.delete(cacheKey);
    });

  pendingRequests.set(cacheKey, request);

  return request;
}

/**
 * Hook reutilizable para recursos asíncronos.
 *
 * Opciones:
 * - retryOnError: false por defecto. Si true, reintenta automáticamente.
 * - persistCache: false por defecto. Si true, guarda en localStorage + sessionStorage.
 * - refreshInterval: 0 por defecto. Si > 0, refresca cada X ms cuando hay datos.
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
    const cachedHasData = hasMeaningfulData(cached?.data);

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
        const hasPreviousData = hasMeaningfulData(previous.data);

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
        const hasNewData = hasMeaningfulData(data);

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
        );

        setState((previous) => {
          const hasPreviousData = hasMeaningfulData(previous.data);

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
    const cachedHasData = hasMeaningfulData(cached?.data);

    if (cachedHasData) {
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
