import { useTcpSocket } from "@/core/actions/core.action";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { Operario } from "@/types/types";
import { router } from "expo-router";
import { sha256 } from "js-sha256";
import { useEffect, useState } from "react";
import { useOperario } from "./useOperario";

export const useAuth = () => {
  // Hook del Socket con el tipo Operario
  const { enviarPeticion, response, error, loading } = useTcpSocket<Operario>();

  // Acceso al contexto global
  const { login } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorCamposVacios, setErrorCamposVacios] = useState<string>();
  const [errorUsuario, setErrorUsuario] = useState<string>();

  // NOTE: se comenta para implementar version del context

  // const logOut = (operario: Operario | null) => {
  //   // Cuando exista tipo user hay que cambiarlo, de momento solo está hecho con operario
  //
  //   if (operario) {
  //     const { cambioEstado } = useOperario({ operario });
  //     cambioEstado("ocupado");
  //   }
  //   router.replace("/(stack)/login");
  // };

  // 1. Manejo de la respuesta del servidor
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        const usuario = response.data;

        // Guardamos los datos en el contexto global
        login(usuario);
        console.log("Login exitoso para:", usuario.nombre);

        // Redirección dinámica según el cargo que viene del servidor
        if (usuario.cargo === "administrador") {
          router.replace("/(stack)/(tabs)/admin");
        } else if (usuario.cargo === "operario") {
          // PARA MARIO: Solo he cosneguido hacerlo creando antes el operario ya que hasta aqui solo tienes un user que no puede utilizaar cambioEstado. Comprueba que funciona correctamente.
          // const [operario] = useState<Operario | null>(response.data);
          // const { cambioEstado } = useOperario({operario})
          // cambioEstado("libre")
          router.replace("/(stack)/(tabs)/operario");
        } else if (usuario.cargo === "teleoperador") {
          router.replace("/(stack)/(tabs)/teleoperador");
        } else {
          // Si no tiene un cargo definido, enviamos a una ruta por defecto
          router.replace("/(stack)/(tabs)/operario");
        }
      } else {
        // El servidor devolvió un error (Usuario no encontrado, etc.)
        // Convertimos 'data' a string ya que en caso de error el servidor envía el mensaje ahí
        setErrorUsuario(
          (response.data as unknown as string) || "Credenciales incorrectas",
        );
      }
    }
  }, [response]);

  // 2. Manejo de errores de conexión TCP (Server caído, IP incorrecta)
  useEffect(() => {
    if (error) {
      setErrorUsuario("Error de conexión con el servidor");
      console.error("TCP Error:", error);
    }
  }, [error]);

  const onLoginPress = () => {
    // Limpieza de estados de error previos
    setErrorCamposVacios("");
    setErrorUsuario("");

    // Validación de campos
    if (username.trim() === "" || password.trim() === "") {
      setErrorCamposVacios("Rellena usuario y contraseña");
      return;
    }

    // Petición al servidor (Código "1" para Login)
    // Nota: El password aquí se envía tal cual lo espera tu lógica de backend
    console.log("Iniciando petición de login para:", username);
    const hashedPass = sha256(password);
    console.log(hashedPass);

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
