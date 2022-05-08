import { Modal } from "common/components/Modal";

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
      <div className="flex flex-col">Product {productDetail}</div>
    </Modal>
  );
};
