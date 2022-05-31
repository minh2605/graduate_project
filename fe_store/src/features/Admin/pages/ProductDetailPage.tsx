import { useLocation, useParams } from "react-router-dom";

export const ProductDetailPage = (): JSX.Element => {
  const { productId } = useParams();
  console.log("productId", productId);
  return (
    <div>
      <div>DETAIL PRODUCT {productId}</div>
    </div>
  );
};
