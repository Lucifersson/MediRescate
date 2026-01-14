
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.*;
import java.net.Socket;
import java.sql.Connection;


public class Client implements Runnable {

    private final Socket socket;
    private final Gson gson = new Gson();
    private final String inet;


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
                System.out.println("[Client "+inet+"] JSON recibido: " + line);

                // Parseo JSON
                Request req = gson.fromJson(line, Request.class);

                // Procesar
                Response resp = processRequestCode(req, conn);

                System.out.println("[Client "+inet+"] - JSON respuesta: " + gson.toJson(resp));

                // Responder
                out.println(gson.toJson(resp));
            }

        } catch (Exception e) {
            LogWriter.logError(e);
        } finally {
            try {
                socket.close();
            } catch (IOException ignored) {}
        }
    }




    private Response processRequestCode(Request req, Connection conn) {

        switch (req.code) {
            case "100": //ping
                return Operations.operation100();

            case "101": //select
                return Operations.operation101(conn);

            default:
                LogWriter.logError(new Exception("[Client] - Codigo de operación no encontrado"));
                return new ResponseMSG("error", "[Client] - \"Codigo de operación no encontrado");

        }


    }
}
