import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("screen");

type PaginationProps = {
  data: string[];
  scrollX: Animated.Value;
  index?: number;
};
// Componente para exibir a paginação com base no índice do SlideItem atual do Slider
export function Pagination({ data, scrollX }: PaginationProps) {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        // Trabalhando com inputRange com base na largura da tela
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        // Trabalhando com animações de interpolação no eixo X
        // Causa efeito de suavidade
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [15, 40, 15],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccf", "#113", "#99f"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 16,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 100,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: "#113",
  },
});
