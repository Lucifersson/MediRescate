package models;

import java.sql.Timestamp;

public class Usuario {

    private int idUsuario;
    private String nombre;
    private String cargo;
    private Timestamp ultimaConexion;
    private String user;
    private String password;

    // Constructor completo
    public Usuario(int idEmpleado, String nombre, String cargo,
                   Timestamp ultimaConexion, String user, String password) {
        this.idUsuario = idEmpleado;
        this.nombre = nombre;
        this.cargo = cargo;
        this.ultimaConexion = ultimaConexion;
        this.user = user;
        this.password = password;
    }


    public Usuario(String nombre, String cargo) {
        this.nombre = nombre;
        this.cargo = cargo;

    }

    // Getters
    public int getIdUsuario() {
        return idUsuario;
    }

    public String getNombre() {
        return nombre;
    }


    public String getCargo() {
        return cargo;
    }

    public Timestamp getUltimaConexion() {
        return ultimaConexion;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

    // Setters

    public void setUltimaConexion(Timestamp ultimaConexion) {
        this.ultimaConexion = ultimaConexion;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
