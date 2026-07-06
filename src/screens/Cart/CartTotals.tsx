import { StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import { SHIPPING_FEES, TAXES } from "../../constants/constants";
import { AppColors } from "../../styles/colors";
import CheckoutButton from "../../components/buttons/CheckoutButton";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStack";
import { BottomTabParamList } from "../../navigation/BottomTabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Cart">,
  StackNavigationProp<RootStackParamList>
>;

const CartTotals = () => {
  const { t } = useTranslation();
  const navigateCheckout = useNavigation<NavigationProp>();
  const { cartItems } = useSelector((state: RootState) => state.cartSlice);
  const totalPrices = cartItems.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalPrices + SHIPPING_FEES + TAXES;
  return (
    <View>
      <View style={styles.totalRowsSection}>
        <AppText variant="medium">{t("cart_items_price")}</AppText>
        <AppText variant="medium">{totalPrices}{t("common_currency")}</AppText>
      </View>
      <View style={styles.totalRowsSection}>
        <AppText variant="medium">{t("cart_taxes")}</AppText>
        <AppText variant="medium">{TAXES}{t("common_currency")}</AppText>
      </View>
      <View style={styles.totalRowsSection}>
        <AppText variant="medium">{t("cart_shipping_fees")}</AppText>
        <AppText variant="medium">{SHIPPING_FEES}{t("common_currency")}</AppText>
      </View>
      <View style={styles.borderLine}></View>
      <View style={styles.totalRowsSection}>
        <AppText variant="medium">{t("cart_order_total")}</AppText>
        <AppText variant="medium">{orderTotal}{t("common_currency")}</AppText>
      </View>

      <CheckoutButton
        style={{ marginBottom: vs(15) }}
        onPress={() => navigateCheckout.navigate("Checkout")}
        title={t("cart_checkout")}
      />
    </View>
  );
};

export default CartTotals;

const styles = StyleSheet.create({
  totalRowsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: vs(8),
    paddingHorizontal: s(8),
  },
  borderLine: {
    height: vs(1),
    width: "100%",
    backgroundColor: AppColors.disabled,
    elevation: 7,
  },
});
