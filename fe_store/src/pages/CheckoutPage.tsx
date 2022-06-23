import SvgBin from "common/components/svg/Bin";
import SvgMinor from "common/components/svg/Minor";
import SvgPlus from "common/components/svg/Plus";
import { CheckoutForm } from "features/Checkout/CheckoutForm";
import useCart from "hooks/useCart";
import { useDispatch } from "redux/hook";
import {
  deleteFromCart,
  updateTotalPrice,
  updateProductAmount,
  ProductCartProps,
} from "redux/slices/cart/cartSlice";

export const CheckoutPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { productCart } = useCart();

  const handleDeleteItem = (
    e: { stopPropagation: () => void },
    productId: string
  ) => {
    e.stopPropagation();
    dispatch(deleteFromCart(productId));
    dispatch(updateTotalPrice());
  };
  const handleAmount = (addMode = true, product: ProductCartProps) => {
    let newProductAmount = product.amount;
    if (addMode) {
      newProductAmount = product.amount + 1;
    } else {
      newProductAmount = product.amount - 1;
    }

    dispatch(
      updateProductAmount({
        product: product.product,
        amount: newProductAmount,
      })
    );
    dispatch(updateTotalPrice());
  };

  return (
    <div className="max-h-screen">
      <h1 className="text-h1 font-medium mb-6 uppercase">Your cart</h1>
      <div className="flex items-center h-fit gap-10 mx-10">
        <div className="max-h-full overflow-auto w-fit flex flex-col">
          {productCart &&
            productCart.map((it) => {
              return (
                <div
                  key={it.product._id}
                  className="flex items-center justify-space-between gap-8 cursor-pointer border py-2 px-4 rounded max-w-xl mb-4 w-full"
                >
                  <div className="h-24 shrink-0 basis-1/5">
                    <img
                      src={it.product.image}
                      alt="product-img"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between font-medium text-base gap-4 flex-1">
                    <div className="text-h3">
                      <p>{it.product.name}</p>
                      <p className="text-dark-red">${it.product.price}</p>
                    </div>
                    <div className="h-8 w-8 rounded flex items-center justify-center bg-dark-red text-white">
                      <span>X{it.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SvgMinor
                      className="cursor-pointer"
                      onClick={() => {
                        handleAmount(false, it);
                      }}
                    />
                    <SvgPlus
                      className="cursor-pointer"
                      onClick={() => {
                        handleAmount(true, it);
                      }}
                    />
                  </div>
                  <div
                    className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-light-red-opacity"
                    onClick={(e) => handleDeleteItem(e, it.product._id)}
                  >
                    <SvgBin />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="basis-1/2">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};
