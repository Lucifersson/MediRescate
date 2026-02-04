import { Emergencia, EmergenciaAdmin } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  emergencia: EmergenciaAdmin;
}

const EmergenciaComponent = ({ emergencia }: Props) => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 flex-row items-center">
      {/* Icono de Alerta */}
      <View className="mr-4">
        <Ionicons name="warning-outline" color={"orange"} size={24} />
      </View>

      {/* Bloque Texto con Esfera Verde */}
      <View className="flex-1 pr-3 flex-row items-center">
        {/* Esfera Verde de estado */}
        <View className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 shadow-sm shadow-green-500/50" />

        <View className="flex-1">
          <Text
            className="text-base font-semibold text-gray-800"
            numberOfLines={2}
          >
            {emergencia.descripcion}
          </Text>
        </View>
      </View>

      {/* Bloque Operario */}
      <View className="w-28 items-end">
        <Text className="text-gray-400 text-[10px] uppercase font-medium">
          Operario
        </Text>
        <Text className="text-gray-900 text-sm text-right font-medium">
          {emergencia.nombre_operario}
        </Text>
      </View>
    </View>
  );
};

export default EmergenciaComponent; // Nota: Asegúrate de que el export coincida con el nombre del componente
