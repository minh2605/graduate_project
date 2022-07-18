import { Button } from "common/components/Button";
import { Modal } from "common/components/Modal";
import { ProductProps } from "common/components/ProductCard";
import SvgMinor from "common/components/svg/Minor";
import SvgPlus from "common/components/svg/Plus";
import { useMemo, useState } from "react";
import { useDispatch } from "redux/hook";
import { addToCart, updateTotalPrice } from "redux/slices/cart/cartSlice";
import { SlideShow } from "./SlideShow";

interface ProductCardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productDetail: ProductProps;
}

export const ProductCardPopup = ({
  isOpen,
  onClose,
  productDetail,
}: ProductCardPopupProps): JSX.Element => {
  const [productAmount, setProductAmount] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: productDetail,
        amount: productAmount,
      })
    );
    dispatch(updateTotalPrice());
    setProductAmount(1);
    onClose();
  };

  const handleAmount = (addMode = true) => {
    if (addMode) {
      setProductAmount((prevProductAmount) => prevProductAmount + 1);
    } else {
      if (productAmount > 1) {
        setProductAmount((prevProductAmount) => prevProductAmount - 1);
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      setProductAmount(Number(e.target.value));
    }
  };
  const listImage = useMemo(() => {
    return productDetail.slideImages
      ? [productDetail.image].concat(
          productDetail.slideImages?.filter((it) => it !== null)
        )
      : [productDetail.image];
  }, [productDetail.image, productDetail.slideImages]);
  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <div className="flex flex-col">
        <h2 className="text-h2 font-bold leading-6 mb-4">
          {productDetail.name}
        </h2>
        <p className="text-sm mb-4">{productDetail.description}</p>
        <div className="mb-8">
          {listImage.length === 1 ? (
            <div className="mb-5 w-full h-96">
              <img
                src={productDetail.image}
                alt="product-img"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <SlideShow slideData={listImage} />
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            <SvgMinor
              className="cursor-pointer"
              onClick={() => handleAmount(false)}
            />
            <input
              type="number"
              className="bg-border-grey p-2 w-16 rounded text-center font-medium"
              value={productAmount}
              onChange={handleAmountChange}
            />
            <SvgPlus
              className="cursor-pointer"
              onClick={() => handleAmount()}
            />
          </div>
          <div>
            <Button size="xl" onClick={handleAddToCart}>
              <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
