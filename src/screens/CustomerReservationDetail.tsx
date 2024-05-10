import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { Loading } from "../components/Loading";
import { Slider } from "../components/Slider";
import { API } from "../utils/axios";

interface ScreenParams {
  customerReservationId: string;
}
// Tela de detalhes da reserva do usuário
export function CustomerReservationDetail() {
  const route = useRoute();
  const { customerReservationId } = route.params as ScreenParams;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  // campos preenchidos pela API
  const [bookingName, setBookingName] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrlArr, setImageUrlArr] = useState(Array<string>);
  const [selectedRoomsArr, setSelectedRoomsArr] = useState(Array<string>);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  async function fetchData() {
    try {
      setLoading(true);
      await API.get(`/customer_reservations/${customerReservationId}`).then(
        (response) => {
          console.log(response.data);

          setSelectedRoomsArr(response.data.selectedRoomsArr);
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);
          setBookingName(response.data.booking.bookingName);
          setAddress(response.data.booking.address);
          setImageUrlArr(response.data.booking.imageUrlArr);

          if (response.data.message === "Sua reserva não foi encontrada!") {
            navigation.navigate("HomeScreen");
          }
        }
      );
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar a reserva solicitada.");
      if (error) {
        navigation.navigate("HomeScreen");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      // Chamando função de fetch dos dados com axios
      //ao backend sempre que o usuário entrar em tela
      fetchData();
    }, [])
  );
  // Vai exibir o Loading até que as reservas dos clientes sejam carregadas
  if (loading) {
    return <Loading />;
  }
  // função para cancelamento da reserva do usuário
  async function handleCancelReservation() {
    try {
      const today = new Date();
      // Regra de negócio adicionada: nenhum usuário pode cancelar
      // uma reserva se a data de hoje for posterior
      // a data de início da reserva
      if (dayjs(today).isAfter(startDate)) {
        return Alert.alert(
          "Cancelar Reserva",
          "Não é possível cancelar uma reserva após sua data da entrada."
        );
      }

      console.log(today, startDate);
      await API.delete(
        `/customer_reservations/cancelar/${customerReservationId}`
      )
        .then((response) => {
          Alert.alert("Cancelar Reserva", "Reserva cancelada com êxito!");
          if (response) {
            navigation.navigate("HomeScreen");
          }
        })
        .catch((e) => {
          if (e) {
            console.log("Ocorreu um erro", e.response.data);
          }
        });
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível cancelar sua reserva");
    }
  }

  return (
    <View className="flex-1 bg-slate-200 px-4 pt-4">
      {/* Nome da Reserva */}
      <View className="my-2 flex-col mb-2 border-b border-b-[#113] pb-2">
        <Text className="text-[#113] text-2xl font-bold">Reserva</Text>
        <Text className="text-purple-600 text-6xl font-bold">
          {bookingName}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Carousel de imagens */}
        <Slider imageUrlArr={imageUrlArr} />
        {/* Endereço da reserva */}
        <View className="flex-1 my-2 flex-col">
          <Text className="text-[#113] text-2xl font-bold">Endereço</Text>
          <Text className="text-purple-600 text-3xl font-regular">
            {address}
          </Text>
        </View>
        {/* Data de entrada e saída */}
        <View className="flex-row gap-2">
          {/* Data de entrada */}
          <View className="flex-1 my-2 flex-col">
            <Text className="text-[#113] text-2xl font-bold text-center">
              Data de Entrada
            </Text>
            <View className="w-full h-14 flex-row items-center justify-center bg-slate-200 rounded-md my-2 border border-[#113]">
              <Text className="text-purple-600 text-2xl font-regular font-bold">
                {dayjs(startDate).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
          {/* Data de saída */}
          <View className="flex-1 my-2 flex-col">
            <Text className="text-[#113] text-2xl font-bold text-center">
              Data de Saída
            </Text>
            <View className="w-full h-14 flex-row items-center justify-center bg-slate-200 rounded-md my-2 border border-[#113]">
              <Text className="text-purple-600 text-2xl font-regular font-bold">
                {dayjs(endDate).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        {/* Quartos reservados */}
        <View className="flex flex-col">
          <Text className="text-[#113] text-2xl font-bold">
            Seus quartos reservados
          </Text>
          <View className="mt-2">
            {selectedRoomsArr.map((room, index) => (
              <Text className="text-purple-600 text-2xl font-bold" key={index}>
                {room}
              </Text>
            ))}
          </View>
        </View>
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-red-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCancelReservation}
        >
          <Feather name="x" size={20} color={colors.white} />
          <Text className="font-bold text-base text-white ml-2 uppercase">
            Cancelar Reserva
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
