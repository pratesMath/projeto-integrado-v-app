import { NavigationContainer } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import { AuthContextProvider, useAppAuth } from "../contexts/AuthContext";
import { AuthStackRoutes } from "./auth.route";
import { DrawerRoutes } from "./drawer.route";

export function Routes() {
  const { signed, loading } = useAppAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AuthContextProvider>
        {/* if ternário para verificar se o usuário está logado */}
        {/* se não estiver logado, é redirecionado as telas de login */}
        {/* caso contrário, pode acessar as demais telas pela Drawer (que dependem do usuário autenticado) */}
        {signed ? <DrawerRoutes /> : <AuthStackRoutes />}
      </AuthContextProvider>
    </NavigationContainer>
  );
}
