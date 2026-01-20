import { useTcpSocket } from "@/core/actions/prueba.action";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperario } from "@/hooks/useOperario";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OperarioScreen = () => {
  const { user } = useAuthContext();
  const { estado, color, cambioEstado } = useOperario();

  // Mapeo para el color de la sombra/borde según el estado de Tailwind a Hexadecimal/RGB
  // Esto es necesario porque iOS/Android requieren valores reales para sombras
  const getGlowColor = () => {
    if (color.includes("red")) return "#dc2626"; // Red-600
    if (color.includes("orange")) return "#f97316"; // Orange-500
    if (color.includes("green")) return "#16a34a"; // Green-600
    return "#9ca3af"; // Gray-400 default
  };

  return (
    // Contenedor principal con el "brillo" dinámico en el borde
    <SafeAreaView
      style={[style.glowContainer, { borderColor: getGlowColor() }]}
      className="flex-1 bg-gray-50"
    >
      {/* Header con Perfil y Logo */}
      <View
        className={`mx-4 mt-4 flex-row justify-between ${color} p-4 items-center rounded-2xl shadow-md`}
      >
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
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
          style={style.cardShadow}
          className="bg-white h-72 w-full rounded-3xl items-center justify-center border border-gray-100"
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
      <View className="p-6 bg-white rounded-t-[40px] shadow-2xl">
        <Text className="text-center text-gray-400 font-bold mb-4 uppercase text-xs">
          Cambiar mi estado actual
        </Text>

        <Pressable
          className="bg-red-600 w-full h-24 mb-4 rounded-2xl flex-row items-center justify-center shadow-lg active:opacity-80"
          onPress={() => cambioEstado("ocupado")}
        >
          <Ionicons name="close-circle" size={28} color="white" />
          <Text className="text-white font-black text-xl ml-2 uppercase">
            Ocupado
          </Text>
        </Pressable>

        <View className="flex-row justify-between">
          <Pressable
            className="bg-orange-500 w-[48%] h-24 rounded-2xl items-center justify-center shadow-lg active:opacity-80"
            onPress={() => cambioEstado("camino")}
          >
            <Ionicons name="navigate" size={24} color="white" />
            <Text className="text-white font-black text-base uppercase mt-1">
              En camino
            </Text>
          </Pressable>

          <Pressable
            className="bg-green-600 w-[48%] h-24 rounded-2xl items-center justify-center shadow-lg active:opacity-80"
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

const style = StyleSheet.create({
  glowContainer: {
    borderWidth: 6, // Este es el efecto de sombra/borde dinámico alrededor de toda la pantalla
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default OperarioScreen;
