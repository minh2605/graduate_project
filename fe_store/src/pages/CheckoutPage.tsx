import { CheckoutForm } from "features/Checkout/CheckoutForm";
import { CheckoutProducts } from "features/Checkout/CheckoutProducts";
import useCart from "hooks/useCart";

export const CheckoutPage = (): JSX.Element => {
  const { productCart } = useCart();

  return (
    <div className="max-h-screen">
      <h1 className="text-h1 font-medium mb-6 uppercase">Your cart</h1>
      <div className="flex h-fit gap-10 mx-10">
        <CheckoutProducts productCart={productCart} />
        <div className="basis-1/2">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};
