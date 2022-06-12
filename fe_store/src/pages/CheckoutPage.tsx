import useCart from "hooks/useCart";

export const CheckoutPage = (): JSX.Element => {
  const { productCart } = useCart();

  return (
    <div className="">
      <h1>Checkout Page</h1>
      <div>
        {productCart &&
          productCart.map((it) => {
            return (
              <div className="flex items-center justify-between">
                <div>{it.product.name}</div>
                <div>{it.amount}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
