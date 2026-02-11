/**
 * HOOK: useRegistrarEmergencia
 * Propósito: Gestionar la creación y asignación de nuevas emergencias en el sistema.
 * Funcionalidad:
 * 1. Alta de Incidencias: Envía los datos críticos (operario, descripción, teleoperador) al servidor central.
 * 2. Comunicación TCP: Utiliza el código de operación "7" para el registro de servicios.
 * 3. Feedback de Operación: Controla el estado del registro para permitir limpiar formularios o mostrar alertas de éxito.
 */

import { useTcpSocket } from "@/core/actions/core.action";
import { useEffect, useState } from "react";

export const useRegistrarEmergencia = () => {
  // Inicializamos el socket TCP. Usamos 'any' ya que la respuesta suele ser un mensaje de confirmación simple.
  const { enviarPeticion, response, error, loading } = useTcpSocket<any>();

  // Estado para confirmar si la transacción se completó en la base de datos
  const [registroExitoso, setRegistroExitoso] = useState(false);

  /**
   * registrarEmergencia: Función principal de envío.
   * Código "7": Operación de registro y asignación de emergencia.
   * @param {idOperario} ID del trabajador libre seleccionado en la interfaz.
   * @param {descripcion} Detalles del suceso (ubicación, tipo de urgencia, etc.).
   * @param {id_teleoperador} ID del usuario que registra la llamada para trazabilidad.
   */
  const registrarEmergencia = (
    idOperario: number | string,
    descripcion: string,
    id_teleoperador: number | undefined,
  ) => {
    setRegistroExitoso(false); // Reset del estado antes de una nueva petición

    enviarPeticion("7", {
      id_operario: idOperario,
      descripcion: descripcion,
      teleoperador: id_teleoperador,
    });
  };

  // --- ESCUCHA DE CONFIRMACIÓN ---
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setRegistroExitoso(true);
        console.log("Emergencia enviada correctamente al servidor.\n");
      }
    }
  }, [response]);

  return {
    registrarEmergencia, // Función disparadora para el formulario
    registroExitoso, // Booleano para feedback visual (ej: mostrar un Toast o navegar)
    loading, // Estado de la comunicación
    error, // Captura de errores de validación o red
  };
};
