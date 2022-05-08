import { ProductCardPopup } from "features/Products/components/ProductCardPopup";
import { useState } from "react";

interface ProductCardProps {
  product: number;
}
export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="flex items-center p-2 border border-border-grey gap-2 rounded cursor-pointer"
      onClick={() => setOpen(true)}
    >
      <div className="basis-3/5">
        <h5 className="text-base font-medium">ProductCard {product}</h5>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, totam?
        </p>
      </div>
      <div className="basis-2/5 rounded overflow-hidden">
        <img
          src="https://img.cdn4dd.com/p/fit=cover,width=150,height=150,format=jpeg,quality=50/media/photosV2/7d4f4c92-9d3d-4f50-a0d2-aa9dc696bc0a-a13c8e30-8aa9-44b4-a18d-5fb1c26d156e-retina-large.JPG"
          alt="product-img"
        />
      </div>
      <ProductCardPopup
        isOpen={isOpen}
        productDetail={product}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};
