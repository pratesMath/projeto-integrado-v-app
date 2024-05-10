import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "tailwindcss/colors";
import { CustomOptions } from "../@types/navigation";
import { DrawerContent } from "../components/DrawerContent";
import { CustomerProfile } from "../screens/CustomerProfile";
import { TabRoutes } from "./tabs.route";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        title: "Obsidian Hotéis",
        headerTitleStyle: {
          color: colors.purple[600],
          fontSize: 36,
        },
        drawerStyle: {
          width: "50%",
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {/* Telas: Home e Novas Reservas, + telas de detalhes da reserva */}
      <Drawer.Screen
        name="Main"
        component={TabRoutes}
        options={
          {
            title: "Obsidian Hotéis",
            iconName: "home",
            isDivider: true,
          } as CustomOptions
        }
      />
      {/* Tela de Perfil do Usuário */}
      <Drawer.Screen
        name="Profile"
        component={CustomerProfile}
        options={
          {
            title: "Obsidian Hotéis",
            iconName: "user",
            isDivider: true,
          } as CustomOptions
        }
      />
    </Drawer.Navigator>
  );
}
