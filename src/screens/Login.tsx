import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FormLogin } from "../components/FormLogin";

// Tela de Login
export function Login() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-slate-200 justify-center">
      <View className="flex-row items-center justify-center gap-2 px-4 my-8">
        <View className="bg-[#113] p-1 rounded-[50px]">
          <Image
            source={require("../assets/appLogo.png")}
            className="w-40 h-40 rounded-[44px]"
            resizeMode="cover"
          />
        </View>
        <Text className="text-5xl font-bold text-purple-600">
          Obsidian{"\n"}Hotéis
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <ScrollView className="mx-4">
            {/* Formulário de Login */}
            <FormLogin />
            <View className="flex-row items-center justify-center mt-4">
              <Text className="text-xl">
                Ainda não possui uma conta!? Faça já o seu{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text className="text-xl font-bold text-purple-600">
                  Cadastro
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
