/*
 * V.0.2.1201
 *
 * @author: Marcos Miquel
 * Buenos días. Soy el Main. Mi propósito es muy simple:
 * Arranco el servidor -> abro un puerto -> espero clientes -> cada cliente va a su propio hilo -> el servidor sigue vivo.
 * Si yo no estoy encendido mal vamos.
 */

import java.net.ServerSocket;
import java.net.Socket;

public class MainServer {
    public static void main(String[] args) {
        int port = ConfigLoader.getPort();
        System.out.println("Servidor escuchando en puerto: "+port+"...");

        //Descomentar para iniciar un test de conexión local
        new Thread(new FakeClient(101)).start();

        try (ServerSocket serverSocket = new ServerSocket(port)) {

            while (true) {
                Socket clientSocket = serverSocket.accept(); // <-- Espera aquí
                System.out.println("[MainServer] - Cliente conectado: "+clientSocket.getInetAddress()+"\n");

                Client handler = new Client(clientSocket, clientSocket.getInetAddress()+"");
                new Thread(handler).start();
            }

        } catch (Exception e) {
            LogWriter.logError(e);
        }

    }
}
    