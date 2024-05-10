import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { useAppAuth } from "../contexts/AuthContext";

export function CustomerProfile() {
  const { signOut, user } = useAppAuth();
  // função de logout
  const handleSignOut = async () => {
    signOut();
  };
  // Tela do usuário
  return (
    <View className="flex-1 bg-slate-200">
      <ScrollView
        className="m-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-purple-600 text-5xl font-regular">
          Meu Perfil
        </Text>

        <View className="flex-1 justify-between">
          <View className="my-4 gap-y-1">
            {/* Nome */}
            <View className="flex-row gap-2 items-center">
              <Text className="text-[#113] text-2xl font-bold">
                Nome Completo
              </Text>
              <Text className="text-[#113] text-xl">{user?.name}</Text>
            </View>
            {/* E-mail */}
            <View className="flex-row gap-2 items-center">
              <Text className="text-[#113] text-2xl font-bold">
                E-mail de Cadastro
              </Text>
              <Text className="text-[#113] text-xl">{user?.email}</Text>
            </View>
            {/* Senha */}
            <View className="flex-row gap-2 items-center">
              <Text className="text-[#113] text-2xl font-bold">Senha</Text>
              <Text className="text-[#113] text-xl">
                {user?.password && `*`.repeat(user?.password.length / 3)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="w-32 h-14 flex-row items-center justify-center bg-red-600 rounded-md mt-6"
            activeOpacity={0.7}
            onPress={handleSignOut}
          >
            <Feather name="log-out" size={20} color={colors.white} />
            <Text className="font-semibold text-base text-white ml-2 uppercase">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
