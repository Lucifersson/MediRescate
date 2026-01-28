import { useAuthContext } from "@/core/context/UseAuthContext";
import { useAuth } from "@/hooks/useAuth";
import { Operario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
}

const LogOutComponent = ({ onPress }: Props) => {
  const { user, logout } = useAuthContext();

  //NOTE: posible cambio de componente logout
  return (
    <Pressable onPress={logout} className="items-center">
      <Ionicons
        name="person-circle-outline"
        size={50}
        className="text-white/80"
      />
      <Text className="text-white/80 font-bold">Cerrar Sesión</Text>
    </Pressable>
  );
};

export default LogOutComponent;
