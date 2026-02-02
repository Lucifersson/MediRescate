import { EmercgenciaAdmin } from "@/types/types";
import { Text, View } from "react-native";

interface Props {
    emergencia: EmercgenciaAdmin;
}

const EmergenciaComponent = ({ emergencia }: Props) => {
    const getStatusConfig = () => {
        switch (emergencia.completada) {
            case false:
                return {
                    color: "#dc2626",
                    label: "PENDIENTE",
                };
            case true:
            default:
                return {
                    color: "#16a34a",
                    label: "COMPLETADA",
                };
        }
    };

    const status = getStatusConfig();

    return (
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 flex-row items-center">

            {/* Texto emergencia */}
            <View className="flex-1 pr-3">
                <Text className="text-base font-semibold text-gray-800">
                    {emergencia.emergencia}
                </Text>
            </View>

            {/* Estado */}
            <View className="flex-row items-center gap-2">
                <View
                    style={{ backgroundColor: status.color }}
                    className="w-3 h-3 rounded-full"
                />
                <Text
                    style={{ color: status.color }}
                    className="text-xs font-bold uppercase"
                >
                    {status.label}
                </Text>
            </View>

        </View>

    );
};

export default EmergenciaComponent;
