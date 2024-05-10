import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewToken,
} from "react-native";
import { Pagination } from "./Pagination";
import { SlideItem } from "./SlideItem";

type SliderProps = {
  imageUrlArr: string[];
};
// Componente para exibir o Slider/Carousel de imagens do App
// Chama os componentes SliderItem e Pagination para completar o slide de imagens
export function Slider({ imageUrlArr }: SliderProps) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (info.viewableItems[0]) {
        setIndex(info.viewableItems[0].index!);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View className="border-b border-b-[#133] mb-2">
      <FlatList
        data={imageUrlArr}
        renderItem={({ item }) => <SlideItem item={item} />}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={imageUrlArr} scrollX={scrollX} index={index} />
    </View>
  );
}
