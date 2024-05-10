import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { New } from "../screens/New";
import { ReservationDetail } from "../screens/ReservationDetail";

const Stack = createNativeStackNavigator();
// Telas: Nova reserva e detalhes de reservas disponíveis
export function StackReservationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Nova reserva */}
      <Stack.Screen name="Reservation" component={New} />
      {/* Detalhes da reserva */}
      <Stack.Screen name="ReservationDetail" component={ReservationDetail} />
    </Stack.Navigator>
  );
}
