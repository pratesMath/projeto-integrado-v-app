import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { useAppAuth } from "../contexts/AuthContext";

// Componente para exibir Header do App (Tela Home)
export function Header() {
  const { user } = useAppAuth();
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between m-4">
      <View className="flex-row items-center">
        <Text className="text-[#113] font-regular text-2xl">Olá, </Text>
        <Text className="text-[#113] font-bold text-2xl">{user?.name}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-8 px-2 border border-purple-600 rounded-lg items-center bg-white"
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <Feather name="plus" color={colors.purple[600]} size={20} />
        <Text className="text-purple-600 ml-3 font-bold text-base uppercase">
          Nova Reserva
        </Text>
      </TouchableOpacity>
    </View>
  );
}
