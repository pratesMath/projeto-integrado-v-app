import { ActivityIndicator, View } from "react-native";

// Componente para exibir o loading do App ao longo do uso
export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-200">
      <ActivityIndicator size={36} color="#9333ea" />
    </View>
  );
}
