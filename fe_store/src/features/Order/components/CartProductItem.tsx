import SvgBin from "common/components/svg/Bin";
import { ProductCartProps } from "redux/slices/cart/cartSlice";
import tw, { styled } from "twin.macro";

type CartProductItemProps = ProductCartProps;
const ProductItemWrapper = styled.div(
  tw`flex h-24 py-2 px-4 gap-4 items-center font-medium border-b-2 border-border-grey cursor-pointer`
);
export const CartProductItem = ({
  product,
  amount,
}: CartProductItemProps): JSX.Element => {
  const handleProductItemClicked = () => {
    console.log("Product clicked");
  };
  const handleDeleteItem = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    console.log("Product deleted");
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
        <h5 className="text-sm">{product.name}</h5>
        <span>$10.24</span>
      </div>
      <div
        className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-light-red-opacity"
        onClick={handleDeleteItem}
      >
        <SvgBin />
      </div>
    </ProductItemWrapper>
  );
};
