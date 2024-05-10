import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

type AvailableReservationsProps = {
  title: string;
  address: string;
  availableRoomsLength: number;
  imageURL: string;
  bookingId: string;
};
// Componente para exibir container com reservas disponíveis
export function AvailableReservations(props: AvailableReservationsProps) {
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
        {/* Título, endereço, e quartos disponíveis */}
        <View className=" flex-1 justify-between">
          <View>
            <Text className="text-white font-bold text-lg uppercase">
              {props.title}
            </Text>
            <Text className="text-slate-400 font-regular text-sm">
              {props.address}
            </Text>
            <Text className="text-slate-400 font-regular text-sm">
              {props.availableRoomsLength} Quartos disponíveis
            </Text>
          </View>
          {/* Link para a tela de detalhes da reserva */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-white rounded-md"
            key={props.bookingId}
            onPress={() => {
              navigation.navigate("ReservationDetail", {
                bookingId: props.bookingId!,
              });
            }}
          >
            <Feather name="info" size={24} color={colors.purple[600]} />
            <Text className="text-purple-600 font-bold text-center p-2 uppercase">
              Saiba Mais
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
