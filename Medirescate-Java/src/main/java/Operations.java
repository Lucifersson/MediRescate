import com.google.gson.JsonObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Operations {

    public static Response operation100() {
        return new ResponseMSG("ok", "pong");
    }

    public static Response operation101(Connection conn) {
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

            Map<String, Object> data = new HashMap<>();
            data.put("nombres", nombres);

            return new ResponseDATA(data);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
