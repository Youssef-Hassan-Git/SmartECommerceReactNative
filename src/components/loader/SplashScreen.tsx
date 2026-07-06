import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeView from "../views/AppSafeView";
import { IMAGES } from "../../constants/images";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";

const SplashScreen = () => {
  return (
    <AppSafeView>
      <View style={styles.containerSplashScreen}>
        <Image style={styles.image} source={IMAGES.appLogo} />
        <AppText variant={"bold"} style={{ fontSize: s(20) }}>
          Smart<Text style={styles.orangeText}>ECommerce</Text>
        </AppText>
      </View>
    </AppSafeView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  containerSplashScreen: {
     flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: vs(60)
  },
  image: {
    height: vs(250),
    width: s(250),
    marginBottom: vs(15),
  },
  orangeText: {
    color: AppColors.primary,
  },
});
