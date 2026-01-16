import { useTcpSocket } from "@/core/actions/prueba.action";
import { Operario } from "@/types/types";
import { router } from "expo-router";
import { useState, useEffect } from "react";

export const useAuth = () => {
  // Usamos el hook modular que creamos antes
  const { enviarPeticion, response, error, loading } = useTcpSocket<Operario>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorCamposVacios, setErrorCamposVacios] = useState<string>();
  const [errorUsuario, setErrorUsuario] = useState<string>();

  // 1. Efecto para manejar la respuesta del servidor cuando cambie
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        const usuario = response.data;
        console.log("Login exitoso para:", usuario.nombre);
        router.replace("/(stack)/(tabs)/operario");
      } else {
        // Si el status es 'error', mostramos el mensaje que viene en data
        setErrorUsuario(
          (response.data as unknown as string) || "Error de autenticación",
        );
      }
    }
  }, [response]);

  // 2. Efecto para manejar errores de conexión TCP
  useEffect(() => {
    if (error) setErrorUsuario(error);
  }, [error]);

  const onLoginPress = () => {
    // Validación básica
    if (username.trim() === "" || password.trim() === "") {
      setErrorCamposVacios("Rellena usuario y contraseña");
      return;
    }

    setErrorCamposVacios("");
    setErrorUsuario("");

    // 🚀 CORRECCIÓN: Llamamos directamente a la función del socket
    console.log("Iniciando petición de login...");
    enviarPeticion("1", {
      user: username,
      password: "$2b$10$wq9k8KJp6zRzV0wQZx4V9e4sQy1JZ7qZqQ5Z0dXk1XyZ0N0X9e1uG",
    });
  };

  return {
    username,
    password,
    errorCamposVacios,
    errorUsuario,
    loading, // Es útil devolver loading para deshabilitar el botón
    setUsernameValue: setUsername,
    setPasswordValue: setPassword,
    onLoginPress,
  };
};

