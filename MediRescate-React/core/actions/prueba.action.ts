import TcpSocket from "react-native-tcp-socket";

/**
 * Envía un mensaje JSON específico al servidor Java vía TCP
 */
export const enviarMensajeServidor = () => {
  const options = {
    port: 7878,
    host: "172.30.77.54",
    reuseAddress: true,
  };

  const client = TcpSocket.createConnection(options, () => {
    console.log("Conectado al servidor");

    // Formato solicitado con el "hola" incluido
    const payload = {
      code: "0",
      data: {
        message: "hola - ping pong",
      },
    };

    // Convertimos a string y enviamos
    client.write(JSON.stringify(payload) + "\n");
  });

  client.on("data", (data) => {
    console.log("Respuesta del servidor:", data.toString());
    client.destroy(); // Cerramos la conexión tras recibir respuesta
  });

  client.on("error", (error) => {
    console.error("Error en la conexión TCP:", error);
  });
};
