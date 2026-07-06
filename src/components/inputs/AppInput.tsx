import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  StyleProp,
} from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
interface AppInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
  style?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
const AppInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  leftIcon,
  rightIcon,
  ...otherProps
}: AppInputProps) => {
  return (
<View style={[styles.inputContainer, style]}>
  {leftIcon}

  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={AppColors.textMuted}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    {...otherProps}
    style={[styles.input, { color: AppColors.text }]}
    
  />
  {rightIcon}
</View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
  flex: 1,
  fontSize: s(16),
  marginLeft: s(10),
  },
  inputContainer:{
    height: vs(40),
    width: "90%",
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: AppColors.inputBackground,
    paddingHorizontal: s(15),
    marginVertical: vs(15),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    
  }

});
