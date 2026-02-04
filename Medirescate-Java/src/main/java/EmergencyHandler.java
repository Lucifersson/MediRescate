
import com.google.gson.Gson;
import com.google.gson.JsonObject;

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

            String jsonMSG;
            String status = "success";
            if (req.code.equals("201")) { //llamada de mainserver
                PrintWriter outOper = OperariosManager.getOut(req.data.get("id").getAsString());

                outOper.println("Prueba exitosa ou yeah");
                //TODO pues el código de enviar la emergencia y tal
                jsonMSG =  "Emergencia enviada";
            } else { //llamada de operario
                String id = req.data.get("id").getAsString();
                OperariosManager.addOut(id, out);

                jsonMSG =  "Conexión creada exitosamente";
            }
            JsonObject data = new JsonObject();
            data.addProperty("msg", jsonMSG);
            ResponseDATA resp = new ResponseDATA(status, data);
//            out.println(gson.toJson(resp)); MATAR

            System.out.println(AnsiColors.BLUE+"[EmergencyHandler "+inet+"]"+AnsiColors.RESET+" JSON respuesta "+AnsiColors.RED_BRIGHT+"[>>] "+ AnsiColors.RESET + jsonMSG);

            if (req.code.equals("201")) { //llamada de mainserver
                out.close();
            }

        } catch (Exception e) {
            LogWriter.logError(e);
        }
    }

}
