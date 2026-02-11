/**
 * HOOK: useOperariosDisponibles
 * Propósito: Filtrar y obtener solo los trabajadores en estado "libre" para la asignación de nuevas emergencias.
 * Funcionalidad:
 * 1. Filtrado en Servidor: Utiliza el parámetro de estado para reducir el tráfico de datos.
 * 2. Soporte para Teleoperación: Proporciona la lista necesaria para llenar los selectores (pickers) de asignación.
 * 3. Comunicación TCP: Reutiliza el código de operación "6" con lógica de filtrado específica.
 */

import { useTcpSocket } from "@/core/actions/core.action";
import { NombreOperario } from "@/types/types";
import { useEffect, useState } from "react";

/**
 * Interface ArrayOperarios:
 * Define la estructura de respuesta donde 'users' contiene objetos tipo NombreOperario.
 */
interface ArrayOperarios {
  users: NombreOperario[];
}

export const useOperariosDisponibles = () => {
  // Inicializamos el socket TCP
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<ArrayOperarios>();

  // Estado local para los operarios aptos para asignación
  const [operarios, setOperarios] = useState<NombreOperario[]>([]);

  /**
   * solicitarOperarios:
   * Solicita exclusivamente los operarios disponibles.
   * Código "6": Operación de consulta de personal.
   * @param {estado} "libre" - Instruye al servidor para que solo devuelva operarios sin servicios activos.
   */
  const solicitarOperarios = () => {
    enviarPeticion("6", { estado: "libre" });
  };

  // --- PROCESAMIENTO DE RESPUESTA ---
  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        // Almacenamos los operarios disponibles para la UI del Teleoperador
        setOperarios(response.data.users);
      }
    }
  }, [response]);

  // Log de control para verificar la disponibilidad de la flota en tiempo real
  useEffect(() => {
    console.log("Operarios disponibles para asignar:\n ", operarios, "\n");
  }, [operarios]);

  return {
    solicitarOperarios, // Función para refrescar la disponibilidad antes de asignar una emergencia
    operarios, // Lista filtrada de nombres e IDs
    loading, // Estado de la consulta
    error, // Gestión de errores de red
  };
};
