import { Emergencia, EmergenciaAdmin } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  // Ahora permitimos explícitamente que la emergencia sea nula o indefinida
  emergencia: EmergenciaAdmin;
}

const EmergenciaComponent = ({ emergencia }: Props) => {
  // Renderizado cuando SÍ hay una emergencia
  return (
    <View className="bg-white rounded-[40px] p-8 mx-6 shadow-xl shadow-black/10 border border-gray-100 items-center justify-center aspect-square">
      {/* Icono de Alerta Destacado */}
      <View className="bg-orange-50 p-6 rounded-full mb-6">
        <Ionicons name="warning" color={"#f97316"} size={60} />
      </View>

      {/* Título/Descripción Central */}
      <View className="items-center mb-6">
        <Text className="text-gray-400 font-black text-xs uppercase tracking-[3px] mb-2">
          Aviso de Emergencia
        </Text>
        <Text className="text-2xl font-black text-gray-900 text-center leading-tight">
          {emergencia.descripcion}
        </Text>
      </View>

      {/* Separador sutil */}
      <View className="w-full h-[1px] bg-gray-100 mb-6" />

      {/* Datos del Operario Inferiores */}
      <View className="items-center">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
          Operario Asignado
        </Text>
        <View className="bg-gray-100 px-3 py-1 rounded-full mt-2">
          <Text className="text-[10px] font-black text-gray-500 uppercase">
            ID Operario: {emergencia.id_operario}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmergenciaComponent;
