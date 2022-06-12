import { useSelector } from "redux/hook";
import { RootState } from "redux/rootReducer";
import { CartState } from "redux/slices/cart/cartSlice";

const useCart = (): CartState => {
  const cartState = useSelector((state: RootState) => state.cart);

  return {
    ...cartState,
  };
};

export default useCart;
