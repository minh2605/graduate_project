import CartPlaceholder from "assets/images/cart_placeholder.png";
import { CartProducts } from "features/Order/components/CartProducts";
import useCart from "hooks/useCart";

export const OrderCart = (): JSX.Element => {
  const { productCart } = useCart();

  return (
    <div className="w-1/5 fixed inset-y-0 right-0 mt-24 text-sm border-l-[1px] border-border-grey p-4">
      {productCart?.length > 0 ? (
        <CartProducts productCart={productCart} />
      ) : (
        <div>
          <img
            src={CartPlaceholder}
            alt="cart-placeholder"
            className="w-full mb-4 object-cover"
          />
          <div className="text-center text-light-grey">
            <span>Your cart is empty</span>
            <br />
            <span>Add items to get started</span>
          </div>
        </div>
      )}
    </div>
  );
};
