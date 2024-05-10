import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { AvailableReservations } from "../components/AvailableReservations";
import { Loading } from "../components/Loading";
import { API } from "../utils/axios";

type BookingProps = Array<{
  bookingId: string;
  bookingName: string;
  address: string;
  imageUrlArr: string[];
  availableRoomsArr: string[];
}>;
// Tela de novas reservas
export function New() {
  const [loading, setLoading] = useState(false);
  // As reservas do usuário são carregadas pela API como um Array
  const [bookings, setBookings] = useState<BookingProps>();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await API.get("/bookings/todas");

      console.log(response.data);

      setBookings(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar as hotéis.");
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

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-slate-200">
      <View className="my-2 flex-col border-b border-b-[#113] mx-4">
        <Text className="text-purple-600 text-4xl m-4">
          Sua próxima reserva está aqui
        </Text>
      </View>
      {/* Listando as reservas */}
      {bookings && (
        <ScrollView
          className="flex-col"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {bookings.map((hotel) => {
            return (
              <AvailableReservations
                key={hotel.bookingId}
                imageURL={hotel.imageUrlArr[0]}
                title={hotel.bookingName}
                address={hotel.address}
                availableRoomsLength={hotel.availableRoomsArr.length}
                bookingId={hotel.bookingId}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
