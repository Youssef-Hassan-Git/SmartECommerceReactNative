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
import AntDesign from '@expo/vector-icons/AntDesign';
interface ShowSummaryButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: React.ReactNode;
  showSummaryCheckout: boolean
}

const ShowSummaryButton = ({
  onPress,
  title,
  backgroundColor = AppColors.surface,
  textColor = AppColors.text,
  style,
  styleTitle,
  disabled = false,
  icon,
  showSummaryCheckout
}: ShowSummaryButtonProps) => {
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
      {showSummaryCheckout ? 
      <AntDesign name="caret-down" size={24} color={AppColors.text} /> :
      <AntDesign name="caret-up" size={24} color={AppColors.text} />
      }
    </TouchableOpacity>
  );
};

export default ShowSummaryButton;

const styles = StyleSheet.create({
  button: {
    height: vs(40),
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: s(25),
    flexDirection: "row",
    marginVertical: vs(15),
    borderColor: AppColors.primary,
    borderWidth: 1.5,
    elevation: 4
  },
  textTitle: {
    fontSize: s(16),
  },
});
