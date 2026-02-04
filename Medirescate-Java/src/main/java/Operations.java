import BdClasses.Usuario;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.ConnectException;
import java.net.Socket;
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
            WHERE cargo = 'operario';
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
    // operarios
    public static Response operation6(Connection conn, Request req) {


        String sql = """
                SELECT o.id_operario, u.nombre, ua.id_ambulancia, o.estado
                FROM Operario o
                JOIN Usuario u ON u.id_usuario = o.id_operario
                LEFT JOIN UsaAmbulancia ua ON ua.id_operario = o.id_operario
                WHERE o.estado = ? OR ? IS NULL;
            """;

        String estado = req.data.get("estado").getAsString();
        boolean filtrar = !estado.equalsIgnoreCase("NULL");

        JsonObject data = new JsonObject();
        JsonArray users = new JsonArray();

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            if (filtrar) {
                ps.setString(1, estado);
                ps.setString(2, estado);
            } else {
                ps.setNull(1, Types.VARCHAR);
                ps.setNull(2, Types.VARCHAR);
            }
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                JsonObject operario = new JsonObject();
                operario.addProperty("id_operario", rs.getString(1));
                operario.addProperty("nombre", rs.getString(2));

                if (!filtrar) {
                    operario.addProperty("ambulancia", rs.getInt(3));
                    operario.addProperty("estado", rs.getString(4));
                }

                users.add(operario);
            }

            data.add("users", users);
            String status = "success";
            return new ResponseDATA(status, data);
        } catch (SQLException e) {
            LogWriter.logError(e);
            JsonObject errorData = new JsonObject();
            errorData.addProperty("message", "Error conectando con la base de datos");
            return new ResponseDATA("error", errorData);
        }
    }

    //crear emergencia
    public static Response operation7(Connection conn, Request req) throws SQLException {
        String sql = """
                INSERT INTO Emergencia (emergencia, latitud, longitud, hora_emergencia, estado, id_teleoperador)
                VALUES (?, ?, ?, ?, ?, ?);
                """;

        String sql2 = """
                INSERT INTO AsignarEmergencia (id_emergencia, id_operario)
                VALUES (?, ?);
                """;

        try (PreparedStatement ps = conn.prepareStatement(
                sql, Statement.RETURN_GENERATED_KEYS
        );
             PreparedStatement ps2 = conn.prepareStatement(sql2)) {

            ps.setString(1, req.data.get("descripcion").getAsString());
            ps.setBigDecimal(2, BigDecimal.ONE);
            ps.setBigDecimal(3, BigDecimal.ONE);
            ps.setTimestamp(4, Timestamp.valueOf("2000-01-01 00:00:00"));
            ps.setString(5, "activa");
            ps.setInt(6, req.data.get("teleoperador").getAsInt());

            ps.executeUpdate();

            int idEmergencia = -1;
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    idEmergencia = rs.getInt(1);
                }
            }

            ps2.setInt(1, idEmergencia);
            ps2.setInt(2, req.data.get("id_operario").getAsInt());

            ps2.executeUpdate();

            String status = "success";
            JsonObject data = new JsonObject();
            String idOp = req.data.get("id_operario").getAsString();
            String descripcion = req.data.get("descripcion").getAsString();

            try (Socket socket = new Socket("localhost", 7979)) {
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                String json = "{\"code\":\"201\",\"data\":{\"id\":\""+idOp+"\", \"id_emergencia\":\""+idEmergencia+"\", \"descripcion\":\""+descripcion+"\"}}"; //json que le envio al otro server con la id del usuario que tiene la emergengia TODO añadir el resto de info de la emergencia
                out.println(json);
            } catch (Exception e) {
                LogWriter.logError(e);
            }

            return new ResponseDATA(status, data);
        }
    }
    //listar emergencias
    public static Response operation8(Connection conn, Request req) {
        String sql = """
                SELECT e.emergencia, o.id_operario, u.nombre
                FROM Emergencia e
                JOIN AsignarEmergencia ae ON e.id_emergencia = ae.id_emergencia
                JOIN Operario o ON ae.id_operario = o.id_operario
                JOIN Usuario u ON o.id_operario = u.id_usuario
                WHERE e.estado != 'cerrada';
                """;

        JsonObject data = new JsonObject();
        JsonArray emergencias = new JsonArray();

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ResultSet rs = ps.executeQuery();


            while (rs.next()) {
                JsonObject emergencia = new JsonObject();
                emergencia.addProperty("id_operario", rs.getInt(2));
                emergencia.addProperty("nombre_operario", rs.getString(3));
                emergencia.addProperty("descripcion", rs.getString(1));

                emergencias.add(emergencia);
            }

            data.add("emergencias", emergencias);
            String status = "success";
            return new ResponseDATA(status, data);

        } catch (SQLException e) {
            LogWriter.logError(e);
            JsonObject errorData = new JsonObject();
            errorData.addProperty("message", "Error conectando con la base de datos");
            return new ResponseDATA("error", errorData);
        }

    }

    public static Response operation9(Connection conn, Request req) {
        String sql = """
                UPDATE Emergencia
                SET estado = 'cerrada'
                WHERE id_emergencia = ?
                """;

        String id = req.data.get("id_emergencia").getAsString();

        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id);

            ps.executeUpdate();

            JsonObject data = new JsonObject();
            data.addProperty("estado", "cerrada");

            return new ResponseDATA("success", data);

        } catch (SQLException e) {
            LogWriter.logError(e);
            return new ResponseMSG("error", "Error al actualizar el estado de la emergencia");
        }
    }

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
