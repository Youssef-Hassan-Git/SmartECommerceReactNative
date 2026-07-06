import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import ClearCartButton from "../buttons/ClearCartButton";
import AppText from "../texts/AppText";
import { CartItem } from "../../interfaces/cartItems";
import { useTranslation } from "react-i18next";
interface CartHeaderProps {
  clearCart: () => void;
  cartItems: CartItem[];
}
const CartHeader = ({ clearCart, cartItems }: CartHeaderProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.headerContainer}>
      {cartItems.length > 0 ? (
        <View
          style={[
            styles.imageWrapper,
            {
              justifyContent: cartItems.length > 0 ? "space-around" : "center",
            },
          ]}
        >
          <Image
            style={styles.imageLogo}
            source={require("../../assets/images/app-logo.png")}
          />

          <ClearCartButton onPress={clearCart} title={t("cart_clear_cart")} />
        </View>
      ) : (
        <View
          style={[
            styles.imageWrapper,
            {
              justifyContent: cartItems.length > 0 ? "space-around" : "center",
            },
          ]}
        >
          <Image
            style={styles.imageLogo}
            source={require("../../assets/images/app-logo.png")}
          />

          <AppText variant="bold">
            Smart
            <AppText style={styles.orangeText} variant="bold">
              ECommerce
            </AppText>
          </AppText>
        </View>
      )}
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: vs(12),
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
    //ios
    shadowColor: AppColors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    //android
    elevation: 5,
  },
  imageLogo: {
    height: vs(45),
    width: s(45),
    resizeMode: "cover",
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
  },
  orangeText: {
    color: AppColors.primary,
  },
});
