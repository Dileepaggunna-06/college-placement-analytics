import { useCallback, useEffect, useState } from "react";

export function useApi(loader, dependencies = []) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const reload = useCallback(() => {
    let active = true;
    setState((current) => ({ ...current, loading: true, error: "" }));
    loader()
      .then((data) => { if (active) setState({ data, loading: false, error: "" }); })
      .catch((error) => { if (active) setState({ data: null, loading: false, error: error.message || "Unable to load data." }); });
    return () => { active = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => reload(), [reload]);
  return { ...state, reload };
}
