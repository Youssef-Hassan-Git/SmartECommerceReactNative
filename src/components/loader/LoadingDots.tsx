import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface LoadingDotsProps {
  color?: string;
  size?: number;
  spacing?: number;
}

const LoadingDots = ({
  color = "#FFFFFF",
  size = 6,
  spacing = 4,
}: LoadingDotsProps) => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  const animate = (value: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);

  return (
    <View style={styles.container}>
      {[dot1, dot2, dot3].map((opacity, index) => (
        <Animated.View
          key={index}
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginHorizontal: spacing / 2,
              backgroundColor: color,
              opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default LoadingDots;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});