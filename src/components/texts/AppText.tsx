import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

interface AppTextProps {
  children: React.ReactNode;
  variant?: "medium" | "bold" | "regular" | "semiBold";
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: any;
}

const AppText = ({ children, variant = "medium", style, numberOfLines, ellipsizeMode, ...rest }: AppTextProps) => {
  return (
    <Text {...rest} style={[styles[variant], style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontSize: s(18),
    fontWeight: "bold",
    color: AppColors.text,
    fontFamily: AppFonts.Bold
  },
  medium: {
    fontSize: s(16),
    color: AppColors.text,
    fontFamily: AppFonts.Medium
},
regular: {
    fontSize: s(16),
    color: AppColors.text,
    fontFamily: AppFonts.Regular
},
semiBold: {
    fontSize: s(16),
    color: AppColors.text,
    fontFamily: AppFonts.SemiBold
} 

});
