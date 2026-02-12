
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.*;
import java.net.Socket;
import java.sql.Connection;
import java.sql.SQLException;


public class Client implements Runnable {

    private final Socket socket;
    private final Gson gson = new Gson();
    private final String inet;
    private Request req = new Request();

    public Client(Socket socket, String inet) {
        this.socket = socket;
        this.inet = inet;
    }


    @Override
    public void run() {

        try (   Connection conn = DBConnectionManager.getInstance().getConnection();

                BufferedReader in = new BufferedReader( //objeto para leer lo que ha llegado
                        new InputStreamReader(socket.getInputStream())
                );
                PrintWriter out = new PrintWriter( //objeto para enviar información
                        socket.getOutputStream(), true
                )
        ) {

            String line;
            while ((line = in.readLine()) != null) {

                System.out.println(AnsiColors.BLUE+"[Client "+inet+"]"+AnsiColors.RESET+" JSON recibido "+AnsiColors.GREEN_BRIGHT+"[<<] "+AnsiColors.RESET+line);

                // Parseo JSON
                req = gson.fromJson(line, Request.class);

                // Procesar
                if (!req.code.matches("-1")) {

                    Response resp = processRequestCode(req, conn);

                    System.out.println(AnsiColors.BLUE+"[Client "+inet+"]"+AnsiColors.RESET+" JSON respuesta "+AnsiColors.RED_BRIGHT+"[>>] "+ AnsiColors.RESET + gson.toJson(resp));

                    // Responder
                    out.println(gson.toJson(resp));
                }

            }

        } catch (Exception e) {
            LogWriter.logError(e);
        } finally {
            try {
                socket.close();
            } catch (IOException ignored) {}
        }
        if (!req.code.matches("-1")) {
            System.out.println(AnsiColors.BLUE+"[Client "+inet+"]"+AnsiColors.RED+" Conexión cerrada"+AnsiColors.RESET);

        }
    }




    Response processRequestCode(Request req, Connection conn) throws SQLException {
        
        return switch (req.code) {
            case "100" -> Operations.operation100();
            case "101" -> Operations.operation101(conn);
            case "1" -> Operations.operation1(conn, req);
            case "2" -> Operations.operation2(conn, req);
            case "5" -> Operations.operation5(conn, req);
            case "6" -> Operations.operation6(conn, req);
            case "7" -> Operations.operation7(conn, req);
            case "8" -> Operations.operation8(conn, req);
            case "9" -> Operations.operation9(conn, req);


            default -> {
                LogWriter.logError(new Exception("[Client] - Codigo de operación no encontrado"));
                yield new ResponseMSG("error", "[Client] - \"Codigo de operación no encontrado");
            }
        };


    }
}
