import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class FakeClient implements Runnable {

    private final String host;
    private final int port;
    private final int code;

    public FakeClient(int code) {
        this.host = "localhost";
        this.port = ConfigLoader.getPort();
        this.code = code;
    }

    @Override
    public void run() {
        System.out.println("[FakeClient] Enviando petición en\n[FakeClient] 3...");
        try {
            Thread.sleep(1000);
            System.out.println("[FakeClient] 2..");
            Thread.sleep(1000);
            System.out.println("[FakeClient] 1.\n");
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            LogWriter.logError(e);
        }

        try (
                Socket socket = new Socket(host, port);
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(socket.getInputStream())
                )
        ) {
            String json = "";
            switch (this.code) {
                case 0: //ping
                    json = "{\"code\":\"0\",\"data\":{\"message\":\"ping\" }}";
                    break;
                case 1: //select
                    json = "{\"code\":\"1\",\"data\":{\"message\":\"Pido users\" }}";
                    break;
                default:
                    LogWriter.logError(new Exception("[FakeClient] Codigo de operación no encontrado"));

            }

            if (!json.isEmpty()) {
                System.out.println("[FakeClient] Enviando: " + json);
                out.println(json);


                String response = in.readLine();
                System.out.println("[FakeClient] Respuesta: " + response);
            }


        } catch (Exception e) {
            LogWriter.logError(e);
        }
    }
}

