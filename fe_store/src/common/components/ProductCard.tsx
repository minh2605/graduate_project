import { ProductCardPopup } from "features/Products/components/ProductCardPopup";
import { useState } from "react";
export interface ProductProps {
  description: string;
  image: string;
  name: string;
  price: number;
  productCategoryId: string;
  productCode: string;
  productTypeId: string;
  slideImages?: string[];
  updatedAt?: Date;
  createdAt?: Date;
  _id: string;
}
interface ProductCardProps {
  product: ProductProps;
}

export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="flex items-center p-2 border border-border-grey gap-2 rounded cursor-pointer h-40"
      onClick={() => setOpen(true)}
    >
      <div className="basis-3/5">
        <h5 className="text-base font-medium">{product.name}</h5>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, totam?
        </p>
      </div>
      <div className="basis-2/5 rounded overflow-hidden h-24 max-h-full">
        <img
          src={product.image}
          alt="product-img"
          className="h-full w-full object-cover"
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
