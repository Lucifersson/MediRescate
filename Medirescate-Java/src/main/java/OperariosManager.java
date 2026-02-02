import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

public class OperariosManager {

    public static Map<String, Connection> operarios = new HashMap<>();

    public static Connection getConn(String id) {
        return operarios.get(id);
    }

    public static void addConn(String id, Connection conn) {
        operarios.put(id, conn);
    }
}
