import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../interfaces/cartItems";
import { showMessage } from "react-native-flash-message";
import i18n from "../../localization/i18n";

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // addItemToCart
    addItemToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (itemExist) => itemExist.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.qty += 1;
        existingItem.sum = existingItem.qty * existingItem.price;
        showMessage({
          type: "success",
          message: i18n.t("cart_quantity_increased"),
          icon: "default",
        });
      } else {
        state.cartItems.push({
          ...action.payload,
          qty: 1,
          price: action.payload.price,
          sum: action.payload.price,
        });
        showMessage({
          type: "success",
          message: i18n.t("cart_added"),
          icon: "default",
        });
      }
    },

    // removeItemFromCart
    removeItemFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (itemExist) => itemExist.id === action.payload.id,
      );
      if (!existingItem) {
        return;
      }
      if (existingItem.qty > 1) {
        existingItem.qty -= 1;
        existingItem.sum = existingItem.qty * existingItem.price;
        showMessage({
          type: "success",
          message: i18n.t("cart_item_removed"),
          icon: "default",
        });
      } else if (existingItem.qty == 1) {
        state.cartItems = state.cartItems.filter(
          (remainingItems) => remainingItems.id !== action.payload.id,
        );
        showMessage({
          type: "success",
          message: i18n.t("cart_removed"),
          icon: "default",
        });
      }
    },

    // removeProductFromCart
    removeProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (remainingProducts) => remainingProducts.id !== action.payload.id,
      );
      showMessage({
        type: "success",
        message: "Product has been removed from the cart successfully.",
        icon: "default",
      });
    },

    // emptyCart
    emptyCart: (state) => {
      state.cartItems = [];
      showMessage({
        type: "success",
        message: i18n.t("cart_cleared"),
        icon: "default",
      });
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
