import LogOutComponent from "@/components/LogOut/LogOutComponent";
import OperarioComponent from "@/components/OperarioComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperarios } from "@/hooks/useOperarios";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminOperariosScreen = () => {
  const { logout } = useAuthContext();

  const { operarios, solicitarOperariosTodos } = useOperarios();

  //NOTE: comentar para que funcione unicamente front
  useEffect(() => {
    solicitarOperariosTodos();

    const intervalo = setInterval(() => {
      console.log("Actualizando lista de operarios...");
      solicitarOperariosTodos();
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(intervalo);
  }, []);

  const logOutHandler = () => {
    router.replace("/(stack)/login");
    logout();
  };

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
