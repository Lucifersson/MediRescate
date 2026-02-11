/**
 * PANTALLA: AdminOperariosScreen
 * Propósito: Visualización y gestión del personal operativo (operarios) desde el panel de administrador.
 * Funcionalidad: Lista todos los operarios disponibles y mantiene la información sincronizada mediante polling.
 */

import LogOutComponent from "@/components/LogOut/LogOutComponent";
import OperarioComponent from "@/components/OperarioComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperarios } from "@/hooks/useOperarios";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminOperariosScreen = () => {
  // --- LÓGICA DE SESIÓN ---
  const { logout } = useAuthContext();

  // --- GESTIÓN DE OPERARIOS (HOOKS) ---
  /**
   * useOperarios: Hook encargado de la lógica de negocio relacionada con el personal técnico.
   * @returns {operarios} Lista de objetos con la información de cada operario.
   * @returns {solicitarOperariosTodos} Función para realizar el fetch de todos los operarios a la API.
   */
  const { operarios, solicitarOperariosTodos } = useOperarios();

  // --- SINCRONIZACIÓN Y EFECTOS ---
  useEffect(() => {
    // Petición inicial para poblar la lista al entrar en la pantalla
    solicitarOperariosTodos();

    /**
     * Sistema de Polling:
     * Refresca la lista de operarios cada 5 segundos para reflejar cambios de estado o nuevos registros.
     */
    const intervalo = setInterval(() => {
      console.log(
        "Actualizando lista de operarios en intervalo de 5 segundos.",
        "\n",
      );
      solicitarOperariosTodos();
    }, 5000);

    // Limpieza: Detiene el intervalo cuando el componente se destruye para evitar fugas de memoria.
    // 🚩 NOTA PARA USUARIO: Es posible que en sistemas de pestañas (Tabs) el componente no se desmonte
    // y el intervalo siga corriendo. Considerar usar useFocusEffect de react-navigation/expo-router.
    // TODO: hacer que sea especifico por pantallas
    return () => clearInterval(intervalo);
  }, []);

  /**
   * Manejador de cierre de sesión.
   * Redirige al usuario a la pantalla de login y limpia las credenciales del contexto.
   */
  const logOutHandler = () => {
    router.replace("/(stack)/login");
    logout();
  };

  return (
    <SafeAreaView className="flex-1">
      {/* --- SECCIÓN: HEADER (ENCABEZADO DE PANEL) --- */}
      {/* Estilo unificado con otras pantallas de admin para mantener consistencia visual */}
      <View className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md mb-5">
        {/* Contenedor del Logo de la aplicación */}
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            className="w-[60px] h-[60px]"
            resizeMode="contain"
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
          />
        </View>

        {/* Información de Contexto de la Pantalla */}
        <View className="flex-1 mx-4 items-center">
          <Text className="text-white font-bold text-lg leading-5">
            Panel Administrador
          </Text>
          <Text className="text-white/80 text-xs uppercase">
            Listado de operarios
          </Text>
        </View>

        {/* Botón de Logout: Dispara la limpieza de sesión */}
        <LogOutComponent onPress={() => logOutHandler()} />
      </View>

      {/* --- SECCIÓN: LISTADO DE PERSONAL --- */}
      {/* Renderizado eficiente de la lista de operarios mediante FlatList */}
      <FlatList
        data={operarios}
        // Se asume que cada operario tiene un ID único 'id_operario' proveniente de la DB
        keyExtractor={(item) => item.id_operario.toString()}
        renderItem={({ item }) => (
          /**
           * OperarioComponent: Componente encargado de mostrar la card individual.
           * Se le pasa el objeto 'item' (operario) como prop principal.
           */
          <OperarioComponent operario={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AdminOperariosScreen;
