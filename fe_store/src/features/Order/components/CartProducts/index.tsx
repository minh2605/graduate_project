import tw, { styled } from "twin.macro";
import { CartProductItem } from "features/Order/components/CartProductItem";
import { useNavigate } from "react-router-dom";

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
export const CartProducts = (): JSX.Element => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
        {products.map((item) => (
          <CartProductItem product={item} key={item} />
        ))}
      </ProductsWrapper>
    </div>
  );
};
