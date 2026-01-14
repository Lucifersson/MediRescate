import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useTcpSocket } from "@/core/actions/prueba.action";

const OperarioScreen = () => {
  const { enviarMensajeFijo, objectResponse, error, loading } = useTcpSocket();

  const operariosArray = objectResponse?.data ?? [];

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4 text-center">
        Panel de Operario
      </Text>

      {/* Botón de envío */}
      <Pressable
        className={`p-6 rounded-xl mb-6 ${loading ? "bg-purple-400" : "bg-purple-800"}`}
        onPress={enviarMensajeFijo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold">
            Enviar Petición TCP
          </Text>
        )}
      </Pressable>

      {/* Manejo de Errores */}
      {error && (
        <Text className="text-red-600 mb-4 bg-red-100 p-2 rounded">
          {error}
        </Text>
      )}

      {/* Lista de Resultados */}
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-2">
          Usuarios en el sistema:
        </Text>
        <FlatList
          data={operariosArray}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View className="p-4 mb-2 flex-row bg-white border border-gray-200 rounded-lg shadow-sm">
              <Text className="text-gray-800 font-medium mr-auto">
                👤 {item.nombre}
              </Text>
              <Text className="text-red-600 font-bold">{item.cargo}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default OperarioScreen;
