/**
 * PANTALLA: OperarioScreen
 * Propósito: Interfaz principal para el personal operativo (paramédicos/conductores).
 * Funcionalidad:
 * 1. Gestión del estado de disponibilidad (Libre, Ocupado, En Camino).
 * 2. Escucha activa de emergencias asignadas.
 * 3. Control de sesión y sincronización de estado 'offline' al salir.
 */

import EmergenciaOperarioComponent from "@/components/EmergenciaOperarioComponent";
import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useFinalizarEmergencia } from "@/hooks/useFinalizarEmergencia";
import { useOperario } from "@/hooks/useOperario";
import { useOperariosEscucha } from "@/hooks/useOperarioEscucha";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OperarioScreen = () => {
  // --- CONTEXTO Y ESTADO GLOBAL ---
  const { user, logout } = useAuthContext();

  /**
   * useOperario: Gestiona el estado visual y lógico del operario actual.
   * @param {user} Objeto del usuario autenticado.
   * @returns {estado} String con el estado actual (libre, ocupado, etc.).
   * @returns {color} Clase de color de Tailwind asociada al estado.
   * @returns {cambioEstado} Función para actualizar el estado en el backend/UI.
   */
  const { estado, color, cambioEstado } = useOperario({ operario: user });

  /**
   * useOperariosEscucha: Hook que monitoriza si hay una emergencia asignada al ID del usuario.
   * @returns {emergencia} Objeto con la información de la emergencia actual.
   * @returns {solicitarEmergencia} Función para forzar la búsqueda de una emergencia.
   */
  const { emergencia, solicitarEmergencia, setEmergencia, error } =
    useOperariosEscucha({
      id: user?.idUsuario,
    });

  //NOTE: implementar el estado de deshabilitado a false cuando se cierra
  //la emergencia y poner estado a ocupado
  const [deshabilitado, setDeshabilitado] = useState(false);

  const { finalizarEmergencia } = useFinalizarEmergencia(emergencia?.id);

  const cerrarEmergenciaHandler = () => {
    setEmergencia(undefined);
    setDeshabilitado(false);
    cambioEstado("ocupado");
    finalizarEmergencia();
  };

  // --- EFECTOS DE INICIALIZACIÓN Y FLUJO ---

  useEffect(() => {
    // Al cargar la pantalla por primera vez, el operario se pone 'libre' y busca servicios.
    if (user?.idUsuario) {
      cambioEstado("libre");
      solicitarEmergencia();
      console.log(
        "Se ha solicitado emergencia y se ha obtenido: ",
        emergencia,
        "\n",
      );
    }
  }, [user?.idUsuario]);

  useEffect(() => {
    // Si el hook de escucha detecta una nueva emergencia, cambia automáticamente el estado.
    if (emergencia) {
      cambioEstado("en_marcha");
      setDeshabilitado(true);
    }
  }, [emergencia]);

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

  // --- MANEJADORES DE EVENTOS (HANDLERS) ---

  /**
   * Cierre de sesión seguro:
   * Cambia el estado a 'offline' antes de limpiar el contexto para que el Admin sepa que no está disponible.
   */
  const logOutHandler = () => {
    cambioEstado("offline");
    logout();
  };

  /**
   * Manejador para volver al estado disponible:
   * Limpia el estado actual y reinicia la escucha de nuevas emergencias.
   */
  const libreHandler = () => {
    cambioEstado("libre");
    solicitarEmergencia();
  };

  return (
    <SafeAreaView
      // El borde de la pantalla cambia dinámicamente según el estado (color)
      className={`flex-1 bg-gray-50 border${color} justify-between`}
    >
      {/* --- SECCIÓN: HEADER (INFO OPERARIO) --- */}
      {/* El fondo del encabezado cambia según el estado actual (color) */}
      <View
        className={`mx-4 mt-4 flex-row justify-between bg${color} p-4 items-center rounded-2xl shadow-md`}
      >
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 mx-4 my-8 ">
          <Text className="text-white font-bold text-lg leading-5">
            {user?.nombre || "Operario"}
          </Text>
          <Text className="text-white/90 text-xs uppercase tracking-widest font-semibold">
            {user?.cargo || "Unidad"}
          </Text>
          {/* Badge de estado textual */}
          <Text className="text-white/90 text-xs uppercase tracking-widest font-semibold">
            {estado}
          </Text>
        </View>

        <LogOutComponent onPress={logOutHandler} />
      </View>

      {/* En caso de error se muestra panel de error */}
      {mostrarError && error && (
        <View className="absolute top-28 left-4 right-4 bg-red-600 p-4 rounded-2xl shadow-2xl elevation-30 border-l-4 border-red-800">
          <Text className="text-white text-center font-extrabold">
            Error de conexión: {error}
          </Text>
        </View>
      )}

      {/* --- SECCIÓN: CUERPO (EMERGENCIA ASIGNADA) --- */}
      {/* Muestra la información de la emergencia si existe alguna activa */}
      <View className="flex-1 justify-center items-center px-4">
        <EmergenciaOperarioComponent
          emergencia={emergencia}
          onPress={() => cerrarEmergenciaHandler()}
        />
      </View>

      {/* --- SECCIÓN: FOOTER (CONTROL DE ESTADOS) --- */}
      {/* Panel inferior con botones de acción rápida para cambiar disponibilidad */}
      <View className="p-6 bg-white rounded-t-[40px] shadow-2xl elevation-20">
        <Text className="text-center text-gray-400 font-bold mb-4 uppercase text-xs">
          Cambiar de estado:
        </Text>

        {/* Botón: Ocupado (Rojo) */}
        <Pressable
          className={`w-full h-24 mb-4 rounded-2xl flex-row items-center justify-center border-r-4 border-b-4 
      ${
        deshabilitado
          ? "bg-gray-300 border-gray-400 opacity-60"
          : "bg-red-600 border-red-800 active:opacity-80"
      }`}
          onPress={() => cambioEstado("ocupado")}
          disabled={deshabilitado}
        >
          <Ionicons
            name="close-circle"
            size={28}
            color={deshabilitado ? "#9CA3AF" : "white"}
          />
          <Text
            className={`${deshabilitado ? "text-gray-500" : "text-white"} font-black text-xl ml-2 uppercase`}
          >
            Ocupado
          </Text>
        </Pressable>

        <View className="flex-row justify-between">
          {/* Botón: En camino (Naranja) */}
          <Pressable
            className={`w-[48%] h-24 rounded-2xl items-center justify-center border-r-4 border-b-4 
        ${
          deshabilitado
            ? "bg-gray-300 border-gray-400 opacity-60"
            : "bg-orange-500 border-orange-800 active:opacity-80"
        }`}
            onPress={() => cambioEstado("en_marcha")}
            disabled={deshabilitado}
          >
            <Ionicons
              name="navigate"
              size={24}
              color={deshabilitado ? "#9CA3AF" : "white"}
            />
            <Text
              className={`${deshabilitado ? "text-gray-500" : "text-white"} font-black text-base uppercase mt-1`}
            >
              En camino
            </Text>
          </Pressable>

          {/* Botón: Libre (Verde) */}
          <Pressable
            className={`w-[48%] h-24 rounded-2xl items-center justify-center border-r-4 border-b-4 
        ${
          deshabilitado
            ? "bg-gray-300 border-gray-400 opacity-60"
            : "bg-green-600 border-green-800 active:opacity-80"
        }`}
            onPress={() => libreHandler()}
            disabled={deshabilitado}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={deshabilitado ? "#9CA3AF" : "white"}
            />
            <Text
              className={`${deshabilitado ? "text-gray-500" : "text-white"} font-black text-base uppercase mt-1`}
            >
              Libre
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OperarioScreen;
