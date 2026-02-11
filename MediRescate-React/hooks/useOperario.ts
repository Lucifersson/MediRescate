/**
 * HOOK: useOperario
 * Propósito: Gestionar el estado operativo de un trabajador y sincronizarlo con el servidor.
 * Funcionalidad:
 * 1. Control de Disponibilidad: Permite al operario cambiar su estado (ej: de 'libre' a 'en_marcha').
 * 2. Comunicación TCP: Utiliza el código de operación "5" para notificar cambios de estado.
 * 3. Reactividad Visual: Traduce el estado técnico en clases de color para la interfaz.
 */

import { useEffect, useState } from "react";
import { EstadoOperario, Operario } from "@/types/types";
import { useTcpSocket } from "@/core/actions/core.action";

interface Props {
  /** Objeto del operario actual obtenido del contexto de autenticación */
  operario: Operario | null;
}

export const useOperario = ({ operario }: Props) => {
  // Estado local que refleja la situación actual del operario
  const [estado, setEstado] = useState(operario?.estado);

  // Motor TCP configurado para recibir la confirmación del nuevo estado
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<EstadoOperario>();

  // --- SINCRONIZACIÓN CON EL SERVIDOR ---
  useEffect(() => {
    if (response && response.status === "success") {
      // Si el servidor confirma el cambio, actualizamos el estado local
      setEstado(response.data.newState);
    }
  }, [response]);

  // Manejo de errores de conexión o protocolo
  useEffect(() => {
    if (error) {
      console.error(
        "\nError en la petición de cambio de estado: ",
        error,
        "\n",
      );
    }
  }, [error]);

  /**
   * cambioEstado: Envía una solicitud de actualización al servidor.
   * Código "5": Operación para actualizar estado de disponibilidad.
   * @param {valor}. El nuevo estado deseado ('libre', 'en_marcha', 'ocupado').
   */
  const cambioEstado = (valor: string) => {
    enviarPeticion("5", {
      id_operario: operario?.idUsuario,
      prevState: estado,
      newState: valor,
    });
  };

  // --- LÓGICA VISUAL (TEMATIZACIÓN) ---
  const [color, setColor] = useState("bg-red-600");

  /**
   * Efecto que traduce el estado en un sufijo de color de Tailwind.
   * NOTE: El hook devuelve el sufijo (ej: '-red-600') para ser concatenado en el componente.
   */
  useEffect(() => {
    switch (estado) {
      case "ocupado":
        setColor("-red-600");
        break;
      case "en_marcha":
        setColor("-orange-500");
        break;
      case "libre":
      default:
        setColor("-green-600");
        break;
    }
  }, [estado]);

  return {
    estado, // Estado técnico actual
    color, // Sufijo de color para estilos dinámicos
    cambioEstado, // Función para disparar la actualización
    loading, // Estado de la petición TCP
  };
};
