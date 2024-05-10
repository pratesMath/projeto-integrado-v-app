import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API } from "../utils/axios";
// Interface de usuário autenticado
interface User {
  customerId: string;
  name: string;
  email: string;
  password: string;
  accessTokenJWT?: string;
}
// interface de contexto de autenticação
interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(userEmail: string, userPassword: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Armazenando usuário logado no App
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@PIV:user");
      const storagedToken = await AsyncStorage.getItem("@PIV:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setLoading(false);
        // para sempre enviar o token em toda requisição após o login
        API.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
      }
    }

    loadStorageData();
  }, []);
  // função de login
  async function signIn(userEmail: string, userPassword: string) {
    await API.post("/customers/login", {
      email: userEmail,
      password: userPassword,
    })
      .then((response) => {
        setUser(response.data.customerData);
        console.log("Usuário logado", response);

        API.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        Promise.all([
          AsyncStorage.setItem(
            "@PIV:user",
            JSON.stringify(response.data.customerData)
          ),
          AsyncStorage.setItem("@PIV:token", response.data.accessToken),
        ]);
        // Se login der certo, redireciona o usuário para a Drawer
        if (response) {
          navigation.navigate("Drawer");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.message === "E-mail ou Senha inválidos") {
          Alert.alert("Login", "E-mail ou Senha inválidos!");
        } else {
          Alert.alert("Ops", "Ocorreu um erro.\nTente mais tarde!");
        }
      });
  }
  // função de logout
  function signOut() {
    //usar axios aqui
    AsyncStorage.clear().then(() => {
      setUser(null);
      navigation.navigate("Login");
    });
  }
  // provider para usar o contexto partes específicas que precisam de autenticação
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exportando meu contexto criado pelo App
export function useAppAuth() {
  const context = useContext(AuthContext);

  return context;
}
