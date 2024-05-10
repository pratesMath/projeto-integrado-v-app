import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image, ScrollView, Text, View } from "react-native";
import { CustomOptions } from "../@types/navigation";
import { DrawerContentButton } from "./DrawerContentButton";

// Componente para exibir o conteúdo da rota Drawer
export function DrawerContent(drawerProps: DrawerContentComponentProps) {
  return (
    <View className="flex-1 bg-[#113] overflow-hidden">
      {/* Logo do App */}
      <View className="items-center mt-24 pb-6 border-b border-white">
        <Image
          source={require("../assets/appLogo.png")}
          className="w-28 rounded-3xl"
          resizeMode="cover"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        {/* map() de conjunto de telas na Drawer */}
        <View className="mt-2">
          {drawerProps.state.routes.map((route, index) => {
            const isFocused = drawerProps.state.index === index;
            const options = drawerProps.descriptors[route.key]
              .options as CustomOptions;

            if (options.title === undefined) {
              return;
            }

            const onPress = () => {
              const event = drawerProps.navigation.emit({
                type: "drawerItemPress",
                canPreventDefault: true,
                target: route.key,
              });
              if (!isFocused && !event?.defaultPrevented) {
                drawerProps.navigation.navigate(route.name, route.params);
              }
            };

            return (
              <View key={route.key}>
                {options.sectionTitle && (
                  <Text className="text-white uppercase">
                    {options.sectionTitle}
                  </Text>
                )}
                <DrawerContentButton
                  onPress={onPress}
                  title={options.title}
                  iconName={options.iconName}
                  isDivider={options.isDivider}
                  isFocused={isFocused}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
