import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CustomerReservationDetail } from "../screens/CustomerReservationDetail";
import { Home } from "../screens/Home";

const Stack = createNativeStackNavigator();
// Telas em Stack: Home e Detalhes de reserva do cliente
export function StackCustomerRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen
        name="CustomerReservationDetail"
        component={CustomerReservationDetail}
      />
    </Stack.Navigator>
  );
}
