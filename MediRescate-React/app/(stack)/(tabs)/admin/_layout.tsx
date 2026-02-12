/**
 * LAYOUT: TabsLayout
 * Propósito: Define la estructura de navegación principal basada en pestañas (Tabs) para el Panel de Administrador.
 * Librería: expo-router (Tabs).
 */

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      // --- CONFIGURACIÓN GLOBAL DE LAS PESTAÑAS ---
      screenOptions={{
        // Color de la pestaña activa (Icono y Texto)
        tabBarActiveTintColor: "red",
        // Determina si se muestra el título debajo del icono
        tabBarShowLabel: true,
        // Oculta el encabezado nativo para usar headers personalizados en las pantallas
        headerShown: false,
      }}
    >
      {/* --- PESTAÑA: INDEX (OCULTA) --- */}
      <Tabs.Screen
        name="index"
        options={{
          // href: null evita que esta ruta aparezca como un botón en la barra de navegación
          href: null,
        }}
      />

      {/* --- PESTAÑA: GESTIÓN DE OPERARIOS --- */}
      <Tabs.Screen
        name="operarios/index"
        options={{
          title: "Operarios",
          // Renderizado del icono dinámico basado en el estado de enfoque (color)
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="medical" color={color} />
          ),
        }}
      />

      {/* --- PESTAÑA: LISTADO DE EMERGENCIAS --- */}
      <Tabs.Screen
        name="emergencias/index"
        options={{
          title: "Emergencias",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="warning" color={color} />
          ),
        }}
      />

      {/* --- PESTAÑA: MAPAS (CONFIGURACIÓN ESPECIAL) --- */}
      <Tabs.Screen
        name="mapas/index"
        options={{
          //NOTE: ocultado provisionalmente ya que no esta implementada
          title: "Mapas",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="map" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
