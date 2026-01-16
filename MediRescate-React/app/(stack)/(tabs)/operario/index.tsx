import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useTcpSocket } from "@/core/actions/prueba.action";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const OperarioScreen = () => {
  const { enviarPeticion, response, error, loading } = useTcpSocket();

  const operarios = response?.data ?? [];

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="m-6 flex-row justify-center">
        <View className="p-5 flex-1 w-100 bg-gray-300 ">
          <Text>
            {/*Usuario.nombre*/}Nombre <Ionicons />
          </Text>
          <Text>{/*Usuario.ambulancia*/}Ambulancia</Text>
        </View>

        <Ionicons
          name="person-circle-outline"
          size={60}
          style={{ alignItems: "flex-end" }}
        />
      </View>

      <Text className="text-2xl font-bold mb-4 text-center">
        Panel de Operario
      </Text>

      {/* Manejo de Errores */}
      {error && (
        <Text className="text-red-600 mb-4 bg-red-100 p-2 rounded">
          {error}
        </Text>
      )}
    </View>
  );
};

export default OperarioScreen;
