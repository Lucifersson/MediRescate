import { useTcpSocket } from "@/core/actions/prueba.action";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperario } from "@/hooks/useOperario";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OperarioScreen = () => {
  const { user } = useAuthContext();
  const { estado, color, cambioEstado } = useOperario();

  // Mapeo de colores hexadecimales para el borde dinámico
  // const getGlowColor = () => {
  //   if (color.includes("red")) return "-red-600";
  //   if (color.includes("orange")) return "-orange-500";
  //   if (color.includes("green")) return "-green-600";
  //   return "-gray-500";
  // };

  return (
    <SafeAreaView className={`flex-1 bg-gray-50 border-[6px] border${color}`}>
      {/* Header con Perfil y Logo */}
      <View
        className={`mx-4 mt-4 flex-row justify-between bg${color} p-4 items-center rounded-2xl shadow-md`}
      >
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            className="w-[60px] h-[60px]" // Traducido estilo inline a NativeWind
            resizeMode="contain"
            style={{ height: 60, width: 60 }}
          />
        </View>

        <View className="flex-1 mx-4">
          <Text className="text-white font-bold text-lg leading-5">
            {user?.nombre || "Nombre operario"}
          </Text>
          <Text className="text-white/90 text-xs uppercase tracking-widest font-semibold">
            {user?.cargo || "Ambulancia Operario"}
          </Text>
        </View>

        <Ionicons name="person-circle-outline" size={50} color="white" />
      </View>

      {/* Datos de la emergencia (Tarjeta Central) */}
      <View className="flex-1 justify-center px-6">
        <View
          // Traducido cardShadow: shadow-black, shadow-offset, opacity, radius y elevation
          className="bg-white h-72 w-full rounded-3xl items-center justify-center border border-gray-100 shadow-xl shadow-black/10 elevation-10"
        >
          <Ionicons name="warning-outline" size={40} color="#374151" />
          <Text className="text-gray-400 font-medium mt-2 uppercase tracking-tighter">
            Sin avisos activos
          </Text>
          <Text className="text-gray-800 text-center font-bold text-xl px-4 mt-2">
            Datos de la emergencia
          </Text>
        </View>
      </View>

      {/* Botones cambio de estado */}
      <View className="p-6 bg-white rounded-t-[40px] shadow-2xl elevation-20">
        <Text className="text-center text-gray-400 font-bold mb-4 uppercase text-xs">
          Cambiar mi estado actual
        </Text>

        <Pressable
          className="bg-red-600 w-full h-24 mb-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-red-900/40 border-r-4 border-b-4 border-red-800 active:opacity-80"
          onPress={() => cambioEstado("ocupado")}
        >
          <Ionicons name="close-circle" size={28} color="white" />
          <Text className="text-white font-black text-xl ml-2 uppercase">
            Ocupado
          </Text>
        </Pressable>

        <View className="flex-row justify-between">
          <Pressable
            className="bg-orange-500 w-[48%] h-24 rounded-2xl items-center justify-center shadow-lg shadow-orange-900/40 border-r-4 border-b-4 border-orange-800 active:opacity-80"
            onPress={() => cambioEstado("camino")}
          >
            <Ionicons name="navigate" size={24} color="white" />
            <Text className="text-white font-black text-base uppercase mt-1">
              En camino
            </Text>
          </Pressable>

          <Pressable
            className="bg-green-600 w-[48%] h-24 rounded-2xl items-center justify-center shadow-lg shadow-green-900/40 border-r-4 border-b-4 border-green-800 active:opacity-80"
            onPress={() => cambioEstado("libre")}
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
