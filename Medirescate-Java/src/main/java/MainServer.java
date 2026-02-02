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

public class MainServer {

    public static void main(String[] args) {
        int port = ConfigLoader.getPort();
        System.out.println(AnsiColors.YELLOW+"\n[MAINSERVER]"+AnsiColors.GREEN_BRIGHT+"SERVIDOR ENCENDIDO Escuchando en puerto: "+port+"...");


//        new Thread(new FakeClient(6, 1, 1)).start();


        try (ServerSocket serverSocket = new ServerSocket(port)) {

            Gson gson = new Gson();
            while (true) {
                Socket clientSocket = serverSocket.accept(); // <-- Espera aquí

                System.out.println("\n"+AnsiColors.YELLOW+"[MAINSERVER]"+AnsiColors.RESET+" Conectado cliente en: "+clientSocket.getInetAddress()+"\n");

                Client handler = new Client(clientSocket, clientSocket.getInetAddress()+"");
                new Thread(handler).start();
            }


        } catch (Exception e) {
            LogWriter.logError(e);
        }
    }
}


