/*
 * @author: Marcos Miquel
 * Buenos días. Soy el Main. Mi propósito es muy simple:
 * Arranco el servidor -> abro un puerto -> espero clientes -> cada cliente va a su propio hilo -> el servidor sigue vivo.
 * Si yo no estoy encendido mal vamos.
 */

import java.net.ServerSocket;
import java.net.Socket;

public class Main {
    public static void main(String[] args) {
        int port = ConfigLoader.getPort();

        try (ServerSocket serverSocket = new ServerSocket(port)) {

            while (true) {
                Socket clientSocket = serverSocket.accept(); // <-- Espera aquí
                Client handler = new Client(clientSocket);
                new Thread(handler).start();
            }

        } catch (Exception e) {
            LogWriter.logError(e);
        }

    }
}
