import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import LoadingDots from "../loader/LoadingDots";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const AppButton = ({
  onPress,
  title,
  backgroundColor = AppColors.primary,
  textColor = AppColors.textOnPrimary,
  style,
  styleTitle,
  disabled = false,
  icon,
  isLoading,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: disabled ? AppColors.disabled : backgroundColor },
        style,
      ]}
      disabled={disabled}
    >
      {isLoading ? (
      <LoadingDots />
      ) : (
        <AppText
          style={[styles.textTitle, { color: textColor }, styleTitle]}
          variant="bold"
        >
          {title}
        </AppText>
      )}

      {icon && <View style={{ marginLeft: s(8) }}>{icon}</View>}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    height: vs(40),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: s(25),
    flexDirection: "row",
  },
  textTitle: {
    fontSize: s(16),
  },
});
