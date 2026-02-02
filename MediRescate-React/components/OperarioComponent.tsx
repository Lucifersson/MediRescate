import { OperariosAdmin } from "@/types/types";
import { Text, View } from "react-native";

interface Props {
    operario: OperariosAdmin;
}

const OperarioComponent = ({ operario }: Props) => {
    const getStatusConfig = () => {
        switch (operario.estado) {
            case "ocupado":
                return {
                    color: "#dc2626",
                    label: "OCUPADO",
                };
            case "en_marcha":
                return {
                    color: "#f97316",
                    label: "EN CAMINO",
                };
            case "libre":
            default:
                return {
                    color: "#16a34a",
                    label: "LIBRE",
                };
        }
    };

    const status = getStatusConfig();

    return (
<View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 flex-row justify-between items-center">

            <View >
                {/* Header */}
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-bold text-gray-800">
                        {operario.nombre}
                    </Text>


                </View>

                {/* Body */}
                <Text className="text-sm text-gray-500">
                    Ambulancia asignada
                </Text>
                <Text className="text-base font-semibold text-gray-700">
                    {operario.ambulancia}
                </Text>
            </View>

            <View className="flex-row items-center gap-2 ">
                <View
                    style={{ backgroundColor: status.color }}
                    className="w-3 h-3 rounded-full"
                />
                <Text
                    style={{ color: status.color }}
                    className="text-xs font-bold"
                >
                    {status.label}
                </Text>
            </View>

        </View>
    );
};

export default OperarioComponent;
