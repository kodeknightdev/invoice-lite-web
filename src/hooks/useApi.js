import { useCallback, useEffect, useState } from 'react';

/**
 * Runs `fetcher` on mount and whenever `deps` change.
 * Returns { data, error, loading, reload, setData }.
 */
export default function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(fetcher, deps);

  useEffect(() => {
    // StrictMode in React 18 mounts every effect twice in development, and
    // changing filters quickly can also leave an older request in flight.
    // Ignore results from runs that have already been cleaned up.
    let ignore = false;

    setLoading(true);
    setError(null);
    load()
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [load, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return { data, error, loading, reload, setData };
}
