import java.io.FileWriter;
import java.time.LocalDateTime;

public class LogWriter {

    public static void logError(Exception e) {
        final String LOG_FILE = "server_error.log";

        try (FileWriter fw = new FileWriter(LOG_FILE, true)) {
            fw.write(LocalDateTime.now() + " - " + e.getMessage() + "\n");
            fw.flush();
        } catch (Exception ignored) {}
    }
}
