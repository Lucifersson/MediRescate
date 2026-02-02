/*
 * V.0.2.1201
 *
 * @author: Marcos Miquel
 * Buenos días. Soy el Main. Mi propósito es muy simple:
 * Arranco el servidor -> abro un puerto -> espero clientes -> cada cliente va a su propio hilo -> el servidor sigue vivo.
 * Si yo no estoy encendido mal vamos.
 */

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class SecondaryServer {
    private static volatile boolean running = true;

    public static void main(String[] args) {
        int port = ConfigLoader.getSecPort();
        System.out.println(AnsiColors.YELLOW+"[SEC.SERVER]"+AnsiColors.RESET+" Escuchando en puerto: "+port+"...");

//        new Thread(new FakeClient(1, 1)).start();

        try (ServerSocket serverSocket = new ServerSocket(port)) {

            Gson gson = new Gson();
            while (running) {
                Socket clientSocket = serverSocket.accept(); // <-- Espera aquí

                    System.out.println("\n"+AnsiColors.YELLOW+"[SEC.SERVER]"+AnsiColors.RESET+" Conectado cliente en: "+clientSocket.getInetAddress()+"\n");

                    EmergencyHandler handler = new EmergencyHandler(clientSocket, clientSocket.getInetAddress()+"");
                    new Thread(handler).start();
            }

        } catch (Exception e) {
            LogWriter.logError(e);
        }
    }
}


