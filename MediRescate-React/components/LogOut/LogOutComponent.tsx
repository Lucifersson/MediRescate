import { useAuth } from "@/hooks/useAuth";
import { Operario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

interface Props {
  onPress: () => void;
}

const LogOutComponent = ({ onPress }: Props) => {
  // const { logOut } = useAuth()

  //NOTE: posible cambio de componente logout
  return (
    <Pressable
      onPress={() => {
        onPress();
        router.replace("/(stack)/login");
      }}
    >
      <Ionicons name="person-circle-outline" size={50} color="white" />
    </Pressable>
  );
};

export default LogOutComponent;

