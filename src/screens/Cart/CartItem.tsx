import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../../components/texts/AppText";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useTranslation } from "react-i18next";
interface CartItemProps {
  title: string;
  price: number | string;
  imageURL: string;
  qty: number;
  sum: number;
  onDeleteItem: () => void;
  onIncItem: () => void;
  onDecItem: () => void;
}

const CartItem = ({
  title,
  price,
  imageURL,
  qty,
  sum,
  onDeleteItem,
  onIncItem,
  onDecItem,
}: CartItemProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.cartItemContainer}>
      {/* image section */}
      <View style={styles.imageItemSection}>
        <Image source={{ uri: imageURL }} style={styles.imageItem} />
      </View>
      {/* details, increment and decrement button section */}
      <View style={styles.detailsSection}>
        <AppText numberOfLines={2} style={styles.productTitle} variant="medium">
          {title}
        </AppText>

        <AppText style={styles.productPrice} variant="semiBold">
          {sum}{t("common_currency")}
        </AppText>
        <View style={styles.buttonAddDec}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconBorders}
            onPress={onDecItem}
          >
            <AntDesign name="minus" size={18} color={AppColors.primary} />
          </TouchableOpacity>
          <AppText style={styles.quantity} variant="semiBold">
            {qty}
          </AppText>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconBorders}
            onPress={onIncItem}
          >
            <AntDesign name="plus" size={18} color={AppColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Delete section */}
      <View style={styles.deleteSection}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.deleteButton}
          onPress={onDeleteItem}
        >
          <Fontisto name="trash" size={18} color={AppColors.textOnPrimary} />

          <AppText style={styles.deleteText} variant="regular">
            {t("cart_delete")}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: AppColors.surface,
    elevation: 5,
    paddingVertical: vs(8),
    paddingHorizontal: s(8),
    borderRadius: s(10),
    marginVertical: vs(10),
  },
  imageItemSection: {
    width: "30%",
    // flex: 1,
    height: 100,
  },
  imageItem: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: s(12.5),
    elevation: 5,
  },

  detailsSection: {
    width: "35%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: s(12),
    marginTop: vs(7),
  },
  productTitle: {
    // backgroundColor: "red",
    color: AppColors.text,
  },
  productPrice: {
    color: AppColors.primary,
  },
  deleteSection: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: vs(5),
    marginRight: s(5),
    width: "30%",
  },
  deleteText: {
    color: AppColors.textOnPrimary,
  },
  deleteButton: {
    backgroundColor: AppColors.danger,
    paddingHorizontal: s(8),
    paddingVertical: vs(5),
    borderRadius: s(5),
    flexDirection: "row",
    elevation: 10,
  },
  buttonAddDec: {
    backgroundColor: AppColors.primary,
    borderRadius: s(999),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 7,
  },
  iconBorders: {
    borderWidth: 2,
    backgroundColor: AppColors.surface,
    borderColor: AppColors.primary,
    borderRadius: s(999),
    padding: s(6),
  },
  quantity: {
    color: AppColors.textOnPrimary,
    marginHorizontal: s(10),
  },
});
