import { StyleSheet } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import ProfileSection from "./ProfileSection";
import HomeHeader from "../../components/headers/HomeHeader";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStack";
import { BottomTabParamList } from "../../navigation/BottomTabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/languages/LanguageBottomSheet";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Profile">,
  StackNavigationProp<RootStackParamList>
>;
const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const userName =
  useSelector((state: RootState) => state.userSlice.displayedName) || "";
  const handleLogOut = async () => {
    await AsyncStorage.removeItem("USER_DATA");
    navigation.navigate("AuthStack");
    await signOut(auth);
  };
  return (
    <AppSafeView>
      <HomeHeader />
      <AppText variant="bold" style={{ marginLeft: s(8), marginTop: vs(12) }}>
        {t("profile_welcome")}, {userName}
      </AppText>
      <ProfileSection
        title={t("profile_my_orders")}
        onPress={() => navigation.navigate("ProfileOrders")}
      />
      <ProfileSection
        title={t("profile_languages")}
        onPress={() => SheetManager.show("LANG_SHEET")}
      />
      <LanguageBottomSheet />
      <ProfileSection title={t("profile_logout")} onPress={handleLogOut} />
    </AppSafeView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
