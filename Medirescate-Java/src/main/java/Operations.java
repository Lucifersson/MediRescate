import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Operations {

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




            return new ResponseDATA(usuarios);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
