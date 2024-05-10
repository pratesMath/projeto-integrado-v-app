import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

type CustomerReservationsProps = {
  title: string;
  address: string;
  startDate: string;
  endDate: string;
  imageURL: string;
  customerReservationId: string;
};
// Componente para exibir container com reservas do usuário
export function CustomerReservations(props: CustomerReservationsProps) {
  const navigation = useNavigation();
  return (
    <View className="mb-2 mx-4 bg-[#113] rounded-md p-2">
      <View className="flex-row gap-2">
        {/* Imagem */}
        <Image
          source={{ uri: props.imageURL }}
          className="w-40 h-28 rounded-md"
          resizeMode="cover"
        />
        {/* Título, Endereço, Data de Início e Fim */}
        <View className=" flex-1 justify-between">
          <View>
            <Text className="text-white font-bold text-lg uppercase">
              {props.title}
            </Text>
            <Text className="text-slate-400 font-regular text-sm">
              {props.address}
            </Text>
            <Text className="text-slate-400 font-regular text-sm">
              {props.startDate + " - " + props.endDate}
            </Text>
          </View>
          {/* Link para a tela de detalhes da reserva do usuário */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-white rounded-md"
            key={props.customerReservationId}
            onPress={() => {
              navigation.navigate("CustomerReservationDetail", {
                customerReservationId: props.customerReservationId,
              });
            }}
          >
            <Feather name="eye" size={24} color={colors.purple[600]} />
            <Text className="text-purple-600 text-center p-2 font-bold">
              Acessar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
