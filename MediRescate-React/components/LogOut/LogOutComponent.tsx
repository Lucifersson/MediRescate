import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
}

const LogOutComponent = ({ onPress }: Props) => {
  return (
    <Pressable onPress={onPress} className="items-center">
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
