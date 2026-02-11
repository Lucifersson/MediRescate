/**
 * HOOK: useOperariosEscucha
 * Propósito: Gestionar la recepción de alertas de emergencia para un operario específico.
 * Funcionalidad:
 * 1. Canal Alternativo: Utiliza el puerto 7979 ({ altPort: true }) para separar el tráfico
 * de notificaciones de las operaciones generales.
 * 2. Comunicación TCP: Envía el código de operación "200" para suscribirse o solicitar
 * la emergencia asignada a un ID.
 * 3. Sincronización: Actualiza la interfaz del operario en cuanto el servidor confirma una asignación.
 */

import { useTcpSocket } from "@/core/actions/core.action";
import { Emergencia } from "@/types/types";
import { useEffect, useState } from "react";

interface Props {
  /** ID del trabajador (idUsuario) que desea escuchar nuevas emergencias */
  id: number | undefined;
}

export const useOperariosEscucha = ({ id }: Props) => {
  /**
   * Instancia de Socket TCP.
   * Se configura con 'altPort: true' para apuntar al puerto 7979,
   * optimizando la escucha de eventos en tiempo real.
   */
  const { enviarPeticion, response, error, loading } = useTcpSocket<Emergencia>(
    { altPort: true },
  );

  const [emergencia, setEmergencia] = useState<Emergencia>();

  /**
   * solicitarEmergencia: Notifica al servidor que el operario está listo
   * para recibir los datos de su servicio.
   * Código "200": Protocolo para recuperar emergencia por ID de operario.
   */
  const solicitarEmergencia = () => {
    if (!id) return;
    enviarPeticion("200", { id: id });
    console.log("Solicitando datos de emergencia para ID: ", id, "\n");
  };

  // --- ESCUCHA DE ASIGNACIÓN ---
  useEffect(() => {
    if (response) {
      // console.log("MENSAJE RESPUESTA RECIBIDO: ", response);
      if (response.status === "success") {
        /**
         * Si el servidor responde con éxito, se carga el objeto Emergencia
         * con la descripción y datos del incidente.
         */
        console.log("Datos de emergencia cargados: ", response.data, "\n");
        setEmergencia(response.data);
      }
    }
  }, [response]);

  // NOTE: Monitorización de cambios en el estado de la emergencia

  // useEffect(() => {
  //   console.log("Estado de emergencia actualizado en el hook: ", emergencia);
  // }, [emergencia]);

  return {
    solicitarEmergencia, // Disparador para refrescar o forzar la escucha
    emergencia, // Objeto con la información de la alerta (o undefined)
    loading, // Estado de la conexión
    error, // Fallos en el puerto 7979
  };
};
