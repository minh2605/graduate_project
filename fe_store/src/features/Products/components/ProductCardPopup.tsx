import { Button } from "common/components/Button";
import { Modal } from "common/components/Modal";
import SvgMinor from "common/components/svg/Minor";
import SvgPlus from "common/components/svg/Plus";

interface ProductCardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productDetail: number;
}

export const ProductCardPopup = ({
  isOpen,
  onClose,
  productDetail,
}: ProductCardPopupProps): JSX.Element => {
  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <div className="flex flex-col">
        <h2 className="text-h2 font-bold leading-6 mb-4">
          Product {productDetail}
        </h2>
        <p className="text-sm mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
          corrupti dignissimos sapiente autem minima tenetur.
        </p>
        <div className="mb-8">
          <img
            src="https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/95101ca4-bb3a-417b-8f73-58b73952219b-e2af1df3-e073-41e3-8b9a-5a9ea996f83a-retina-large.JPG"
            alt="product-img"
            className="w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            <SvgMinor className="cursor-pointer" />
            <input
              type="text"
              className="bg-border-grey p-2 w-16 rounded text-center font-medium"
              value={1}
            />
            <SvgPlus className="cursor-pointer" />
          </div>
          <div>
            <Button size="xl">
              <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
