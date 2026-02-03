
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
                BufferedReader in = new BufferedReader( //objeto para leer lo que ha llegado
                        new InputStreamReader(socket.getInputStream())
                );
        ) {
            PrintWriter out = new PrintWriter( //objeto para enviar información
                    socket.getOutputStream(), true
            );
            String line = in.readLine();
            Request req = null;
            if (line != null) {
                System.out.println(AnsiColors.BLUE+"[EmergencyHandler "+inet+"]"+AnsiColors.RESET+"JSON recibido: " + line);
                req = gson.fromJson(line, Request.class);
            }

            String id = req.data.get("id").getAsString();

            OperariosManager.addOut(id, out);

            out.println(AnsiColors.BLUE+"[EmergencyHandler "+inet+"]"+AnsiColors.RESET+" JSON respuesta "+AnsiColors.RED_BRIGHT+"[>>] "+ AnsiColors.RESET + "{\"status\":\"success\",\"data\":{}");

            while ((line = in.readLine()) != null) {
                // mensajes posteriores
            }
        } catch (Exception e) {
            LogWriter.logError(e);
        } finally {
            try {
                socket.close();
            } catch (IOException ignored) {}
        }
    }

}
