
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.*;
import java.net.Socket;
import java.sql.Connection;


public class EmergencyHandler implements Runnable {

    private final Socket socket;
    private final Gson gson = new Gson();
    private final String inet;


    public EmergencyHandler(Socket socket, String inet) {
        this.socket = socket;
        this.inet = inet;
    }


    @Override
    public void run() {

        try (
                Connection conn = DBConnectionManager.getInstance().getConnection();

                BufferedReader in = new BufferedReader( //objeto para leer lo que ha llegado
                        new InputStreamReader(socket.getInputStream())
                );

        ) {
            PrintWriter out = new PrintWriter( //objeto para enviar información
                    socket.getOutputStream(), true
            );
            String line;
            Request req = null;
            while ((line = in.readLine()) != null) {
                System.out.println(AnsiColors.BLUE+"[EmergencyHandler "+inet+"]"+AnsiColors.RESET+" JSON recibido "+AnsiColors.GREEN_BRIGHT+"[<<] "+AnsiColors.RESET + line);

                // Parseo JSON
                 req = gson.fromJson(line, Request.class);

            }

            String id = req.data.get("id").getAsString();

            OperariosManager.addOut(id, out);

            while (!conn.isClosed()) {



            }

            // Procesar
            Response resp = processRequestCode(req, conn);

            System.out.println(AnsiColors.BLUE+"[EmergencyHandler "+inet+"]"+AnsiColors.RESET+" JSON respuesta "+AnsiColors.RED_BRIGHT+"[>>] "+ AnsiColors.RESET + gson.toJson(resp));

            // Responder
            out.println(gson.toJson(resp));

        } catch (Exception e) {
            LogWriter.logError(e);
        } finally {
            try {
                socket.close();
            } catch (IOException ignored) {}
        }

        System.out.println(AnsiColors.BLUE+"[EmergencyHandler "+inet+"]"+AnsiColors.RED+" Conexión cerrada"+AnsiColors.RESET);
    }




    private Response processRequestCode(Request req, Connection conn) {

        return switch (req.code) {
//            case "" -> {}


            default -> {
                LogWriter.logError(new Exception("[EmergencyHandler] - Codigo de operación no encontrado"));
                yield new ResponseMSG("error", "[EmergencyHandler] - \"Codigo de operación no encontrado");
            }
        };


    }
}
