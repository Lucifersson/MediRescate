package BdClasses;

import java.sql.Timestamp;

public class Operario extends Usuario{

    private String estado;
    public Operario(int idEmpleado, String nombre, String cargo, Timestamp ultimaConexion, String user, String password, String estado) {
        super(idEmpleado, nombre, cargo, ultimaConexion, user, password);
        this.estado = estado;
    }


}
