/**
 * HOOK: useFinalizarEmergencia
 * Propósito: Notificar al servidor el cierre o finalización de una emergencia específica.
 * Funcionalidad:
 * 1. Comunicación TCP: Utiliza el código de operación "9" para enviar la instrucción.
 * 2. Parámetros: Recibe 'id_emergencia' para identificar el recurso a modificar.
 * 3. Gestión de Respuesta: No gestiona datos de retorno, solo el estado de la transacción.
 */

import { useTcpSocket } from "@/core/actions/core.action";

export const useFinalizarEmergencia = (id_emergencia: number | undefined) => {
  // Inicializamos el motor TCP. Usamos 'any' o una interfaz vacía ya que no procesamos respuesta [cite: 2025-11-09]
  const { enviarPeticion, loading, error, response } = useTcpSocket<any>();

  /**
   * finalizarEmergencia: Dispara la petición al servidor.
   * Código "9": Identificador interno para "Finalizar Emergencia". [cite: 2025-11-09]
   */
  const finalizarEmergencia = () => {
    if (!id_emergencia) {
      console.warn("Intento de finalizar emergencia sin ID válido");
      return;
    }

    // Enviamos el código 9 junto al parámetro id_emergencia [cite: 2025-11-09]
    enviarPeticion("9", { id_emergencia });
  };

  return {
    finalizarEmergencia, // Función para ejecutar la acción
    loading, // Para deshabilitar botones mientras se procesa
    error, // Para capturar fallos en el envío
    success: response?.status === "success", // Flag rápido de éxito
  };
};
