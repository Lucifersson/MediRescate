/**
 * PANTALLA: TeleoperadorScreen
 * Propósito: Interfaz para el personal de despacho (teleoperadores).
 * Funcionalidad:
 * 1. Registro de nuevas emergencias con título descriptivo.
 * 2. Asignación directa de operarios que se encuentran en estado 'disponible'.
 * 3. Feedback visual de éxito y estados de carga durante el envío.
 */

import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperariosDisponibles } from "@/hooks/useOperariosDisponibles";
import { useRegistrarEmergencia } from "@/hooks/useRegistrarEmergencia";
import { NombreOperario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

const TeleoperadorScreen = () => {
  // --- ESTADO LOCAL ---
  const [titulo, setTitulo] = useState(""); // Título del aviso/emergencia
  const [operario, setOperario] = useState<NombreOperario | null>(null); // Operario seleccionado del dropdown
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false); // Control del desplegable de operarios

  // --- CONTEXTO Y NAVEGACIÓN ---
  const { user, logout } = useAuthContext();

  // --- HOOKS DE DATOS ---
  /**
   * useOperariosDisponibles: Obtiene únicamente los operarios aptos para recibir nuevos servicios.
   */
  const { operarios, solicitarOperarios } = useOperariosDisponibles();

  /**
   * useRegistrarEmergencia: Hook encargado del POST a la base de datos.
   * @returns {registrarEmergencia} Función que ejecuta el envío.
   * @returns {registroExitoso} Booleano para mostrar feedback de éxito.
   * @returns {loading} Estado de la petición (enviando).
   */
  const {
    registrarEmergencia,
    registroExitoso,
    loading: enviando,
    error,
  } = useRegistrarEmergencia();

  // --- EFECTOS (SIDE EFFECTS) ---

  // Dispara la búsqueda de operarios solo cuando el usuario abre el desplegable
  useEffect(() => {
    if (mostrarUsuarios) {
      solicitarOperarios();
    }
  }, [mostrarUsuarios]);

  // Limpia el formulario automáticamente tras un registro correcto
  useEffect(() => {
    if (registroExitoso) {
      setTitulo("");
      setOperario(null);
    }
  }, [registroExitoso]);


// --- MANEJO DE ERRORES ---
  //Creación de un contador para mostrar el error durante un tiempo limitado (7 segundos)

  const [mostrarError, setMostrarError] = useState(false);

  // Por cada vez que cambie el estado de 'error', se activa el temporizador para mostrar el mensaje de error.

  useEffect(() => {
    if (error) {
      setMostrarError(true);

      const timer = setTimeout(() => {
        setMostrarError(false);
      }, 7000); // ⏱ 7 segundos (ajusta entre 5000–10000 si quieres)

      return () => clearTimeout(timer);
    }
  }, [error]);
  

  // --- MANEJADORES (HANDLERS) ---

  const logoutHandler = () => {
    router.push("/login");
    logout();
  };

  /**
   * Actualiza el estado del operario seleccionado y cierra el menú.
   */
  const seleccionarOperario = (item: NombreOperario | null) => {
    setOperario(item);
    console.log("Id de empleado seleccionado: ", item?.id_operario);
    setMostrarUsuarios(false);
  };

  /**
   * Valida y ejecuta el registro de la emergencia.
   */
  const manejarEnvio = () => {
    if (operario && titulo) {
      registrarEmergencia(operario.id_operario, titulo, user?.idUsuario);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* --- NOTIFICACIÓN TEMPORAL DE ÉXITO --- */}
      {registroExitoso && (
        <View className="bg-green-500 mx-4 mt-2 p-3 rounded-xl flex-row items-center justify-center shadow-lg">
          <Ionicons name="checkmark-circle" size={20} color="white" />
          <Text className="text-white font-bold ml-2">
            Emergencia registrada correctamente
          </Text>
        </View>
      )}

      {/* --- Mostrado de error temporal --- */}
      {error && mostrarError && (
        <View className="bg-red-500 mx-4 mt-2 p-3 rounded-xl flex-row items-center justify-center shadow-lg">
          <Ionicons name="alert-circle" size={20} color="white" />
          <Text className="text-white font-bold ml-2">
            Error al registrar la emergencia: {error}
          </Text>
        </View>
      )}


      <View className="flex-1">
        {/* --- SECCIÓN: HEADER --- */}
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

        {/* --- SECCIÓN: FORMULARIO DE REGISTRO --- */}
        <View className="mx-4 mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Campo: Título */}
          <Text className="text-gray-500 font-semibold mb-2 ml-1">
            Título de la emergencia
          </Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-xl mb-4 text-gray-800 border border-gray-200"
            placeholder="Ej: Accidente de tráfico"
            onChangeText={setTitulo}
            value={titulo}
            editable={!enviando} // Evita modificaciones durante el envío
          />

          {/* Selector de Operario (Custom Dropdown) */}
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

          {/* --- SUB-BLOQUE: LISTA DESPLEGABLE DE OPERARIOS --- */}
          {mostrarUsuarios && (
            <View className="mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg max-h-60">
              {/* Opción para limpiar la selección actual */}
              {operario && (
                <Pressable
                  onPress={() => seleccionarOperario(null)}
                  className="p-4 border-b border-gray-50 active:bg-blue-50 flex-row justify-between items-center"
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-3 h-3 bg-red-400 rounded-full mr-3" />
                    <Text className="text-red-300 font-medium">
                      Eliminar selección
                    </Text>
                  </View>
                </Pressable>
              )}

              <FlatList
                data={operarios}
                keyExtractor={(item) => item.id_operario.toString()}
                nestedScrollEnabled={true}
                ItemSeparatorComponent={() => (
                  <View className="h-[1px] bg-gray-100 mx-4" />
                )}
                renderItem={({ item }) => {
                  const isSelected = operario?.id_operario === item.id_operario;
                  return (
                    <Pressable
                      onPress={() => seleccionarOperario(item)}
                      className={`p-4 flex-row justify-between items-center active:bg-gray-50 ${isSelected ? "bg-blue-50/50" : ""}`}
                    >
                      <View className="flex-row items-center flex-1">
                        {/* Indicador visual de estado "Disponible" */}
                        <View className="relative mr-3">
                          <View className="w-3 h-3 bg-green-500 rounded-full" />
                          <View className="w-3 h-3 bg-green-500 rounded-full absolute animate-ping opacity-20" />
                        </View>

                        <View className="flex-1">
                          <Text
                            className={`text-base ${isSelected ? "text-blue-700 font-bold" : "text-gray-700 font-medium"}`}
                          >
                            {item.nombre}
                          </Text>
                          <Text className="text-[10px] text-green-600 font-bold tracking-wider">
                            ● DISPONIBLE
                          </Text>
                        </View>
                      </View>

                      {/* Identificador único del operario */}
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

      {/* --- SECCIÓN: BOTÓN DE ACCIÓN (REGISTRAR) --- */}
      <View className="px-4 pb-6">
        <Pressable
          className={`rounded-2xl py-4 shadow-lg flex-row justify-center items-center ${operario && titulo && !enviando
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
