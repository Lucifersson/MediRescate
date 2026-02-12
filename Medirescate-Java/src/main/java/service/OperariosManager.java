package service;

import java.io.PrintWriter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class OperariosManager {

    public static Map<String, PrintWriter> operarios = new ConcurrentHashMap<>();

    public static PrintWriter getOut(String id) {
        return operarios.get(id);
    }

    public static void addOut(String id, PrintWriter out) {
        PrintWriter viejo = operarios.put(id, out);
        if (viejo != null) {
            viejo.close();
        }
        System.out.println("[OP.MANAGER]Registrando operario con id = " + id);
        System.out.println("Operarios conectados: " + operarios.keySet());

    }

    public static void cerrarOut(String id) {
        operarios.get(id).close();
    }
}
