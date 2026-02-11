/**
 * HOOK: useEmergenciasAdmin
 * Propósito: Gestionar la obtención del historial o lista activa de emergencias para el Administrador.
 * Funcionalidad:
 * 1. Comunicación TCP: Utiliza el código de operación "8" para solicitar el listado global.
 * 2. Tipado Estricto: Mapea la respuesta del servidor a una interfaz de EmergenciaAdmin[].
 * 3. Estado Local: Mantiene una copia de las emergencias para alimentar los componentes de la UI.
 */

import { useTcpSocket } from "@/core/actions/core.action";
import { EmergenciaAdmin } from "@/types/types";
import { useEffect, useState } from "react";

/**
 * RespuestaEmergencias: Estructura esperada del cuerpo 'data'
 * cuando el servidor responde con éxito.
 */
interface RespuestaEmergencias {
  emergencias: EmergenciaAdmin[];
}

export const useEmergenciasAdmin = () => {
  // Inicializamos el motor TCP configurado para recibir un objeto tipo RespuestaEmergencias
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<RespuestaEmergencias>();

  // Estado que almacena la lista procesada de emergencias
  const [listaEmergencias, setListaEmergencias] = useState<EmergenciaAdmin[]>(
    [],
  );

  /**
   * solicitarEmergenciasAdmin: Dispara la petición al servidor.
   * Código "8": Identificador interno del protocolo para "Listar todas las emergencias".
   */
  const solicitarEmergenciasAdmin = () => {
    enviarPeticion("8", {});
  };

  // --- ESCUCHA DE RESPUESTA ---
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        // Log de depuración para verificar la integridad de los datos recibidos
        // console.log(
        //   "Valor de emergencias recibidas: ",
        //   response.data.emergencias,
        // );

        // Actualizamos el estado con el array proveniente del servidor
        setListaEmergencias(response.data.emergencias);
      }
    }
  }, [response]);

  return {
    solicitarEmergenciasAdmin, // Función para refrescar los datos
    listaEmergencias, // Array de datos para el FlatList
    loading, // Estado de carga para mostrar ActivityIndicator
    error, // Errores de red o de socket
  };
};
