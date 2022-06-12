import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "common/components/ProductCard";
export interface ProductCartProps {
  product: ProductProps;
  amount: number;
}
export type CartState = {
  productCart: ProductCartProps[];
};
const productCartInfo = localStorage.getItem("product_cart");

const initialState: CartState = productCartInfo
  ? { productCart: JSON.parse(productCartInfo) }
  : {
      productCart: [],
    };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductCartProps>) {
      console.log("state.productCart", state.productCart);
      const productId = action.payload.product._id;
      const amount = action.payload.amount;
      const productInCart = state.productCart.find(
        (it) => it.product._id === productId
      );
      if (productInCart) {
        productInCart.amount += amount;
      } else {
        state.productCart.push(action.payload);
      }
      localStorage.setItem("product_cart", JSON.stringify(state.productCart));
    },
    removeFromCart(state, action: PayloadAction<ProductCartProps>) {
      console.log("removeFromCart state", action.payload);
      const productId = action.payload.product._id;
      const amount = action.payload.amount;
      const productInCart = state.productCart.find(
        (it) => it.product._id === productId
      );
      if (productInCart) {
        if (productInCart.amount >= amount) {
          productInCart.amount -= amount;
        }
      }
    },
  },
});
const { addToCart, removeFromCart } = cartSlice.actions;
export { addToCart, removeFromCart };
const cartReducer = cartSlice.reducer;
export default cartReducer;
