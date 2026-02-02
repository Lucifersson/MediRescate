import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class OperariosManager {

    public static Map<String, PrintWriter> operarios = new HashMap<>();

    public static PrintWriter getOut(String id) {
        return operarios.get(id);
    }

    public static void addOut(String id, PrintWriter out) {
        operarios.put(id, out);
    }

    public static void cerrarOut(String id) {
        operarios.get(id).close();
    }
}
