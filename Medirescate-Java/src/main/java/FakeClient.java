import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class FakeClient implements Runnable {

    private final String host;
    private final int port;
    private final int code;
    private final int silent;

    public FakeClient(int code, int silent, int server) {
        this.silent=silent;
        this.host = "localhost";
        this.code = code;
        if (server==1) {
            this.port = ConfigLoader.getPort();
        } else {
            this.port = ConfigLoader.getSecPort();
        }
    }

    @Override
    public void run() {
        if (silent<1) { // Cuenta atrás
            System.out.println(AnsiColors.PURPLE_BRIGHT+"[FakeClient]"+AnsiColors.RESET+" Enviando petición en\n"+AnsiColors.PURPLE_BRIGHT+"[FakeClient]"+AnsiColors.RESET+" 3...");
            try {
                Thread.sleep(1000);
                System.out.println(AnsiColors.PURPLE_BRIGHT+"[FakeClient]"+AnsiColors.RESET+" 2..");
                Thread.sleep(1000);
                System.out.println(AnsiColors.PURPLE_BRIGHT+"[FakeClient]"+AnsiColors.RESET+" 1.\n");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                LogWriter.logError(e);
            }
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
                case 100 -> //ping
                        json = "{\"code\":\"100\",\"data\":{\"message\":\"Ping\"}}";
                case 101 -> //select
                        json = "{\"code\":\"101\",\"data\":{\"message\":\"Pido users\"}}";
                case 1 ->
                        json = "{\"code\":\"1\",\"data\":{\"user\":\"pedros\",\"password\":\"9b8769a4a742959a2d0298c36fb70623f2dfacda8436237df08d8dfd5b37374c\"}}";
                case 2 ->
                        json = "{\"code\":\"2\",\"data\":{\"id_empleado\":\"1\"}}";
                case 5 ->
                        json = "{\"code\":\"5\",\"data\":{\"id_operario\":1,\"prevState\":\"libre\",\"newState\":\"ocupado\"}}";
                case 6 ->
                        json = "{\"code\":\"6\",\"data\":{\"estado\":\"null\"}}";
                case 7 ->
                        json = "{\"code\":\"7\",\"data\":{\"id_operario\":1, \"descripcion\":\"emergencia de prueba\"}}";
                case -1 ->
                        json = "{\"code\":\"-1\"}";

                default ->
                        LogWriter.logError(new Exception(AnsiColors.PURPLE_BRIGHT + "[FakeClient]" + AnsiColors.RESET + " Codigo de operación no encontrado"));
            }

            if (!json.isEmpty()) {
                if (silent<2) {
                    System.out.println(AnsiColors.PURPLE_BRIGHT+"[FakeClient]"+AnsiColors.RESET+" Enviando "+AnsiColors.RED_BRIGHT+"[>>] "+ AnsiColors.RESET + json);
                }
                out.println(json);


                String response = in.readLine();
                if (silent<2) {
                    System.out.println(AnsiColors.PURPLE_BRIGHT + "[FakeClient]" + AnsiColors.RESET + " Respuesta " + AnsiColors.GREEN_BRIGHT + "[<<] " + AnsiColors.RESET + response);
                }
            }


        } catch (Exception e) {
            LogWriter.logError(e);
        }
    }
}

