import { useCallback, useContext } from "react";
import { LoadingContext } from "context/LoadingContext";

export const useLoading = () => {
  const { setLoading } = useContext(LoadingContext);

  const showLoading = useCallback(() => {
    if (setLoading) {
      setLoading(true);
    }
  }, [setLoading]);

  const hideLoading = useCallback(() => {
    if (setLoading) {
      setLoading(false);
    }
  }, [setLoading]);

  return [showLoading, hideLoading];
};
