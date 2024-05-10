import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StackCustomerRoutes } from "./stackCustomer.route";
import { StackReservationRoutes } from "./stackReservation.route";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#113",
          borderTopWidth: 0,
          minHeight: 60,
        },
        tabBarItemStyle: {
          paddingBottom: 16,
          paddingTop: 12,
        },
        tabBarShowLabel: false /*  */,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#9333ea",
      }}
    >
      {/* Telas: Home e Detalhes da reserva do cliente */}
      <Tab.Screen
        name="Home"
        component={StackCustomerRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />
      {/* Telas: Novas Reservas e Detalhes da reserva  */}
      <Tab.Screen
        name="New"
        component={StackReservationRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" color={color} size={size} />
          ),
          tabBarLabel: "Novo",
        }}
      />
    </Tab.Navigator>
  );
}
