import React from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("screen");

type SliderItemProps = {
  item: string;
  index?: number;
};
// Componente para exibir imagem no Slider
export function SlideItem({ item, index }: SliderItemProps) {
  // Para animações no eixo X
  const translateXImage = new Animated.Value(50);
  // Timing para as animações ao gesto do usuário
  Animated.timing(translateXImage, {
    toValue: 0,
    duration: 1000 /* milissegundos */,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: item }}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: height / 2.8,
    alignItems: "center",
  },
  image: {
    flex: 0.9,
    width: "100%",
    backgroundColor: "#113",
  },
});
