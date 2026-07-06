import {
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

interface ClearCartButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const ClearCartButton = ({
  onPress,
  title,
  backgroundColor = AppColors.surface,
  textColor = AppColors.text,
  style,
  styleTitle,
  disabled = false,
  icon,
}: ClearCartButtonProps) => {
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
      <AppText
        style={[styles.textTitle, { color: textColor }, styleTitle]}
        variant="bold"
      >
        {title}
      </AppText>
      {icon && <View style={{ marginLeft: s(8) }}>{icon}</View>}
    </TouchableOpacity>
  );
};

export default ClearCartButton;

const styles = StyleSheet.create({
  button: {
    height: vs(40),
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: s(25),
    flexDirection: "row",
    borderColor: AppColors.primary,
    borderWidth: 1.5,
    elevation: 4
  },
  textTitle: {
    fontSize: s(16),
  },
});
