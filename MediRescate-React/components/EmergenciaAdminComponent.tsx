import { EmergenciaAdmin } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  emergencia: EmergenciaAdmin;
}

const EmergenciaAdminComponent = ({ emergencia }: Props) => {
  return (
    <View className="bg-white rounded-3xl p-4 mx-4 mb-3 shadow-sm border border-gray-100 flex-row items-center">
      <View className="bg-orange-50 p-3 rounded-2xl mr-4">
        <Ionicons name="warning" color={"#f97316"} size={28} />
      </View>
      <View className="flex-1 justify-center">
        <Text className="text-gray-400 font-black text-[9px] uppercase tracking-widest mb-0.5">
          Emergencia
        </Text>
        <Text
          className="text-lg font-bold text-gray-900 leading-6"
          numberOfLines={2}
        >
          {emergencia.descripcion}
        </Text>
      </View>
      <View className="w-[1px] h-10 bg-gray-100 mx-3" />
      <View className="items-end w-24">
        <Text className="text-[9px] font-bold text-gray-400 uppercase mb-1">
          ID Operario
        </Text>
        <View className="bg-blue-50 px-2 py-1 rounded-lg">
          <Text className="text-blue-700 font-black text-xs">
            #{emergencia.id_operario}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmergenciaAdminComponent;
