import java.io.*;
import java.net.Socket;

public class EchoTestClient {

    public static void main(String[] args) throws Exception {

        Socket socket = new Socket("localhost", 7979);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream())
        );

        PrintWriter out = new PrintWriter(
                socket.getOutputStream(), true
        );

        // Simula operario
        out.println("{\"code\":\"200\",\"data\":{\"id\":5}}");

        new Thread(() -> {
            try {
                String line;
                while ((line = in.readLine()) != null) {
                    System.out.println("RECIBIDO >>> " + line);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

        // Espera y simula emergencia
        Thread.sleep(5000);

        Socket s2 = new Socket("localhost", 7979);
        PrintWriter out2 = new PrintWriter(s2.getOutputStream(), true);
        out2.println("{\"code\":\"201\",\"data\":{\"id\":\"5\"}}");

        System.out.println("201 enviado");
    }
}

