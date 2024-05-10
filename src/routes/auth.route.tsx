import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";
import { DrawerRoutes } from "./drawer.route";

const AuthStack = createNativeStackNavigator();
// Telas de autenticação: Login e Cadastro
// Tela Drawer, pós login
export function AuthStackRoutes() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {/* Telas necessárias para a autenticação do usuário */}
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      {/* Para o contexto de quando o usuário logar */}
      <AuthStack.Screen name="Drawer" component={DrawerRoutes} />
    </AuthStack.Navigator>
  );
}
