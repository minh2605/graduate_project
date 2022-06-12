import tw, { styled } from "twin.macro";
import { CartProductItem } from "features/Order/components/CartProductItem";
import { useNavigate } from "react-router-dom";
import { CartState } from "redux/slices/cart/cartSlice";

const CartCheckoutButton = styled.div(
  tw`flex items-center justify-between bg-light-red p-3 rounded-3xl text-white hover:bg-dark-red cursor-pointer font-medium`
);
const ProductsWrapper = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(transparent, #ef2e32);
    border-radius: 6px;
  }
`;

type CartProductsProps = CartState;

export const CartProducts = ({
  productCart,
}: CartProductsProps): JSX.Element => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="mb-4">
          <span className="text-h3 font-medium flex items-center">
            Your orders
          </span>
        </div>
        <div className="pb-4 border-b-2 border-border-grey">
          <CartCheckoutButton onClick={handleCheckout}>
            <span>Checkout</span>
            <span className="text-base">$10.45</span>
          </CartCheckoutButton>
        </div>
      </div>
      <ProductsWrapper className="flex-1 overflow-y-auto">
        {productCart.map((item) => (
          <CartProductItem
            key={item.product._id}
            product={item.product}
            amount={item.amount}
          />
        ))}
      </ProductsWrapper>
    </div>
  );
};
