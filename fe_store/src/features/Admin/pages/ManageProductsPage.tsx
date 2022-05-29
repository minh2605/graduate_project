import { ProductProps } from "common/components/ProductCard";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect } from "react";
import API from "api/axios";

export const ManageProductsPage = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: ProductProps[] = await API.get("/product/list");
      setProducts(data);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading]);
  return (
    <div>
      <h1>Manage Products Page</h1>
    </div>
  );
};
