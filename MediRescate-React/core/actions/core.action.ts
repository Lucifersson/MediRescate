import { useState, useCallback } from "react";
import TcpSocket from "react-native-tcp-socket";
import { ApiResponse } from "@/types/types";

interface Props {
  altPort?: boolean;
}

export const useTcpSocket = <T>({ altPort }: Props = {}) => {
  // El estado ahora espera una ApiResponse con el tipo de dato T
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const enviarPeticion = useCallback((code: string, dataBody: any) => {
    console.log("Databody: ", dataBody);
    setLoading(true);
    setError(null);

    const options = {
      port: altPort ? 7979 : 7878,
      host: "192.168.217.173",
      reuseAddress: true,
    };

    const client = TcpSocket.createConnection(options, () => {
      const payload = { code, data: dataBody };
      console.log("Enviando peticion...");
      client.write(JSON.stringify(payload) + "\n");
      console.log("Peticion enviada en puerto: ", options.port);
    });

    client.on("data", (rawData) => {
      try {
        console.log("RESPUESTA RECIBIDA: ", client.remotePort);
        console.log("INFO RESPUESTA: ", rawData.toString());
        const parsed: ApiResponse<T> = JSON.parse(rawData.toString());

        if (parsed.status === "error") {
          // Si el servidor avisa de un error en su lógica interna
          setError(parsed.data as unknown as string);
        }

        setResponse(parsed);
      } catch (e) {
        setError("Error de formato JSON");
      } finally {
        setLoading(false);
        client.destroy();
      }
    });

    client.on("error", (err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return { enviarPeticion, response, error, loading };
};
