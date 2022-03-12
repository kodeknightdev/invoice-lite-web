import { useCallback, useEffect, useState } from 'react';

/**
 * Runs `fetcher` on mount and whenever `deps` change.
 * Returns { data, error, loading, reload, setData }.
 */
export default function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(fetcher, deps);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    return load()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [load]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, error, loading, reload, setData };
}
