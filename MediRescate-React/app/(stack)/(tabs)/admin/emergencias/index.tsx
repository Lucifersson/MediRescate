import EmergenciaAdminComponent from "@/components/EmergenciaAdminComponent";
import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useEmergenciasAdmin } from "@/hooks/useEmergenciasAdmin"; // Importamos el hook
import { router } from "expo-router";
import React, { useEffect } from "react"; // Necesario para el polling
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminEmergenciasScreen = () => {
  const { logout } = useAuthContext();

  // 1. Usamos el hook para obtener la data y la función de petición
  const { listaEmergencias, solicitarEmergenciasAdmin } = useEmergenciasAdmin();

  const logOutHandler = () => {
    router.replace("/(stack)/login");
    logout();
  };

  // 2. Configuramos la actualización automática cada 5 segundos
  useEffect(() => {
    // Llamada inmediata al cargar
    solicitarEmergenciasAdmin();

    const intervalo = setInterval(() => {
      console.log("Admin: Sincronizando emergencias...");
      solicitarEmergenciasAdmin();
    }, 5000);

    // Limpieza al salir de la pantalla
    return () => clearInterval(intervalo);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
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
            Listado de emergencias
          </Text>
        </View>
        <LogOutComponent onPress={() => logOutHandler()} />
      </View>

      {/* 3. Listado con los datos del Hook */}
      <FlatList
        data={listaEmergencias}
        className="px-3"
        // Usamos el index como acordamos si no hay un ID robusto
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <EmergenciaAdminComponent emergencia={item} />
        )}
        // Opcional: Mostrar mensaje si no hay datos
        ListEmptyComponent={() => (
          <View className="mt-10 items-center opacity-50">
            <Text className="text-gray-500 font-bold">
              No hay emergencias registradas
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AdminEmergenciasScreen;
