import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AppInput from "./AppInput";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { s, vs } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
interface AppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean; 
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  keyboardType,
  secureTextEntry,
  leftIcon,
  rightIcon,
}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <AppInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              style={error && styles.error}
            />
            {error && (
              <View style={styles.errMsg}>
                <MaterialIcons name="error-outline" size={18} color="red" />
                <AppText
                  style={{
                    color: AppColors.danger,
                    fontSize: s(12),
                    textAlign: "center",
                    marginHorizontal: vs(6)
                  }}
                >
                  {error.message}
                </AppText>
              </View>
            )}
          </>
        );
      }}
    />
  );
};

export default AppTextInputController;

const styles = StyleSheet.create({
  error: {
    borderColor: AppColors.danger,
    
  },
  errMsg: {
    marginBottom: vs(10),
    marginTop: -vs(5),
    flexDirection: "row",
    justifyContent: "center",
    
  },
});
