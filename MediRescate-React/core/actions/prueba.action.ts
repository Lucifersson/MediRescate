import { useState, useCallback } from "react";
import TcpSocket from "react-native-tcp-socket";

export const useTcpService = () => {
  const [data, setData] = useState<string>("Esperando...");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const enviarMensajeFijo = useCallback(() => {
    setLoading(true);
    setError(null);

    const options = {
      port: 7878,
      host: "192.168.0.227",
      reuseAddress: true,
    };

    const client = TcpSocket.createConnection(options, () => {
      const payload = {
        code: "1",
        data: { message: "hola - ping pong" },
      };
      client.write(JSON.stringify(payload) + "\n");
    });

    client.on("data", (response) => {
      setData(response.toString());
      setLoading(false);
      client.destroy();
    });

    client.on("error", (err) => {
      setError(err.message);
      setData(`Error: ${err.message}`);
      setLoading(false);
    });
  }, []);

  return { enviarMensajeFijo, data, error, loading };
};
