import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import Cart from "../screens/Cart/Cart";
import Profile from "../screens/Profile/Profile";
import { AppColors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
export type BottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.tabBarActive,
        tabBarInactiveTintColor: AppColors.tabBarInactive,
        tabBarActiveBackgroundColor: AppColors.tabBarActiveBackground,
        tabBarInactiveBackgroundColor: AppColors.tabBarInactiveBackground,
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: AppColors.tabBarActive,
          // height: vs(90),
          // Clear out any automatic OS/React Navigation default bottom padding
          // paddingBottom: vs(15),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t("tab_home"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: t("tab_cart"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t("tab_profile"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
