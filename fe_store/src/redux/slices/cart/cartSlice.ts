import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "common/components/ProductCard";

export interface ProductCartProps {
  product: ProductProps;
  amount: number;
}
export type CartState = {
  productCart: ProductCartProps[];
  totalPrice: number;
};
const productCartInfo = localStorage.getItem("product_cart");
const calculateTotalPrice = (productCartInfo: ProductCartProps[]) => {
  const totalPrice = productCartInfo.reduce((result, it) => {
    return result + it.amount * it.product.price;
  }, 0);
  return totalPrice;
};
if (productCartInfo) {
  console.log("productCartInfo", JSON.parse(productCartInfo));
}
const initialState: CartState = productCartInfo
  ? {
      productCart: JSON.parse(productCartInfo).productCart,
      totalPrice: calculateTotalPrice(JSON.parse(productCartInfo).productCart),
    }
  : {
      productCart: [],
      totalPrice: 0,
    };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductCartProps>) {
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
      return state;
    },
    updateProductAmount(state, action: PayloadAction<ProductCartProps>) {
      const productId = action.payload.product._id;
      const amount = action.payload.amount;
      if (amount === 0) {
        const newProductInCart = state.productCart.filter(
          (it) => it.product._id !== productId
        );
        return {
          ...state,
          productCart: newProductInCart,
        };
      }
      const productInCart = state.productCart.find(
        (it) => it.product._id === productId
      );
      if (productInCart) {
        productInCart.amount = amount;
      }
      return state;
    },
    removeFromCart(state, action: PayloadAction<ProductCartProps>) {
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
      return {
        ...state,
      };
    },
    deleteFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const newProductInCart = state.productCart.filter(
        (it) => it.product._id !== productId
      );
      return {
        ...state,
        productCart: newProductInCart,
      };
    },
    updateTotalPrice(state) {
      if (state.productCart.length === 0) {
        localStorage.removeItem("product_cart");
        return;
      }
      localStorage.setItem(
        "product_cart",
        JSON.stringify({
          ...state,
          totalPrice: calculateTotalPrice(state.productCart),
        })
      );
      return {
        ...state,
        totalPrice: calculateTotalPrice(state.productCart),
      };
    },
  },
});

const {
  addToCart,
  removeFromCart,
  updateTotalPrice,
  deleteFromCart,
  updateProductAmount,
} = cartSlice.actions;
export {
  addToCart,
  removeFromCart,
  updateTotalPrice,
  deleteFromCart,
  updateProductAmount,
};
const cartReducer = cartSlice.reducer;
export default cartReducer;
