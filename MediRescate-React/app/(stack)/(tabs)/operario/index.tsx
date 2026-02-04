import EmergenciaComponent from "@/components/EmergenciaComponent";
import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperario } from "@/hooks/useOperario";
import { useOperariosEscucha } from "@/hooks/useOperarioEscucha";
import { Emergencia } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OperarioScreen = () => {
  const { user } = useAuthContext();
  const { estado, color, cambioEstado } = useOperario({ operario: user });
  const { logout } = useAuthContext();

  //NOTE: importar emergencia en caso de no usar la de prueba
  const { emergencia, solicitarEmergencia } = useOperariosEscucha({
    id: user?.idUsuario,
  });

  // NOTE: emergencia de prueba, hay que comentar

  // const emergencia: Emergencia = {
  //   id_operario: 1,
  //   descripcion: "Accidente de tráfico",
  //   nombre_operario: "Paco",
  // };

  //TEST: probando si funciona el campo de estado asi
  useEffect(() => {
    if (user?.idUsuario) {
      cambioEstado("libre");
      solicitarEmergencia();
      console.log("Valor emergencia: ", emergencia);
    }
  }, [user?.idUsuario]);

  const logOutHandler = () => {
    cambioEstado("offline");
    console.log("Se va a ejecutar funcion de logout del context.");
    logout();
  };

  const libreHandler = () => {
    cambioEstado("libre");
    solicitarEmergencia();
  };

  return (
    <SafeAreaView
      className={`flex-1 bg-gray-50 border${color} justify-between`}
    >
      {/* Header */}
      <View
        className={`mx-4 mt-4 flex-row justify-between bg${color} p-4 items-center rounded-2xl shadow-md`}
      >
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 mx-4 my-8 ">
          <Text className="text-white font-bold text-lg leading-5">
            {user?.nombre || "Operario"}
          </Text>
          <Text className="text-white/90 text-xs uppercase tracking-widest font-semibold">
            {user?.cargo || "Unidad"}
          </Text>
          <Text className="text-white/90 text-xs uppercase tracking-widest font-semibold">
            {estado}
          </Text>
        </View>
        <LogOutComponent onPress={logOutHandler} />
      </View>

      {/* BLOQUE CENTRAL CONDICIONAL */}
      <View className="flex-1 justify-center items-center px-4">
        <EmergenciaComponent emergencia={emergencia} />
      </View>

      {/* Footer: Botones cambio de estado */}
      <View className="p-6 bg-white rounded-t-[40px] shadow-2xl elevation-20">
        <Text className="text-center text-gray-400 font-bold mb-4 uppercase text-xs">
          Mi estado actual
        </Text>

        <Pressable
          className="bg-red-600 w-full h-24 mb-4 rounded-2xl flex-row items-center justify-center border-r-4 border-b-4 border-red-800 active:opacity-80"
          onPress={() => cambioEstado("ocupado")}
        >
          <Ionicons name="close-circle" size={28} color="white" />
          <Text className="text-white font-black text-xl ml-2 uppercase">
            Ocupado
          </Text>
        </Pressable>

        <View className="flex-row justify-between">
          <Pressable
            className="bg-orange-500 w-[48%] h-24 rounded-2xl items-center justify-center border-r-4 border-b-4 border-orange-800 active:opacity-80"
            onPress={() => cambioEstado("en_marcha")}
          >
            <Ionicons name="navigate" size={24} color="white" />
            <Text className="text-white font-black text-base uppercase mt-1">
              En camino
            </Text>
          </Pressable>

          <Pressable
            className="bg-green-600 w-[48%] h-24 rounded-2xl items-center justify-center border-r-4 border-b-4 border-green-800 active:opacity-80"
            onPress={() => libreHandler()}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text className="text-white font-black text-base uppercase mt-1">
              Libre
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OperarioScreen;
