import BdClasses.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Operations {

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




            return new ResponseDATA("ok",usuarios);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //APP OPERATIONS
    public static Response operation1(Connection conn, Request req) {
        String sql = """
    SELECT *
    FROM Usuario
    WHERE user = ?
""";

        String userGotten = req.data.get("user").getAsString();
        String passwordGotten = req.data.get("password").getAsString();

        Usuario usuario = null;
        String status = "";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, userGotten);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                String passwordBD = rs.getString("password");

                if (passwordBD.equals(passwordGotten)) {

                    usuario = new Usuario(
                            rs.getInt("id_empleado"),
                            rs.getString("nombre"),
                            rs.getString("cargo"),
                            rs.getTimestamp("ultima_conexion"),
                            rs.getString("user"),
                            passwordBD
                    );

                    status = "success";
                } else {
                    return new ResponseDATA("error", "Contraseña incorrecta.");
                }
            } else {
                return new ResponseDATA("error", "Usuario no encontrado.");

            }


        return new ResponseDATA(status, usuario);


        } catch (SQLException e) {
            LogWriter.logError(e);
            throw new RuntimeException(e);

        }
    }
}
