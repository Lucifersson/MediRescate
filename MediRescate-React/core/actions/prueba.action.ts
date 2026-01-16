import { OperariosResponse } from "@/types/TestResponse";
import { useCallback, useState } from "react";
import TcpSocket from "react-native-tcp-socket";

export const useTcpSocket = () => {
  const [objectResponse, setObjectResponse] = useState<OperariosResponse>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const enviarMensajeFijo = useCallback(() => {
    setLoading(true);
    setError(null);

    const options = {
      port: 7878,
      host: "192.168.1.144",
      reuseAddress: true,
    };

    const client = TcpSocket.createConnection(options, () => {
      const payload = {
        code: "101",
        data: { message: "hola - ping pong" },
      };
      client.write(JSON.stringify(payload) + "\n");
    });

    client.on("data", (response) => {
      const rawData = response.toString();
      try {
        const parsed = JSON.parse(rawData) as OperariosResponse;
        setObjectResponse(parsed);
      } catch (e) {
        setError("Error al parsear JSON del servidor");
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

  return { enviarMensajeFijo, objectResponse, error, loading };
};
export default useTcpSocket;
