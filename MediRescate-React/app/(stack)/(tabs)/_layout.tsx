/**
 * LAYOUT: TabsLayout (Navegación por Roles)
 * Propósito: Define el contenedor de navegación principal para los diferentes roles de la app.
 * Nota: Aunque utiliza un componente Tabs, la barra de pestañas física está oculta,
 * delegando la navegación a la lógica de redirección por tipo de usuario (Admin, Operario, Teleoperador).
 */

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      // --- CONFIGURACIÓN DE NAVEGACIÓN INVISIBLE ---
      screenOptions={{
        // Color para elementos activos (aunque la barra esté oculta, afecta a la configuración global)
        tabBarActiveTintColor: "red",

        // 🚩 IMPORTANTE: Oculta físicamente la barra de navegación inferior
        tabBarStyle: { display: "none" },

        tabBarShowLabel: false,
        // Desactiva el header nativo para dar control total a las pantallas individuales
        headerShown: false,
      }}
    >
      {/* --- RUTA: VISTA OPERARIO --- */}
      <Tabs.Screen
        name="operario/index"
        options={{
          // href: null asegura que no se intente renderizar un botón en la Tab Bar
          href: null,
          title: "Operario",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="medical-outline" color={color} />
          ),
        }}
      />

      {/* --- RUTA: VISTA ADMINISTRADOR --- */}
      <Tabs.Screen
        name="admin/index"
        options={{
          href: null,
          title: "Administrador",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="clipboard-outline" color={color} />
          ),
        }}
      />

      {/* --- RUTA: VISTA TELEOPERADOR --- */}
      <Tabs.Screen
        name="teleoperador/index"
        options={{
          href: null,
          title: "Teleoperador",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="headset-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
