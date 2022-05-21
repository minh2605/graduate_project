import { useContext } from "react";
import { LoadingContext } from "context/LoadingContext";

export const useLoading = () => {
  const { setLoading } = useContext(LoadingContext);

  const showLoading = () => {
    if (setLoading) {
      setLoading(true);
    }
  };

  const hideLoading = () => {
    if (setLoading) {
      setLoading(false);
    }
  };

  return [showLoading, hideLoading];
};
