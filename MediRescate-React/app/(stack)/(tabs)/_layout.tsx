import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

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
        name="operario/index"
        options={{
          title: "Operario",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="medical-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin/index"
        options={{
          title: "Administrador",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="clipboard-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teleoperador/index"
        options={{
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
