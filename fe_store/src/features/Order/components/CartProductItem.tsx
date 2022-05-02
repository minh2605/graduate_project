import SvgBin from "common/components/svg/Bin";
import tw, { styled } from "twin.macro";

interface CartProductItemProps {
  product: number;
}
const ProductItemWrapper = styled.div(
  tw`flex h-24 py-2 px-4 gap-4 items-center font-medium border-b-2 border-border-grey cursor-pointer`
);
export const CartProductItem = ({
  product,
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
          <span className="w-full">1 x</span>
        </div>
        <img
          src="https://img.cdn4dd.com/p/fit=cover,width=150,height=150,format=jpeg,quality=50/media/photosV2/7d4f4c92-9d3d-4f50-a0d2-aa9dc696bc0a-a13c8e30-8aa9-44b4-a18d-5fb1c26d156e-retina-large.JPG"
          alt="product-img"
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h5 className="text-base">Product {product}</h5>
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
