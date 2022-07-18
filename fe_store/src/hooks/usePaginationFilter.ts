import { useCallback, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationFilterProps {
  page: number;
  limit: number;
}
export const usePaginationFilter = (initData: PaginationFilterProps) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [dataFilter, setDataFilter] = useState<any>(
    location.search ? queryString.parse(location.search) : initData
  );

  useEffect(() => {
    navigate(`?${queryString.stringify(dataFilter)}`);
  }, [dataFilter, navigate]);

  const setPaginationFilter = useCallback(
    (data: PaginationFilterProps) => {
      if (data.page <= 0) {
        data.page = 1;
      }
      setDataFilter(data);
    },
    [setDataFilter]
  );

  return [dataFilter, setPaginationFilter];
};
