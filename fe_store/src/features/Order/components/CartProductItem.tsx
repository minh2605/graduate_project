import SvgBin from "common/components/svg/Bin";
import SvgMinor from "common/components/svg/Minor";
import SvgPlus from "common/components/svg/Plus";
import { useState } from "react";
import { useDispatch } from "redux/hook";
import {
  deleteFromCart,
  ProductCartProps,
  updateProductAmount,
  updateTotalPrice,
} from "redux/slices/cart/cartSlice";
import tw, { styled } from "twin.macro";

type CartProductItemProps = ProductCartProps;
const ProductItemWrapper = styled.div(
  tw`flex h-24 py-2 px-4 gap-4 items-center justify-between font-medium border-b-2 border-border-grey cursor-pointer`
);
export const CartProductItem = ({
  product,
  amount,
}: CartProductItemProps): JSX.Element => {
  const dispatch = useDispatch();
  const [productAmount, setProductAmount] = useState(amount);
  const handleProductItemClicked = () => {
    console.log("Product clicked");
  };
  const handleDeleteItem = (
    e: { stopPropagation: () => void },
    productId: string
  ) => {
    e.stopPropagation();
    dispatch(deleteFromCart(productId));
    dispatch(updateTotalPrice());
  };
  const handleAmount = (addMode = true) => {
    let newProductAmount = productAmount;
    if (addMode) {
      newProductAmount = productAmount + 1;
    } else {
      newProductAmount = productAmount - 1;
    }
    setProductAmount(newProductAmount);
    dispatch(
      updateProductAmount({
        product: product,
        amount: newProductAmount,
      })
    );
    dispatch(updateTotalPrice());
  };

  return (
    <ProductItemWrapper onClick={handleProductItemClicked}>
      <div className="relative w-16 h-16 shrink-0">
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-grey text-white flex items-center text-center">
          <span className="w-full">{amount} x</span>
        </div>
        <img
          src={product.image}
          alt="product-img"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <h5 className="text-base font-medium mb-2">{product.name}</h5>
        <div className="text-dark-red mb-2">${product.price}</div>
      </div>
      <div className="flex items-center">
        <SvgMinor
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAmount(false);
          }}
        />
        <SvgPlus
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAmount();
          }}
        />
      </div>
      <div
        className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-light-red-opacity"
        onClick={(e) => handleDeleteItem(e, product._id)}
      >
        <SvgBin />
      </div>
    </ProductItemWrapper>
  );
};
