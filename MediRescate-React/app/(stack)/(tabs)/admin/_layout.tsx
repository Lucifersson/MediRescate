import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="operarios/index"
        options={{
          title: "Operarios",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="medical" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergencias/index"
        options={{
          title: "Emergencias",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="warning" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapas/index"
        options={{
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
