/**
 * HOOK: useTcpSocket
 * Propósito: Proveer una interfaz de comunicación de bajo nivel mediante Sockets TCP.
 * Funcionalidad:
 * 1. Establece conexiones punto a punto con el servidor MediRescate.
 * 2. Gestiona el envío de payloads JSON con códigos de operación específicos.
 * 3. Maneja estados de carga, respuesta y errores de red.
 * 4. Controla la selección de puertos dinámicos para diferentes microservicios.
 */

import { useState, useCallback } from "react";
import TcpSocket from "react-native-tcp-socket";
import { ApiResponse } from "@/types/types";

interface Props {
  /** Permite alternar entre el puerto base (7878) y el alternativo (7979) */
  altPort?: boolean;
}

export const useTcpSocket = <T>({ altPort }: Props = {}) => {
  // --- ESTADOS DE LA PETICIÓN ---
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * enviarPeticion: Abre un socket, envía datos y espera respuesta.
   * @param {code} Identificador de la operación (ej: '1', '7').
   * @param {dataBody} Objeto con la información necesaria para la operación.
   */
  const enviarPeticion = useCallback((code: string, dataBody: any) => {
    console.log("Databody: ", dataBody, "\n");
    setLoading(true);
    setError(null);

    // Configuración de conexión
    const options = {
      port: altPort ? 7979 : 7878,
      host: "192.168.0.227", // IP del Servidor Central
      reuseAddress: true, // Optimiza la reconexión rápida en dispositivos móviles
    };

    // Crear la conexión TCP
    const client = TcpSocket.createConnection(options, () => {
      // Estructura del protocolo definida: Código + Datos
      const payload = { code, data: dataBody };
      console.log("Enviando peticion...\n");

      /** * IMPORTANTE: Se añade "\n" al final del string para que el servidor
       * sepa que el mensaje ha terminado (delimitador de línea).
       */
      client.write(JSON.stringify(payload) + "\n");
      console.log("Peticion enviada en puerto: ", options.port, "\n");
    });

    // --- MANEJO DE RESPUESTA ---
    client.on("data", (rawData) => {
      try {
        console.log(
          "\nRESPUESTA RECIBIDA DE PUERTO: ",
          client.remotePort,
          "\n",
        );
        console.log("\nINFO RESPUESTA RAW: ", rawData.toString(), "\n");

        // Parseo de la respuesta binaria a objeto JSON
        const parsed: ApiResponse<T> = JSON.parse(rawData.toString());

        // Si el backend devuelve un status de error, se extrae el mensaje de 'data'
        if (parsed.status === "error") {
          setError(parsed.data as unknown as string);
        }

        setResponse(parsed);
      } catch (e) {
        setError("Error de formato JSON");
      } finally {
        setLoading(false);
        // Cerramos el socket inmediatamente tras recibir la respuesta para liberar recursos
        client.destroy();
      }
    });

    // --- MANEJO DE ERRORES DE RED ---
    client.on("error", (err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return { enviarPeticion, response, error, loading };
};
