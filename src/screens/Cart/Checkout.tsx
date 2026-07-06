import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import AppSafeView from "../../components/views/AppSafeView";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SHIPPING_FEES, TAXES } from "../../constants/constants";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../navigation/BottomTabs";
import { RootStackParamList } from "../../navigation/RootStack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { emptyCart } from "../../store/reducers/cartSlice";
import { useTranslation } from "react-i18next";

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Checkout">,
  BottomTabNavigationProp<BottomTabParamList>
>;
const Checkout = () => {
  const { t } = useTranslation();
  const { userData } = useSelector((state: RootState) => state.userSlice);
  const { cartItems } = useSelector((state: RootState) => state.cartSlice);
  const [isLoading, setIsLoading] = useState(false);
  const totalCartPrices = cartItems.reduce((acc, item) => acc + item.sum, 0);
  const totalPrice = totalCartPrices + TAXES + SHIPPING_FEES;
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const schema = yup
    .object({
      fullName: yup
        .string()
        .required(t("auth_name_required"))
        .min(3, t("auth_name_min")),
      phoneNumber: yup
        .string()
        .required(t("auth_phone_required"))
        .matches(/^01[0125]\d{8}$/, t("auth_phone_invalid"))
        .min(10, t("auth_phone_min")),
      detailedAddress: yup
        .string()
        .required(t("auth_address_required"))
        .min(15, t("auth_address_min")),
    })
    .required();
  type formData = yup.InferType<typeof schema>;
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const saveOrder = async (formData: formData) => {
    try {
      setIsLoading(true);
      const orderBody = {
        ...formData,
        cartItems,
        totalCartPrices,
        createdAt: new Date(),
        totalPrice,
      };

      const userOrderRef = collection(
        doc(db, "users", userData!.uid),
        "orders",
      );
      await addDoc(userOrderRef, orderBody);

      const ordersRef = collection(db, "orders");
      await addDoc(ordersRef, orderBody);
      navigation.goBack();
      setIsLoading(false);
      showMessage({
        type: "success",
        message: t("cart_order_success"),
        icon: "default",
      });
      dispatch(emptyCart());
    } catch (error) {
      console.log("====================================");
      console.log("Error saving order: ", error);
      console.log("====================================");
      showMessage({
        type: "danger",
        message: t("cart_order_error"),
        icon: "default",
      });
    }
  };

  return (
    <AppSafeView>
      <View style={styles.checkoutSpacing}>
        <View style={styles.inputContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder={t("cart_full_name_placeholder")}
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder={t("cart_phone_placeholder")}
          />
          <AppTextInputController
            control={control}
            name={"detailedAddress"}
            placeholder={t("cart_address_placeholder")}
          />
        </View>

        <AppButton
          style={{ marginBottom: vs(30) }}
          title={t("cart_confirm")}
          onPress={handleSubmit(saveOrder)}
           isLoading={isLoading}
        />
      </View>
    </AppSafeView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  checkoutSpacing: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    paddingHorizontal: s(12),
    marginHorizontal: s(12),
    paddingVertical: vs(12),
    marginVertical: vs(12),
    borderWidth: s(2),
    borderColor: AppColors.disabled,
    borderRadius: s(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
