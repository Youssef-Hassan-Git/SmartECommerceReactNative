import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IMAGES } from "../../constants/images";
import { s, vs } from "react-native-size-matters";
import { paddingHorizontal } from "../../styles/stylesConstant";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { showMessage } from "react-native-flash-message";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const schema = yup
    .object({
      fullName: yup
        .string()
        .required(t("auth_name_required"))
        .min(3, t("auth_name_min")),
      email: yup
        .string()
        .email(t("auth_valid_email"))
        .required(t("auth_email_required")),
      password: yup
        .string()
        .required(t("auth_password_required"))
        .min(6, t("auth_password_min")),
    })
    .required();
  type formData = yup.InferType<typeof schema>;
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const registerForm = async (data: formData) => {
    try {
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredentials.user, {
      displayName: data.fullName,
    });

      showMessage({
        type: "success",
        message: t("auth_signup_success"),
        icon: "auto",
        duration: 2000,
      });
      const userDataObj = {
        uid: userCredentials.user.uid,
      };

      dispatch(setUserData(userDataObj));
      navigation.navigate("BottomTabs");
    } catch (error: any) {
      let errMsg = "";
      if (error.code === "auth/email-already-in-use") {
        errMsg = t("auth_email_in_use");
      } else if (error.code === "auth/invalid-email") {
        errMsg = t("auth_invalid_email");
      } else if (error.code === "auth/weak-password") {
        errMsg = t("auth_weak_password");
      } else {
        errMsg = t("auth_signup_error");
      }
      showMessage({
        type: "danger",
        message: errMsg,
        icon: "default",
      });

      console.log(error);
    }finally {
    setIsLoading(false);
  }
  };

  return (
    <View style={styles.signInContainer}>
      <Image source={IMAGES.appLogo} style={styles.logoStyle} />
      <AppText
        variant="bold"
        style={{
          color: AppColors.primary,
          marginBottom: vs(6),
        }}
      >
        {t("auth_create_account_title")}
      </AppText>
      <AppText
        style={{
          color: AppColors.textMuted,
          marginBottom: vs(12),
        }}
        variant="regular"
      >
        {t("auth_create_account_prompt")}{" "}
        <Text style={styles.orangeText}>{t("auth_brand_ecommerce")}</Text>
      </AppText>
      <AppTextInputController
        leftIcon={
          <Ionicons
            name="person-outline"
            size={22}
            color={AppColors.textMuted}
          />
        }
        control={control}
        name="fullName"
        placeholder={t("auth_full_name_placeholder")}
        keyboardType={"default"}
      />
      <AppTextInputController
        leftIcon={
          <Ionicons name="mail" size={22} color={AppColors.textMuted} />
        }
        control={control}
        name="email"
        placeholder={t("auth_email_placeholder")}
        keyboardType={"email-address"}
      />
      <AppTextInputController
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={AppColors.textMuted}
          />
        }
        rightIcon={
          <Ionicons
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            size={22}
            color={AppColors.textMuted}
            onPress={() => setHidePassword((prev) => !hidePassword)}
          />
        }
        control={control}
        name="password"
        placeholder={t("auth_password_placeholder")}
        secureTextEntry={hidePassword}
        keyboardType={"default"}
      />
      <AppText variant={"bold"} style={{ marginBottom: vs(15) }}>
        {t("auth_brand_smart")}{" "}
        <Text style={styles.orangeText}>{t("auth_brand_ecommerce")}</Text>
      </AppText>
      <AppButton
        title={t("auth_sign_up_button")}
        onPress={handleSubmit(registerForm)}
        isLoading={isLoading}
      />
      <AppText style={{ marginTop: vs(12) }} variant="medium">
        {t("auth_or_separator")}
      </AppText>
      <AppButton
        title={t("auth_login_button")}
        backgroundColor={AppColors.surface}
        textColor={AppColors.primary}
        style={styles.signInStyling}
        isLoading={isLoading}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </View>
  );
};

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, "SignUp">,
  StackNavigationProp<RootStackParamList>
>;

export default SignUp;

const styles = StyleSheet.create({
  logoStyle: {
    height: vs(150),
    width: s(150),
    marginBottom: vs(25),
  },
  signInContainer: {
    alignItems: "center",
    paddingHorizontal: paddingHorizontal,
  },
  signInStyling: {
    marginVertical: vs(15),
    borderWidth: 1.5,
    borderColor: AppColors.primary,
  },
  orangeText: {
    color: AppColors.primary,
  },
});
