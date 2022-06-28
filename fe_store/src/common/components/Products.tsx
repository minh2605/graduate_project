import {
  ProductCard,
  ProductPaginationProps,
  ProductProps,
} from "common/components/ProductCard";
import API from "api/axios";
import { useEffect, useState } from "react";
import { useLoading } from "hooks/useLoading";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

export const Products = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: ProductPaginationProps = await API.get(
        "/product/list?page=1"
      );
      console.log("data", data);
      setProducts(data.productList);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading]);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
      {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};
