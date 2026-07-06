import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import { AppColors } from "../../styles/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../navigation/BottomTabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";

const EmptyCart = () => {
  type NavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, "Cart">,
    StackNavigationProp<RootStackParamList>
  >;
  const navigateToProducts = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  return (
    <View style={styles.cartEmptyContainer}>
      <MaterialCommunityIcons
        name="shopping-outline"
        size={100}
        color={AppColors.primary + "85"}
      />
      <AppText style={styles.headerText} variant="bold">
        {t("cart_empty_title")}
      </AppText>
      <AppText style={styles.descriptionText} variant="regular">
        {t("cart_empty_description")}
      </AppText>
      <TouchableOpacity
        style={styles.startShoppingButton}
        onPress={() => navigateToProducts.navigate("Home")}
      >
        <AppText variant="semiBold" style={styles.startShoppingButtonText}>
          {t("cart_start_shopping")}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  cartEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: s(20),
  },
  headerText: {
    fontSize: s(20),
    color: AppColors.text,
    marginTop: vs(12),
    marginBottom: vs(8),
  },
  descriptionText: {
    fontSize: s(16),
    color: AppColors.textMuted,
    textAlign: "center",
  },
  startShoppingButton: {
    marginTop: vs(20),
    backgroundColor: AppColors.primary,
    borderRadius: s(25),
    paddingHorizontal: s(28),
    paddingVertical: vs(14),
    borderWidth: 1,
    borderColor: AppColors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  startShoppingButtonText: {
    color: AppColors.textOnPrimary,
  },
});
