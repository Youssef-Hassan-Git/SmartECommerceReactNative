import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppSafeView from "./src/components/views/AppSafeView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/RootStack";
import { useFonts } from "expo-font";
import { AppColors } from "./src/styles/colors";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import { useEffect } from "react";
import { seedProducts } from "./src/config/seedProducts";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from 'expo-splash-screen';
export default function App() {
  const [fontsLoaded] = useFonts({
    "inter-bold": require("./src/assets/fonts/Inter_18pt-Bold.ttf"),
    "inter-medium": require("./src/assets/fonts/Inter_18pt-Medium.ttf"),
    "inter-regular": require("./src/assets/fonts/Inter_18pt-Regular.ttf"),
    "inter-semibold": require("./src/assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />; // or a loading indicator
  }

  // Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

  return (

    <Provider store={store}>
      <PersistGate persistor={persistor} >
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              backgroundColor={AppColors.surface}
              barStyle="dark-content"
            />
            <FlashMessage position="top" floating animated />

            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
