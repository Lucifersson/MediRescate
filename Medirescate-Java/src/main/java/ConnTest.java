import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnTest {

    public static void main(String[] args) {
        System.out.println(getConn());
    }

    public static Connection getConn() {
        String user = ConfigLoader.getDbUser();
        String password = ConfigLoader.getDbPassword();
        String port = ConfigLoader.getDbPort();
        String db = ConfigLoader.getDbDb();

        String url = "jdbc:mysql://"+user+":"+password+"@gateway01.eu-central-1.prod.aws.tidbcloud.com:"+port+"/"+db;

        try (Connection con = DriverManager.getConnection(url, user, password)) {
            return con;
        } catch (SQLException e) {
            LogWriter.logError(e);
            throw new RuntimeException("Error crítico cargando la conexión");
        }

    }


}
