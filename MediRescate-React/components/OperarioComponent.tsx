import { OperariosAdmin } from "@/types/types";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface Props {
    operario: OperariosAdmin;
}






const OperarioComponent = ({ operario }: Props) => {

    const [color, setColor] = useState("")

    switch (operario.estado) {
        case "ocupado":
            setColor("-red-600");
            break;
        case "en_marcha":
            setColor("-orange-500");
            break;
        case "libre":
            setColor("-green-600");
            break;
        default: // Caso de estar libre
            setColor("-green-600");
            break;
    }


    return (
        <View className="">
            <Text className={`text-xl text${color}`}>·</Text>
            <Text>{operario.nombre}</Text>
            <Text>Ambulancia: {operario.ambulancia}</Text>
        </View>
    );
};

export default OperarioComponent;