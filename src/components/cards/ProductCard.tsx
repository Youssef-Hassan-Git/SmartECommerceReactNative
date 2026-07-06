import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  imageURL: string;
  title: string;
  price: number;
  addToCart: () => void;
}

const ProductCard = ({ imageURL, title, price, addToCart }: ProductCardProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.productCard}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={addToCart}
        style={styles.cartIcon}
      >
        <Ionicons name="cart-outline" size={24} color={AppColors.surface} />
      </TouchableOpacity>
      <Image
        source={{
          uri: imageURL,
        }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <AppText numberOfLines={2} variant="medium">
          {title}
        </AppText>
        <AppText style={styles.productPrice} variant="bold">
          {price}{t("common_currency")}
        </AppText>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cartIcon: {
    position: "absolute",
    top: 7,
    left: 7,
    zIndex: 999,
    backgroundColor: AppColors.primary ,
    padding: s(7),
    borderRadius: s(50),
  },
  productImage: {
    width: "70%",
    alignSelf: "center",
    resizeMode: "cover",
    borderRadius: s(10),
    elevation: 5,
    height: vs(140),
    // aspectRatio: 1,
  },
  productDetails: {
    marginTop: s(12),
  },
  productPrice: {
    color: AppColors.primary,
  },
  productCard: {
    backgroundColor: AppColors.surface,
    borderRadius: s(25),
    padding: s(16),
    // width: "50%",
    width: 160,
    borderWidth: 1,
    borderColor: AppColors.border,

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

    overflow: "hidden",
  },
});
