import static org.junit.jupiter.api.Assertions.*;

import models.Usuario;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

public class UsuarioTest {

    @Test
    void constructorCompleto_creaUsuarioCorrecto() {

        Timestamp ts = new Timestamp(System.currentTimeMillis());

        Usuario u = new Usuario(
                1,
                "Marcos",
                "operario",
                ts,
                "mm",
                "1234"
        );

        assertEquals(1, u.getIdUsuario());
        assertEquals("Marcos", u.getNombre());
        assertEquals("operario", u.getCargo());
        assertEquals(ts, u.getUltimaConexion());
        assertEquals("mm", u.getUser());
        assertEquals("1234", u.getPassword());
    }

    @Test
    void constructorSimple_funciona() {

        Usuario u = new Usuario("Ana", "admin");

        assertEquals("Ana", u.getNombre());
        assertEquals("admin", u.getCargo());
    }

    @Test
    void setPassword_actualizaPassword() {

        Usuario u = new Usuario("Pepe", "user");

        u.setPassword("nueva");

        assertEquals("nueva", u.getPassword());
    }

    @Test
    void setUltimaConexion_actualizaTimestamp() {

        Usuario u = new Usuario("Pepe", "user");

        Timestamp ts = new Timestamp(System.currentTimeMillis());
        u.setUltimaConexion(ts);

        assertEquals(ts, u.getUltimaConexion());
    }
}
