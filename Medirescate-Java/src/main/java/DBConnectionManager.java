import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBConnectionManager {

    private static DBConnectionManager instance;

    private final String url;
    private final String user;
    private final String password;

    public static void main(String[] args) throws SQLException {
        System.out.println(getInstance().getConnection());
    }

    private DBConnectionManager() {
        this.user = ConfigLoader.getDbUser();
        this.password = ConfigLoader.getDbPassword();
        String port = ConfigLoader.getDbPort();
        String db = ConfigLoader.getDbDb();

        this.url = "jdbc:mysql://"+user+":"+password+"@gateway01.eu-central-1.prod.aws.tidbcloud.com:"+port+"/"+db;
    }

    public static synchronized DBConnectionManager getInstance() {
        if (instance == null) {
            instance = new DBConnectionManager();
        }
        return instance;
    }

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }



}
