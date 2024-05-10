import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { CustomerReservations } from "../components/CustomerReservations";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useAppAuth } from "../contexts/AuthContext";
import { API } from "../utils/axios";

type CustomerReservationProps = Array<{
  booking: {
    bookingName: string;
    address: string;
    imageUrlArr: string[];
  };
  customerId: string;
  startDate: Date;
  endDate: Date;
  customerReservationId: string;
}>;
// Tela Home
export function Home() {
  const { user } = useAppAuth();
  const [loading, setLoading] = useState(false);
  // As reservas do usuário são carregadas pela API como um Array
  const [customerReservations, setCustomerReservations] =
    useState<CustomerReservationProps>();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await API.get(
        `/customer_reservations/todas/${user?.customerId}`
      );

      console.log(response.data);

      setCustomerReservations(response.data);
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
  // Vai exibir o Loading até que as reservas dos clientes sejam carregadas
  if (loading) {
    return <Loading />;
  }
  return (
    <View className="flex-1 bg-slate-200">
      <Header />
      <View className="mb-2 border-b border-b-[#113] mx-4 pb-2">
        <Text className="text-purple-600 text-4xl font-regular">
          Suas reservas
        </Text>
      </View>
      {/* Listando as reservas */}
      {customerReservations && (
        <ScrollView
          className="flex-col"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {customerReservations.map((hotel) => {
            return (
              <CustomerReservations
                key={hotel.customerReservationId}
                title={hotel.booking.bookingName}
                address={hotel.booking.address}
                imageURL={hotel.booking.imageUrlArr[0]}
                startDate={dayjs(hotel.startDate).format("DD/MM/YYYY")}
                endDate={dayjs(hotel.endDate).format("DD/MM/YYYY")}
                customerReservationId={hotel.customerReservationId}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
