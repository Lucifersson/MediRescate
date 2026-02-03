import { EmergenciaAdmin } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
    emergencia: EmergenciaAdmin;
}

const EmergenciaComponent = ({ emergencia }: Props) => {
    return (
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 flex-row items-center">
            {/* 1. Cambiamos items-center por items-start para que el icono y el operario no bajen si el texto es largo */}

            <View className="mr-4">
                <Ionicons name="warning-outline" color={'orange'} size={24} />
            </View>

            {/* 2. Texto emergencia: Mantiene el flex-1 para empujar al operario a la derecha */}
            <View className="flex-1 pr-3 justify-center">
                <Text className="text-base font-semibold text-gray-800">
                    {emergencia.emergencia}
                </Text>
            </View>

            {/* 3. Bloque Operario: Alineación a la derecha y ancho fijo */}
            <View className="w-28 items-end">
                <Text className="text-gray-400 text-[10px] uppercase font-medium">Operario</Text>
                <Text className="text-gray-900 text-sm text-right font-medium">
                    {emergencia.operario}
                </Text>
            </View>
        </View>
    );
};

export default EmergenciaComponent;
