import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class ConfigLoaderTest {

    @Test
    void getPort_devuelveNumeroValido() {

        int port = ConfigLoader.getPort();

        assertTrue(port > 0);
    }

    @Test
    void getDbUser_noEsNull() {

        assertNotNull(ConfigLoader.getDbUser());
    }

    @Test
    void getDbPassword_noEsNull() {

        assertNotNull(ConfigLoader.getDbPassword());
    }

    @Test
    void getSecondaryPort_esValido() {

        int port = ConfigLoader.getSecPort();

        assertTrue(port > 0);
    }
}
