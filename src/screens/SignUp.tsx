import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FormSignUp } from "../components/FormSignUp";
// Tela de Cadastro
export function SignUp() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-slate-200 justify-center">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="height" enabled>
          <View className="mx-4">
            <View className="mb-4">
              <Text className="text-purple-600 text-4xl font-bold mb-2 text-center">
                Crie já a sua conta!
              </Text>
            </View>
            {/* Formulário de Cadastro */}
            <FormSignUp />
            <View className="flex-row items-center justify-center mt-4">
              <Text className="text-xl">
                Já possui uma conta!? Faça já o seu{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text className="text-xl font-bold text-purple-600">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

/*  o componente TouchableWithoutFeedback serve para 
    fechar o teclado do usuário sempre que clicar em 
    algum canto da tela 
*/

/*  o componente KeyboardAvoidingView serve para 
    o teclado do usuário for aberto, vai subir a tela para 
    não atrapalhar o usuário  
*/
