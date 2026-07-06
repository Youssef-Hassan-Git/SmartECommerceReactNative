import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AppColors } from "../../styles/colors";

interface ProfileSectionProps {
  title: string;
  onPress: () => void;
}
const ProfileSection = ({ title, onPress }: ProfileSectionProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <AppText variant="medium">{title}</AppText>
      <MaterialIcons name="navigate-next" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: s(12),
    marginVertical: vs(15),
    paddingBottom: s(8),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.text,
  },
});
