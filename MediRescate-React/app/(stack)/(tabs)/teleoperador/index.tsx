import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useOperariosDisponibles } from "@/hooks/useOperariosDisponibles";
import { NombreOperario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeleoperadorScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [operario, setOperario] = useState<NombreOperario | null>(null);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  // Importamos el hook con la función de llamada y los datos del socket
  const { operarios, solicitarOperarios } = useOperariosDisponibles();

  useEffect(() => {
    if (mostrarUsuarios) {
      solicitarOperarios();
    }
  }, [mostrarUsuarios]);

  const seleccionarOperario = (item: NombreOperario | null) => {
    setOperario(item);
    console.log("La id del operario seleccionado es: ", item?.id_operario);
    setMostrarUsuarios(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md">
          <View className="bg-white/80 p-2 rounded-xl">
            <Image
              source={require("@/assets/images/logo_MediRescate.png")}
              className="w-[60px] h-[60px]"
              resizeMode="contain"
              style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
            />
          </View>
          <View className="flex-1 mx-4">
            <Text className="text-white font-bold text-lg leading-5">
              Panel Teleoperador
            </Text>
            <Text className="text-white/80 text-xs uppercase">
              Gestión de Avisos
            </Text>
          </View>
          <LogOutComponent onPress={() => null} />
        </View>

        {/* Formulario */}
        <View className="mx-4 mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Text className="text-gray-500 font-semibold mb-2 ml-1">
            Título de la emergencia
          </Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-xl mb-4 text-gray-800 border border-gray-200"
            placeholder="Ej: Accidente de tráfico"
            onChangeText={setTitulo}
            value={titulo}
          />

          <Text className="text-gray-500 font-semibold mb-2 ml-1">
            Asignar Operario Libre
          </Text>

          {/* BOTÓN SELECTOR DE OPERARIO */}
          <Pressable
            onPress={() => setMostrarUsuarios(!mostrarUsuarios)}
            className="flex-row justify-between items-center bg-gray-100 p-4 rounded-xl border border-gray-200 active:bg-gray-200"
          >
            <Text
              className={operario ? "text-gray-800 font-bold" : "text-gray-400"}
            >
              {operario ? operario.nombre : "Elige un operario"}
            </Text>
            <Ionicons
              name={
                mostrarUsuarios ? "chevron-up-outline" : "chevron-down-outline"
              }
              size={20}
              color="gray"
            />
          </Pressable>

          {/* LISTA DESPLEGABLE */}
          {mostrarUsuarios && (
            <View className="mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg max-h-60">
              {operario && (
                <Pressable
                  className="p-4 border-b border-gray-100 bg-gray-50 active:bg-red-50"
                  onPress={() => seleccionarOperario(null)}
                >
                  <Text className="text-red-500 font-bold text-center">
                    Quitar selección actual
                  </Text>
                </Pressable>
              )}

              <FlatList
                data={operarios}
                keyExtractor={(item) => item.id_operario.toString()}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => seleccionarOperario(item)}
                    className="p-4 border-b border-gray-50 active:bg-blue-50 flex-row justify-between items-center"
                  >
                    <View className="flex-row items-center flex-1">
                      {/* Indicador de estado libre (Punto verde) */}
                      <View className="w-3 h-3 bg-green-500 rounded-full mr-3 shadow-sm shadow-green-500/50" />

                      <View>
                        <Text className="text-gray-700 font-medium">
                          {item.nombre}
                        </Text>
                        <Text className="text-[10px] text-green-600 uppercase font-bold">
                          Disponible
                        </Text>
                      </View>
                    </View>

                    <Text className="text-gray-300 text-xs">
                      ID: {item.id_operario}
                    </Text>
                  </Pressable>
                )}
                ListEmptyComponent={() => (
                  <View className="p-8 items-center">
                    <ActivityIndicator size="small" color="#9ca3af" />
                    <Text className="text-center text-gray-400 italic mt-2">
                      Buscando operarios libres...
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>

      {/* BOTÓN INFERIOR */}
      <View className="px-4 pb-6">
        <Pressable
          className={`rounded-2xl py-4 shadow-lg active:opacity-90 ${
            operario && titulo ? "bg-red-500" : "bg-gray-300"
          }`}
          disabled={!operario || !titulo}
          onPress={() =>
            console.log("Registrando emergencia para:", operario?.nombre)
          }
        >
          <Text className="text-lg font-bold text-white text-center">
            Registrar Emergencia
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TeleoperadorScreen;
