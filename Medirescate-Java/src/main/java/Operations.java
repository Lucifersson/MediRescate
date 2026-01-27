import BdClasses.Usuario;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.net.ConnectException;
import java.sql.*;
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
    // LOGIN
    public static Response operation1(Connection conn, Request req) {
        String sql = """
            SELECT usu.*
            FROM Usuario usu
            WHERE usu.user = ?;
            """;

        String userGotten = req.data.get("user").getAsString();
        String passwordGotten = req.data.get("password").getAsString();

        String status;
        JsonObject json = new JsonObject();

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, userGotten);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                String passwordBD = rs.getString("password");
                if (passwordBD.equals(passwordGotten)) {

                    BdClasses.Usuario user = new Usuario(
                            rs.getInt("id_usuario"),
                            rs.getString("nombre"),
                            rs.getString("cargo"),
                            rs.getTimestamp("ultima_conexion"),
                            rs.getString("user"),
                            passwordBD
                    );

                    JsonObject data = gson.toJsonTree(user).getAsJsonObject();

                    status = "success";

                    String estado = getEstado(user.getIdUsuario()+"", conn);
                    if (estado!=null){
                        data.addProperty("estado", estado);
                    } else {
                        data.addProperty("estado", "");
                    }


                    return new ResponseDATA(status, data);

                } else { //contraseña incorrecta
                    JsonObject errorData = new JsonObject();
                    errorData.addProperty("message", "Contraseña incorrecta");

                    return new ResponseDATA("error", errorData);
                }
            } else { //usuario no encontrado
                JsonObject errorData = new JsonObject();
                errorData.addProperty("message", "Usuario no encontrado");

                return new ResponseDATA("error", errorData);
            }


        } catch (SQLException e) {
            LogWriter.logError(e);
            JsonObject errorData = new JsonObject();
            errorData.addProperty("message", "Error conectando con la base de datos");
            return new ResponseDATA("error", errorData);
        }
    }
    // devolver estado
    public static Response operation2(Connection conn, Request req) {

        String idGotten = req.data.get("id_empleado").getAsString();

        String status;

        String estado = getEstado(idGotten, conn);

        if(estado!=null) {
            status="success";
            JsonObject data = new JsonObject();
            data.addProperty("estado", estado);
            return new ResponseDATA(status, data);
        }

        status="error";
        String msg = "operario no encontrado";
        JsonObject data = new JsonObject();
        data.addProperty("message", msg);
        return new ResponseDATA(status, data);
    }
    // update estado
    public static Response operation5(Connection conn, Request req) {
        String idGotten = req.data.get("id_operario").getAsString();
        String prevState = req.data.get("prevState").getAsString();
        String newState = req.data.get("newState").getAsString();


        String sql = """
                UPDATE Operario
                SET estado = ?
                WHERE id_operario = ?
                """;


        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newState);
            ps.setString(2, idGotten);

            ps.executeUpdate();

            JsonObject data = new JsonObject();
            data.addProperty("newState", newState);

            return new ResponseDATA("success", data);

        } catch (SQLException e) {
            LogWriter.logError(e);
            return new ResponseMSG("error", "Error al actualizar el estado del operario");
        }
    }
    // operarios libres
//    public static Response operation6(Connection conn, Request req) {
//        String sql = """
//                SELECT o.id_operario, u.nombre
//                FROM Operario o
//                JOIN Usuario u ON u.id_usuario = o.id_operario
//                WHERE o.estado = ?;
//            """;
//
//        String estado = req.data.get("estado").getAsString();
//
//        JsonObject json = new JsonObject();
//
//        try (PreparedStatement ps = conn.prepareStatement(sql)) {
//
//            ps.setString(1, estado);
//            ResultSet rs = ps.executeQuery();
//
//            if (rs.next()) {
//
//            }
//        } catch (SQLException e) {
//            LogWriter.logError(e);
//            JsonObject errorData = new JsonObject();
//            errorData.addProperty("message", "Error conectando con la base de datos");
//            return new ResponseDATA("error", errorData);
//        }
//    }

    //EMERGENCY OPERATIONS
    public static Response operation200(Connection conn, Request request) {
        return null;
    }


    //PRIVATE OPERATIONS

    private static String getEstado(String idOperario, Connection conn) {
        String sql = """
                SELECT estado
                FROM Operario
                WHERE id_operario = ?;
                """;
        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, idOperario);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return rs.getString("estado");

            } else {

                return null;
            }

        } catch (SQLException e) {
            LogWriter.logError(e);
            throw new RuntimeException(e);
        }
    }


}
