import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { Timestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import ShowSummaryButton from "../buttons/ShowSummaryButton";
interface totalAmountProps {
  createdAt: Timestamp;
  totalPrice: number | string;
  totalCartPrices: number | string;
  cartItems: {
    id: number;
    title: string;
    imageURL: string;
    qty: number;
  }[];
}
const OrdersCard = ({
  createdAt,
  totalPrice,
  totalCartPrices,
  cartItems,
}: totalAmountProps) => {
  const { t } = useTranslation();
  const date = createdAt.toDate().toLocaleDateString();
  const [hideOrders, setHideOrders] = useState<boolean>(true);
  return (
    <View style={styles.orderCard}>
      <AppText variant="bold">{t("orders_title")}</AppText>
      <View style={styles.borderBottom}></View>
      {/* total row */}
      <View style={styles.orderRow}>
        <AppText variant="regular">
          {t("orders_total_price")} {totalCartPrices}
          {t("common_currency")}
        </AppText>
        <AppText style={styles.rightRedText} variant="semiBold">
          {totalPrice}
          {t("common_currency")}
        </AppText>
      </View>
      {/* date row */}
      <View style={styles.orderRow}>
        <AppText variant="regular">
          {t("orders_date")} {date}
        </AppText>
      </View>
      <ShowSummaryButton
        onPress={() => setHideOrders((prev) => !prev)}
        showSummaryCheckout={hideOrders}
        title={hideOrders ? t("cart_view_summary") : t("cart_collapse_summary")}
      />
      {hideOrders ? null : (
        <>
          {/* CART ITEMS SECTION */}
          <View style={{ marginTop: vs(10) }}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={{ uri: item.imageURL }} style={styles.image} />
                <View style={styles.itemInfo}>
                  <AppText numberOfLines={1} ellipsizeMode="tail">
                    {item.title}
                  </AppText>

                  <AppText variant="regular">
                    {t("orders_quantity")}: {item.qty}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default OrdersCard;

const styles = StyleSheet.create({
  orderCard: {
    paddingHorizontal: s(8),
    paddingVertical: vs(14),
    //ios
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
    //android
    elevation: 5,
    backgroundColor: AppColors.surface,
    borderRadius: s(10),
    marginVertical: vs(12),
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: AppColors.text,
    marginVertical: vs(8),
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightRedText: {
    color: AppColors.danger,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(10),
  },

  image: {
    width: s(45),
    height: s(45),
    borderRadius: s(8),
    marginRight: s(10),
  },

  itemInfo: {
    flex: 1,
  },
});
