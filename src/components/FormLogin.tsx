import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as yup from "yup";
import { useAppAuth } from "../contexts/AuthContext";
import { ControlledInput } from "./ControlledInput";

type FormData = {
  email: string;
  password: string;
};
// Componente para exibir o formulário de login
export function FormLogin() {
  const createCustomerSchema = yup.object({
    email: yup.string().email().required("Informe seu E-mail"),
    password: yup.string().required("Informe sua Senha"),
  });

  const { signed, user, signIn } = useAppAuth();
  console.log(signed, user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createCustomerSchema),
  });

  async function handleLoginCustomer(data: FormData) {
    await signIn(data.email, data.password);
  }

  return (
    <View>
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
      <TouchableOpacity
        className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        onPress={handleSubmit(handleLoginCustomer)}
      >
        <Feather name="check" size={20} color={colors.white} />
        <Text className="font-bold text-base text-white ml-2 uppercase">
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
