import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { products } from "../../data/products";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSafeView from "../../components/views/AppSafeView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  emptyCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";
import ShowSummary from "./ShowSummary";
import CartHeader from "../../components/headers/CartHeader";

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  return (
    <AppSafeView>
      <CartHeader
        cartItems={cartItems}
        clearCart={() => dispatch(emptyCart())}
      />
      {cartItems.length > 0 ? (
        <View style={styles.cartContainer}>
          {/* <EmptyCart /> */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                {...item}
                onDecItem={() => dispatch(removeItemFromCart(item))}
                onIncItem={() => dispatch(addItemToCart(item))}
                onDeleteItem={() => dispatch(removeProductFromCart(item))}
              />
            )}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={<CartTotals />}
          />
          <ShowSummary />
        </View>
      ) : (
        <EmptyCart />
      )}
    </AppSafeView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
  },
});
