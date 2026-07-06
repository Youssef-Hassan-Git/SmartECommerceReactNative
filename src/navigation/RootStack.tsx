import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import { BottomTabs } from "./BottomTabs";
import { AppColors } from "../styles/colors";
import Checkout from "../screens/Cart/Checkout";
import ProfileOrders from "../screens/Profile/ProfileOrders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserData } from "../store/reducers/userSlice";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import SplashScreen from "../components/loader/SplashScreen";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../config/firebase";
import { useTranslation } from "react-i18next";
export type RootStackParamList = {
  AuthStack: undefined;
  BottomTabs: undefined;
  Checkout: undefined;
  ProfileOrders: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const RootStack = () => {
  // const dispatch = useDispatch();
  // const userData = useSelector((state: RootState) => state.userSlice.userData);
  // const isLoading = useSelector((state: RootState) => state.userSlice.isLoading);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const storedUserData = await AsyncStorage.getItem('USER_DATA');
  //     if (storedUserData) {
  //       dispatch(setUserData(JSON.parse(storedUserData)));

  //     }else{
  //       dispatch(setLoading(false))
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userData = useSelector((state: RootState) => state.userSlice.userData);
  const [IsLoadingFB, setIsLoadingFB] = useState(true);
  // const [userDataFB, setUserDataFB] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("====================================");
        console.log("User Signed In");
        console.log("====================================");
        setIsLoadingFB(false);
        console.log(firebaseUser?.displayName);
        dispatch(
          setUserData({
            uid: firebaseUser.uid,
            displayedName: firebaseUser.displayName,
          }),
        );
      } else {
        console.log("====================================");
        console.log("User Signed Out");
        console.log("====================================");
        setIsLoadingFB(false);
      }
    });
  }, []);

  if (IsLoadingFB) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "BottomTabs" : "AuthStack"}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        options={{ headerShown: true, title: t("cart_checkout") }}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        options={{ headerShown: true, title: t("profile_my_orders") }}
        name="ProfileOrders"
        component={ProfileOrders}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
