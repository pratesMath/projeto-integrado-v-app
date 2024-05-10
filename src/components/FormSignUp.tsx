import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as yup from "yup";
import { API } from "../utils/axios";
import { ControlledInput } from "./ControlledInput";

type FormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string | undefined;
};
// Componente para exibir o formulário de cadastro
export function FormSignUp() {
  const navigation = useNavigation();

  const createCustomerSchema = yup.object({
    name: yup.string().required("Informe seu Nome"),
    email: yup.string().email("E-mail inválido").required("Informe seu E-mail"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 dígitos")
      .required("Informe sua Senha"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "A senha de confirmação não confere"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createCustomerSchema),
  });

  async function handleCreateCustomer(data: FormData) {
    await API.post("/customers/cadastro", {
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.data.message === "Sua conta foi criada com êxito") {
          Alert.alert(
            "Cadastro",
            "Sua conta foi criada com êxito.\nFaça já o seu login"
          );
          if (response) {
            navigation.navigate("Login");
          }
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.message === "Cliente já existe!") {
          Alert.alert("Ops", "Você já possui uma conta");
        } else {
          Alert.alert("Ops", "Ocorreu um erro.\nTente mais tarde!");
        }
      });
  }

  return (
    <View>
      {/* Nome */}
      <ControlledInput
        control={control}
        name={"name"}
        iconName="user"
        placeholder="Nome"
        autoCapitalize="words"
        error={errors.name}
      />
      {/* E-mail */}
      <ControlledInput
        control={control}
        name={"email"}
        iconName="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      {/* Senha */}
      <ControlledInput
        control={control}
        name={"password"}
        iconName="lock"
        placeholder="Senha"
        secureTextEntry
        error={errors.password}
      />
      {/* Confirmação de senha */}
      <ControlledInput
        control={control}
        name={"confirmPassword"}
        iconName="lock"
        placeholder="Confirme sua Senha"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <TouchableOpacity
        className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        onPress={handleSubmit(handleCreateCustomer)}
      >
        <Feather name="check" size={20} color={colors.white} />
        <Text className="font-bold text-base text-white ml-2 uppercase">
          Finalizar Cadastro
        </Text>
      </TouchableOpacity>
    </View>
  );
}
