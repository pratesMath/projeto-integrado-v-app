import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { Pressable, PressableProps, Text, View } from "react-native";

export type IconNameProps = keyof typeof Feather.glyphMap;

type DrawerContentButtonProps = PressableProps & {
  title: string;
  isFocused?: boolean;
  isDivider?: boolean;
  iconName: IconNameProps;
};
// Componente para exibir os botões e títulos de conteúdo da rota Drawer
export function DrawerContentButton({
  title,
  isFocused,
  isDivider,
  iconName,
  ...rest
}: DrawerContentButtonProps) {
  return (
    <Pressable
      className={clsx("py-2 pt-4 w-full", {
        "border-b ml-10 border-white": isDivider,
      })}
      {...rest}
    >
      <View
        className={clsx("flex-row items-center gap-2 h-14 px-6 -ml-2 w-full", {
          "-ml-14": isDivider,
          "bg-white rounded-r-full": isFocused,
        })}
      >
        <Feather
          name={iconName}
          size={28}
          color={isFocused ? "#9333ea" : "#fff"}
        />
        <Text
          className={clsx("text-white text-base flex-1", {
            "text-[#9333ea]": isFocused,
          })}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
