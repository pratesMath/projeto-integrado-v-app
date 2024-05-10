import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import colors from "tailwindcss/colors";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { Slider } from "../components/Slider";
import { useAppAuth } from "../contexts/AuthContext";
import { API } from "../utils/axios";

interface ScreenParams {
  bookingId: string;
}
export function ReservationDetail() {
  const route = useRoute();
  const { bookingId } = route.params as ScreenParams;
  const { user } = useAppAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrlArr, setImageUrlArr] = useState(Array<string>);
  const [availableRooms, setAvailableRooms] = useState(Array<string>);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModalStartDate, setOpenModalStartDate] = useState(false);
  const [openModalEndDate, setOpenModalEndDate] = useState(false);
  const today = new Date();
  const setInitialDate = new Date(today.setDate(today.getDate()));
  const initialDate = getFormatedDate(setInitialDate, "YYYY/MM/DD");
  async function fetchData() {
    try {
      setLoading(true);
      const response = await API.get(`/bookings/${bookingId}`);
      console.log(response.data);
      setBookingName(response.data.bookingName);
      setAddress(response.data.address);
      setImageUrlArr(response.data.imageUrlArr);
      setAvailableRooms(response.data.availableRoomsArr);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar a reserva solicitada.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  if (loading) {
    return <Loading />;
  }
  function handleOpenModalStartDate() {
    setOpenModalStartDate(!openModalStartDate);
  }
  function handleOpenModalEndDate() {
    setOpenModalEndDate(!openModalEndDate);
  }
  function handleToggleRoom(roomIndex: number) {
    if (selectedRooms.includes(roomIndex)) {
      setSelectedRooms((prevState) =>
        prevState.filter((room) => room !== roomIndex)
      );
    } else {
      setSelectedRooms((prevState) => [...prevState, roomIndex]);
    }
  }
  async function handleCreateReservation() {
    try {
      if (selectedRooms.length <= 0) {
        return Alert.alert("Nova Reserva", "Selecione Pelo Menos um Quarto.");
      }
      if (!startDate) {
        return Alert.alert("Nova Reserva", "Informe a Data de Entrada.");
      }
      if (!endDate) {
        return Alert.alert("Nova Reserva", "Informe a Data de Saída.");
      }
      const customerSelectedRooms = availableRooms.filter((room) =>
        selectedRooms.includes(availableRooms.indexOf(room))
      );
      console.log(customerSelectedRooms, startDate, endDate);
      await API.post("/customer_reservations/cadastro", {
        bookingId: bookingId,
        customerId: user!.customerId,
        startDate: startDate,
        endDate: endDate,
        customerSelectedRooms: customerSelectedRooms,
      })
        .then((response) => {
          console.log(response.data);
          Alert.alert("Nova Reserva", "Nova reserva adicionada com êxito!");
          setSelectedRooms([]);
          setStartDate("");
          setEndDate("");
          if (
            response.data.message === "Sua reserva foi cadastrada com êxito!"
          ) {
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
      Alert.alert("Ops", "Não foi possível cadastrar sua reserva");
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
            <View className="w-full">
              {/* botão para abrir modal */}
              <TouchableOpacity
                className="w-full h-14 flex-row items-center justify-center bg-slate-200 rounded-md my-2 border border-[#113]"
                activeOpacity={0.7}
                onPress={handleOpenModalStartDate}
              >
                <Text className="text-purple-600 text-2xl font-regular font-bold">
                  {startDate ? dayjs(startDate).format("DD/MM/YYYY") : ""}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={openModalStartDate}
              >
                <View className="flex-1 items-center justify-center">
                  <View className="bg-[#113] items-center justify-center rounded-2xl p-[35px] w-[90%]">
                    <DatePicker
                      mode="calendar"
                      minimumDate={initialDate}
                      selected={startDate}
                      onDateChange={(date) => {
                        setStartDate(date);
                      }}
                      onSelectedChange={(date) => {
                        setStartDate(date);
                      }}
                      options={{
                        backgroundColor: "#113",
                        textHeaderColor: "#fff",
                        textDefaultColor: "#FFFFFF",
                        selectedTextColor: "#9333ea",
                        mainColor: "#fff",
                        textSecondaryColor: "#FFFFFF",
                        borderColor: "#9333ea",
                      }}
                    />
                    <TouchableOpacity
                      onPress={handleOpenModalStartDate}
                      activeOpacity={0.7}
                      className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md"
                    >
                      <Feather name="check" size={20} color={colors.white} />
                      <Text className="font-bold text-base text-white ml-2">
                        Definir Data de Entrada
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          {/* Data de saída */}
          <View className="flex-1 my-2 flex-col">
            <Text className="text-[#113] text-2xl font-bold text-center">
              Data de Saída
            </Text>
            <View className="w-full">
              {/* botão para abrir modal */}
              <TouchableOpacity
                className="w-full h-14 flex-row items-center justify-center bg-slate-200 rounded-md my-2 border border-[#113]"
                activeOpacity={0.7}
                onPress={handleOpenModalEndDate}
              >
                <Text className="text-purple-600 text-2xl font-regular font-bold">
                  {endDate ? dayjs(endDate).format("DD/MM/YYYY") : ""}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={openModalEndDate}
              >
                <View className="flex-1 items-center justify-center">
                  <View className="bg-[#113] items-center justify-center rounded-2xl p-[35px] w-[90%]">
                    <DatePicker
                      mode="calendar"
                      minimumDate={initialDate}
                      selected={endDate}
                      onDateChange={(date) => {
                        setEndDate(date);
                      }}
                      onSelectedChange={(date) => {
                        setEndDate(date);
                      }}
                      options={{
                        backgroundColor: "#113",
                        textHeaderColor: "#fff",
                        textDefaultColor: "#FFFFFF",
                        selectedTextColor: "#9333ea",
                        mainColor: "#fff",
                        textSecondaryColor: "#FFFFFF",
                        borderColor: "#9333ea",
                      }}
                    />
                    <TouchableOpacity
                      onPress={handleOpenModalEndDate}
                      activeOpacity={0.7}
                      className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md"
                    >
                      <Feather name="check" size={20} color={colors.white} />
                      <Text className="font-bold text-base text-white ml-2">
                        Definir Data de Saída
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        {/* Quartos disponíveis */}
        <View className="flex flex-col">
          <Text className="text-[#113] text-2xl font-bold">
            Quartos disponíveis
          </Text>
          <View className="mt-2">
            {availableRooms.map((room, index) => (
              <Checkbox
                key={room}
                title={room}
                checked={selectedRooms.includes(index)}
                onPress={() => handleToggleRoom(index)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateReservation}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-bold text-base text-white ml-2 uppercase">
            Confirmar Reserva
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
