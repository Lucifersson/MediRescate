/**
 * HOOK: useAuth
 * Propósito: Orquestar el proceso de autenticación completo.
 * Funcionalidad:
 * 1. Validación de entradas: Verifica que los campos no estén vacíos.
 * 2. Seguridad: Hashea la contraseña en SHA-256 antes del envío (no viaja en texto plano).
 * 3. Comunicación: Utiliza 'useTcpSocket' con el código de operación "1".
 * 4. Redirección Basada en Roles: Deriva al usuario a su panel correspondiente (Admin/Operario/Teleoperador).
 * 5. Gestión de Estado: Actualiza el Contexto Global tras un éxito.
 */

import { useTcpSocket } from "@/core/actions/core.action";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { Operario } from "@/types/types";
import { router } from "expo-router";
import { sha256 } from "js-sha256";
import { useEffect, useState } from "react";

export const useAuth = () => {
  // Hook del Socket instanciado con el tipo genérico 'Operario' para tipar la respuesta
  const { enviarPeticion, response, error, loading } = useTcpSocket<Operario>();

  // Acceso al método 'login' del Contexto Global
  const { login } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorCamposVacios, setErrorCamposVacios] = useState<string>();
  const [errorUsuario, setErrorUsuario] = useState<string>();

  // --- 1. MANEJO DE LA RESPUESTA DEL SERVIDOR ---
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        const usuario = response.data;

        // Persistencia en el estado global (Contexto)
        login(usuario);
        console.log("Login exitoso para:", usuario.nombre, "\n");

        /**
         * REDIRECCIÓN DINÁMICA POR ROL:
         * El servidor devuelve el 'cargo'. Según este, movemos al usuario
         * a su stack de navegación específico.
         */
        if (usuario.cargo === "administrador") {
          router.replace("/(stack)/(tabs)/admin");
        } else if (usuario.cargo === "operario") {
          router.replace("/(stack)/(tabs)/operario");
        } else if (usuario.cargo === "teleoperador") {
          router.replace("/(stack)/(tabs)/teleoperador");
        } else {
          router.replace("/(stack)/(tabs)/operario");
        }
      } else {
        // Error de credenciales (Usuario no encontrado o clave errónea)
        setErrorUsuario(
          (response.data as unknown as string) || "Credenciales incorrectas",
        );
      }
    }
  }, [response]);

  // --- 2. MANEJO DE ERRORES DE RED ---
  useEffect(() => {
    if (error) {
      setErrorUsuario("Error de conexión con el servidor");
      console.error("TCP Error:", error, "\n");
    }
  }, [error]);

  /**
   * onLoginPress: Acción disparada por el botón 'Entrar'.
   */
  const onLoginPress = () => {
    // Reset de errores previos
    setErrorCamposVacios("");
    setErrorUsuario("");

    // Validación básica de UI
    if (username.trim() === "" || password.trim() === "") {
      setErrorCamposVacios("Rellena usuario y contraseña");
      return;
    }

    /**
     * SEGURIDAD:
     * Generamos un hash SHA-256 de la contraseña.
     * El servidor comparará este hash con el almacenado en la DB.
     */
    const hashedPass = sha256(password);

    // Envío de petición TCP con código "1" (Login)
    enviarPeticion("1", {
      user: username,
      password: hashedPass,
    });
  };

  return {
    username,
    password,
    errorCamposVacios,
    errorUsuario,
    loading,
    setUsernameValue: setUsername,
    setPasswordValue: setPassword,
    onLoginPress,
  };
};
