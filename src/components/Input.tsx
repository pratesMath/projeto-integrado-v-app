import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

type IconNameProps = keyof typeof Feather.glyphMap;

export type InputProps = TextInputProps & {
  iconName?: IconNameProps;
  value?: string;
};
// Componente para exibir o Input de formulário
export function Input({ iconName, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <View className="flex-row mb-1">
      <View
        className={clsx("h-12 w-12 justify-center items-center bg-white", {
          "border-b border-b-purple-600": isFocused,
        })}
      >
        <Feather
          name={iconName}
          size={28}
          color={isFocused || isFilled ? "#9333ea" : "#ccc"}
        />
      </View>

      <TextInput
        className={clsx("flex-1 bg-white text-[#133] pl-2 text-xl", {
          "border-b border-b-purple-600": isFocused,
        })}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        {...rest}
      />
    </View>
  );
}
