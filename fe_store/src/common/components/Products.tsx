import {
  ProductCard,
  ProductPaginationProps,
  ProductProps,
} from "common/components/ProductCard";
import API from "api/axios";
import { useEffect, useState } from "react";
import { useLoading } from "hooks/useLoading";
import { motion } from "framer-motion";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

export const Products = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [showLoading, hideLoading] = useLoading();
  const [productTypeId, setProductTypeId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: ProductPaginationProps = await API.get(
        `/product/list?page=1&productTypeId=${productTypeId}`
      );
      console.log("data", data);
      setProducts(data.productList);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, productTypeId]);

  const handleChange = () => {
    setProductTypeId("627a79f92df89e82811e3681");
  };

  return (
    <>
      <button onClick={handleChange}>Change</button>
      <motion.div
        layout
        className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4"
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </motion.div>
    </>
  );
};
