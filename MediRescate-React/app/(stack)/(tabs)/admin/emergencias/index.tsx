/**
 * PANTALLA: AdminEmergenciasScreen
 * Propósito: Panel de administración para la gestión y monitoreo de emergencias en tiempo real.
 * Funcionalidad: Implementa un sistema de 'polling' (consulta periódica) para mantener la lista actualizada.
 */

import EmergenciaAdminComponent from "@/components/EmergenciaAdminComponent";
import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useEmergenciasAdmin } from "@/hooks/useEmergenciasAdmin";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminEmergenciasScreen = () => {
  // --- LÓGICA DE AUTENTICACIÓN ---
  // Extraemos la función de cierre de sesión del contexto global
  const { logout } = useAuthContext();

  // --- GESTIÓN DE DATOS (HOOKS) ---
  /**
   * useEmergenciasAdmin: Hook personalizado para interactuar con la API de emergencias.
   * @returns {listaEmergencias} Array con los objetos de emergencia.
   * @returns {solicitarEmergenciasAdmin} Función para disparar la petición GET al servidor.
   */
  const { listaEmergencias, solicitarEmergenciasAdmin } = useEmergenciasAdmin();

  /**
   * Manejador del cierre de sesión.
   * Realiza la redirección forzada al login y limpia el estado de autenticación.
   */
  const logOutHandler = () => {
    router.replace("/(stack)/login");
    logout();
  };

  // --- CICLO DE VIDA Y POLLING ---
  useEffect(() => {
    // Carga inicial de datos al montar el componente
    solicitarEmergenciasAdmin();

    /**
     * Sincronización automática:
     * Ejecuta una petición cada 5 segundos para refrescar el listado de emergencias.
     */
    const intervalo = setInterval(() => {
      console.log("Admin: Sincronizando emergencias...");
      solicitarEmergenciasAdmin();
    }, 5000);

    // Limpieza: Detiene el intervalo cuando el componente se destruye para evitar fugas de memoria.
    // 🚩 NOTA PARA USUARIO: Es posible que en sistemas de pestañas (Tabs) el componente no se desmonte
    // y el intervalo siga corriendo. Considerar usar useFocusEffect de react-navigation/expo-router.
    // TODO: hacer que sea especifico por pantallas
    return () => clearInterval(intervalo);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- SECCIÓN: HEADER (ENCABEZADO) --- */}
      {/* Contenedor principal con estilo de tarjeta roja que incluye logo, título y botón de logout */}
      <View className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md mb-5">
        {/* Contenedor del Logo */}
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            className="w-[60px] h-[60px]"
            resizeMode="contain"
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
          />
        </View>

        {/* Títulos del Panel */}
        <View className="flex-1 mx-4 items-center">
          <Text className="text-white font-bold text-lg leading-5">
            Panel Administrador
          </Text>
          <Text className="text-white/80 text-xs uppercase">
            Listado de emergencias
          </Text>
        </View>

        {/* Componente de Logout: Recibe la función de cierre de sesión como prop onPress */}
        <LogOutComponent onPress={() => logOutHandler()} />
      </View>

      {/* --- SECCIÓN: CUERPO (LISTADO) --- */}
      {/* Lista optimizada para renderizar las emergencias recibidas del hook */}
      <FlatList
        data={listaEmergencias}
        className="px-3"
        // Genera una clave única para cada elemento basada en su posición
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          /**
           * Renderizado de cada emergencia individualmente.
           * Se pasa el objeto 'emergencia' completo como prop al componente hijo.
           */
          <EmergenciaAdminComponent emergencia={item} />
        )}
        // Vista mostrada en caso de que el array 'listaEmergencias' esté vacío
        ListEmptyComponent={() => (
          <View className="mt-10 items-center opacity-50">
            <Text className="text-gray-500 font-bold">
              No hay emergencias registradas
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AdminEmergenciasScreen;
