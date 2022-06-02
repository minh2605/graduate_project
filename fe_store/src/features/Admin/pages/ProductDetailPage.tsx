import { ProductProps } from "common/components/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "api/axios";
import { useLoading } from "hooks/useLoading";

export const ProductDetailPage = (): JSX.Element => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const product: ProductProps = await API.get(`/product/${productId}`);
        if (product) {
          setProduct(product);
          hideLoading();
        }
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    };
    fetchData();
  }, [productId, showLoading, hideLoading]);
  return (
    <div>
      <div>DETAIL PRODUCT {product?.name}</div>
    </div>
  );
};
