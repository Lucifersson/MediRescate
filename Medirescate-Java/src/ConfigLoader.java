import java.io.InputStream;
import java.util.Properties;

public class ConfigLoader {

    private static Properties props = new Properties();

    static {
        try {
            InputStream is = ConfigLoader.class
                    .getClassLoader()
                    .getResourceAsStream("server.properties");

            if (is == null) {
                throw new RuntimeException("server.properties no encontrado");
            }

            props.load(is);

        } catch (Exception e) {
            LogWriter.logError(e);
            throw new RuntimeException("Error crítico cargando configuración");
        }
    }

    public static int getPort() {
        return Integer.parseInt(props.getProperty("server.port"));
    }

    public static String getDbUrl() {
        return props.getProperty("db.url");
    }

    public static String getDbUser() {
        return props.getProperty("db.user");
    }

    public static String getDbPassword() {
        return props.getProperty("db.password");
    }
}
