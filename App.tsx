// Para trabalhar com gestos
import "react-native-gesture-handler";

import {
  KoHo_300Light,
  KoHo_400Regular,
  KoHo_600SemiBold,
  KoHo_700Bold,
  useFonts,
} from "@expo-google-fonts/koho";

import { StatusBar } from "react-native";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

export default function App() {
  // Carregando as fontes
  const [fontsLoaded] = useFonts({
    KoHo_300Light,
    KoHo_400Regular,
    KoHo_600SemiBold,
    KoHo_700Bold,
  });
  // Não retorna o App até que as fontes tenham sido carregadas
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
      <Routes />
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent
      />
    </>
  );
}
