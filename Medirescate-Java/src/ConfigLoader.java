import java.io.FileInputStream;
import java.util.Properties;

public class ConfigLoader {

    private static Properties props = new Properties();

    static {
        try {
            props.load(new FileInputStream("server.properties"));
        } catch (Exception e) {
            LogWriter.logError(e);
            throw new RuntimeException("No se pudo cargar server.properties");
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
