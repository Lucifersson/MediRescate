import LogOutComponent from "@/components/LogOut/LogOutComponent";
import OperarioComponent from "@/components/OperarioComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperarios } from "@/hooks/useOperarios";
import { OperariosAdmin } from "@/types/types";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminOperariosScreen = () => {
  const { logout } = useAuthContext();

  const { operarios, solicitarOperariosTodos } = useOperarios();

  //HACK: forma provisional de actualizar los datos de la vista empleado
  //NOTE: comentar para que funcione unicamente front
  useEffect(() => {
    // Llamada inicial inmediata para no esperar 5 segundos al abrir la pantalla
    solicitarOperariosTodos();

    const intervalo = setInterval(() => {
      console.log("Actualizando lista de operarios...");
      solicitarOperariosTodos();
    }, 5000); // 5000ms = 5 segundos

    // 3. LIMPIEZA: Muy importante para que no siga llamando al salir de la pantalla
    return () => clearInterval(intervalo);
  }, []);

  const logOutHandler = () => {
    router.replace("/(stack)/login");
    logout();
  };

  //Traer arraylist de operarios,

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md mb-5">
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            className="w-[60px] h-[60px]"
            resizeMode="contain"
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
          />
        </View>
        <View className="flex-1 mx-4 items-center">
          <Text className="text-white font-bold text-lg leading-5">
            Panel Administrador
          </Text>
          <Text className="text-white/80 text-xs uppercase">
            Listado de operarios
          </Text>
        </View>
        <LogOutComponent onPress={() => logOutHandler()} />
      </View>

      <FlatList
        data={operarios}
        keyExtractor={(item) => item.id_operario.toString()}
        renderItem={({ item }) => <OperarioComponent operario={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AdminOperariosScreen;
