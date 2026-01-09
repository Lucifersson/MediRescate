
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.*;
import java.net.Socket;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Client implements Runnable {

    private final Socket socket;
    private final Gson gson = new Gson();


    public Client(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {

        try (
                Connection conn = DBConnectionManager
                        .getInstance()
                        .getConnection();
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
                Response resp = process(req, conn);

                System.out.println("JSON respuesta: " + gson.toJson(resp));


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

    private Response process(Request req, Connection conn) {

        switch (req.code) {
            case "0": //ping
                return new Response("ok", "pong");
            case "1": //select

                String sql = """
                        SELECT nombre
                        FROM Usuario
                        """;

                try(PreparedStatement ps = conn.prepareStatement(sql)) {

                    ResultSet rs = ps.executeQuery();
                    ArrayList<String> nombres = new ArrayList<>();
                    while (rs.next()) {
                        nombres.add(rs.getString("nombre"));

                    }

                    rs.close();

                    String endNames = "";
                    for (String i: nombres) {
                        endNames = endNames+i+";";
                    }

                    return new Response("ok", endNames);

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            default:
                LogWriter.logError(new Exception("Codigo de operación no encontrado"));
                return new Response("error", "\"Codigo de operación no encontrado");

        }


    }
}
