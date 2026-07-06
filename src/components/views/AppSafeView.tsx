import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ViewStyle,
} from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s, vs } from "react-native-size-matters";

interface AppSafeViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const AppSafeView = ({ children, style }: AppSafeViewProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSafeView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
});
