
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.*;
import java.net.Socket;

public class Client implements Runnable {

    private final Socket socket;
    private final Gson gson = new Gson();


    public Client(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {

        try (
                BufferedReader in = new BufferedReader( //objeto para leer lo que ha llegado
                        new InputStreamReader(socket.getInputStream())
                );
                PrintWriter out = new PrintWriter( //objeto para enviar información
                        socket.getOutputStream(), true
                )
        ) {
            String line;

            while ((line = in.readLine()) != null) {
                System.out.println("JSON recibido: " + line);

                // Parseo JSON
                Request req = gson.fromJson(line, Request.class);

                // Procesar
                Response resp = process(req);

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

    private Response process(Request req) {
        return new Response("ok", "Recibido " + req.type);
    }
}
