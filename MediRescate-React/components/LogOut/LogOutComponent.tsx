/**
 * COMPONENTE: LogOutComponent
 * Propósito: Proporcionar una interfaz consistente para el cierre de sesión en los headers de los diferentes roles.
 * Estética: Icono circular con texto descriptivo, diseñado para fondos oscuros o coloreados (usando opacidades de blanco).
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";

/**
 * Interfaz de Propiedades del componente.
 * @param {onPress} Funcion que se ejecuta al presionar el componente.
 * Suele manejar la limpieza del contexto de autenticación y la redirección.
 */
interface Props {
  onPress: () => void;
}

const LogOutComponent = ({ onPress }: Props) => {
  return (
    /**
     * Contenedor interactivo:
     * Utiliza Pressable para detectar el toque del usuario.
     * La clase 'items-center' asegura que el icono y el texto estén alineados verticalmente.
     */
    <Pressable onPress={onPress} className="items-center">
      {/* Icono de perfil de usuario */}
      <Ionicons
        name="person-circle-outline"
        size={50}
        // Blanco con 80% de opacidad para no sobrecargar visualmente el header
        className="text-white/80"
      />

      {/* Etiqueta de acción */}
      <Text className="text-white/80 font-bold">Cerrar Sesión</Text>
    </Pressable>
  );
};

export default LogOutComponent;
