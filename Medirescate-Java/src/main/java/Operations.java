import BdClasses.Operario;
import BdClasses.Usuario;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Operations {

    public static Gson gson = new Gson();

    //TESTING OPERATIONS
    public static Response operation100() {
        return new ResponseMSG("ok", "pong");
    }

    public static Response operation101(Connection conn) {

        String sql = """
        SELECT nombre, cargo
        FROM Usuario
                    """;

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            List<Usuario> usuarios = new ArrayList<>();

            while (rs.next()) {
                usuarios.add(
                        new Usuario(
                                rs.getString("nombre"),
                                rs.getString("cargo")
                        )
                );
            }




            return new ResponseDATA("ok", usuarios);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //APP OPERATIONS
    public static Response operation1(Connection conn, Request req) {
        String sql = """
    SELECT usu.*
    FROM Usuario usu
    WHERE usu.user = ?;
    """;

        String userGotten = req.data.get("user").getAsString();
        String passwordGotten = req.data.get("password").getAsString();

        String status = "";
        String json = "";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {


            ps.setString(1, userGotten);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                String passwordBD = rs.getString("password");

                if (passwordBD.equals(passwordGotten)) {

                    BdClasses.Usuario user = new Usuario(
                            rs.getInt("id_empleado"),
                            rs.getString("nombre"),
                            rs.getString("cargo"),
                            rs.getTimestamp("ultima_conexion"),
                            rs.getString("user"),
                            passwordBD
                    );

                    json = gson.toJson(user);
                    status = "success";
                } else {
                    JsonObject errorData = new JsonObject();
                    errorData.addProperty("message", "Contraseña incorrecta");

                    Response response = new ResponseDATA("error", errorData);
                }
            } else {
                JsonObject errorData = new JsonObject();
                errorData.addProperty("message", "Usuario no encontrado");

                Response response = new ResponseDATA("error", errorData);
            }

        return new ResponseDATA(status, json);

        } catch (SQLException e) {
            LogWriter.logError(e);
            throw new RuntimeException(e);

        }
    }
}
