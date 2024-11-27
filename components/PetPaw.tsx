import { StyleSheet, Animated, Text, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

export function PetPaw({ inverted = false }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -10,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
    return () => animatedValue.stopAnimation();
  }, []);

  const animatedStyle = {
    transform: [
      { translateY: animatedValue },
      { scaleX: inverted ? -1 : 1 },
    ],
  };

  // Envolvemos el emoji en un componente Text
  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.pawText}>🐾</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pawText: {
    fontSize: 24,
    marginHorizontal: 4,
  },
});