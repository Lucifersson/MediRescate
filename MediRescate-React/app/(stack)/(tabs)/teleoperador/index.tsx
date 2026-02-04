import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useOperariosDisponibles } from "@/hooks/useOperariosDisponibles";
import { useRegistrarEmergencia } from "@/hooks/useRegistrarEmergencia"; // Importamos el nuevo hook
import { NombreOperario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import { AuthProvider, useAuthContext } from "@/core/context/UseAuthContext";
import { router } from "expo-router";

const TeleoperadorScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [operario, setOperario] = useState<NombreOperario | null>(null);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const { user, logout } = useAuthContext();

  const { operarios, solicitarOperarios } = useOperariosDisponibles();

  const logoutHandler = () => {
    router.push("/login");
    logout();
  };

  // Inicializamos el registro
  const {
    registrarEmergencia,
    registroExitoso,
    loading: enviando,
  } = useRegistrarEmergencia();

  useEffect(() => {
    if (mostrarUsuarios) {
      solicitarOperarios();
    }
  }, [mostrarUsuarios]);

  // Limpiar formulario si el registro fue ok
  useEffect(() => {
    if (registroExitoso) {
      setTitulo("");
      setOperario(null);
      // Opcional: ocultar el mensaje después de 3 segundos
    }
  }, [registroExitoso]);

  const seleccionarOperario = (item: NombreOperario | null) => {
    setOperario(item);
    console.log("Id de empleado seleccionado: ", item?.id_operario);
    setMostrarUsuarios(false);
  };

  const manejarEnvio = () => {
    if (operario && titulo) {
      registrarEmergencia(operario.id_operario, titulo, user?.idUsuario);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 🟢 INDICADOR VISUAL DE ÉXITO */}
      {registroExitoso && (
        <View className="bg-green-500 mx-4 mt-2 p-3 rounded-xl flex-row items-center justify-center shadow-lg">
          <Ionicons name="checkmark-circle" size={20} color="white" />
          <Text className="text-white font-bold ml-2">
            Emergencia registrada correctamente
          </Text>
        </View>
      )}

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
          <LogOutComponent onPress={logoutHandler} />
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
            editable={!enviando} // Bloquear mientras envía
          />

          <Text className="text-gray-500 font-semibold mb-2 ml-1">
            Asignar Operario Libre
          </Text>

          <Pressable
            onPress={() => !enviando && setMostrarUsuarios(!mostrarUsuarios)}
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
                  onPress={() => seleccionarOperario(null)}
                  className="p-4 border-b border-gray-50 active:bg-blue-50 flex-row justify-between items-center"
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-3 h-3 bg-red-400 rounded-full mr-3" />
                    <View>
                      <Text className="text-red-300 font-medium">
                        Eliminar selección
                      </Text>
                    </View>
                  </View>
                </Pressable>
              )}
              <FlatList
                data={operarios}
                keyExtractor={(item) => item.id_operario.toString()}
                nestedScrollEnabled={true}
                // Separador más limpio que usar bordes en los items
                ItemSeparatorComponent={() => (
                  <View className="h-[1px] bg-gray-100 mx-4" />
                )}
                renderItem={({ item }) => {
                  const isSelected = operario?.id_operario === item.id_operario;

                  return (
                    <Pressable
                      onPress={() => seleccionarOperario(item)}
                      // Cambiamos el fondo si está seleccionado para dar feedback
                      className={`p-4 flex-row justify-between items-center active:bg-gray-50 ${
                        isSelected ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <View className="flex-row items-center flex-1">
                        {/* Indicador de estado con efecto de brillo */}
                        <View className="relative mr-3">
                          <View className="w-3 h-3 bg-green-500 rounded-full" />
                          <View className="w-3 h-3 bg-green-500 rounded-full absolute animate-ping opacity-20" />
                        </View>

                        <View className="flex-1">
                          <View className="flex-row items-center">
                            <Text
                              className={`text-base ${isSelected ? "text-blue-700 font-bold" : "text-gray-700 font-medium"}`}
                            >
                              {item.nombre}
                            </Text>
                            {isSelected && (
                              <View className="ml-2 bg-green-100 rounded-full p-0.5">
                                <Ionicons
                                  name="checkmark"
                                  size={12}
                                  color="#166534"
                                />
                              </View>
                            )}
                          </View>

                          {/* Tag de estado mejorado */}
                          <Text className="text-[10px] text-green-600 font-bold tracking-wider">
                            ● DISPONIBLE
                          </Text>
                        </View>
                      </View>

                      {/* Badge para el ID */}
                      <View className="bg-gray-100 px-2 py-1 rounded-md">
                        <Text className="text-gray-400 text-[10px] font-mono">
                          #{item.id_operario}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>

      {/* BOTÓN INFERIOR */}
      <View className="px-4 pb-6">
        <Pressable
          className={`rounded-2xl py-4 shadow-lg flex-row justify-center items-center ${
            operario && titulo && !enviando
              ? "bg-red-500 active:opacity-90"
              : "bg-gray-300"
          }`}
          disabled={!operario || !titulo || enviando}
          onPress={manejarEnvio}
        >
          {enviando ? (
            <ActivityIndicator color="white" className="mr-2" />
          ) : (
            <Ionicons
              name="paper-plane"
              size={20}
              color="white"
              className="mr-2"
            />
          )}
          <Text className="text-lg font-bold text-white text-center ml-2">
            {enviando ? "Enviando..." : "Registrar Emergencia"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TeleoperadorScreen;
