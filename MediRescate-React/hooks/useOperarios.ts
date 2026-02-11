/**
 * HOOK: useOperarios
 * Propósito: Obtener el listado completo de operarios y sus estados para la gestión administrativa.
 * Funcionalidad:
 * 1. Consulta Global: Solicita al servidor el estado de todos los usuarios registrados como operarios.
 * 2. Comunicación TCP: Utiliza el código de operación "6" del protocolo MediRescate.
 * 3. Gestión de Datos: Almacena y actualiza el array de OperariosAdmin para alimentar las listas de supervisión.
 */

import { useTcpSocket } from "@/core/actions/core.action";
import { OperariosAdmin } from "@/types/types";
import { useEffect, useState } from "react";

/**
 * Interface ArrayOperarios:
 * Define la estructura esperada en el campo 'data' de la respuesta del servidor.
 */
interface ArrayOperarios {
  users: OperariosAdmin[];
}

export const useOperarios = () => {
  // Inicializamos el socket TCP para recibir la lista de usuarios
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<ArrayOperarios>();

  // Estado local para almacenar la colección de operarios
  const [operarios, setOperarios] = useState<OperariosAdmin[]>([]);

  /**
   * solicitarOperariosTodos:
   * Dispara la petición al servidor central.
   * Código "6": Operación para listar personal y ambulancias.
   * @param {estado}. Se envía "NULL" para indicar que se requieren todos los estados (Libre/Ocupado/En camino).
   */
  const solicitarOperariosTodos = () => {
    enviarPeticion("6", { estado: "NULL" });
  };

  // --- PROCESAMIENTO DE RESPUESTA ---
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        // Actualizamos el estado con el array de usuarios contenido en la respuesta
        setOperarios(response.data.users);
      }
    }
  }, [response]);

  // Log de depuración para seguimiento en consola del estado del array

  // useEffect(() => {
  //   console.log("Contenido de array operarios actualizado: ", operarios);
  // }, [operarios]);

  return {
    solicitarOperariosTodos, // Función para refrescar la lista (Pull-to-refresh)
    operarios, // Datos para el renderizado
    loading, // Estado de la conexión
    error, // Errores de red
  };
};
