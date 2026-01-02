import java.io.FileWriter;
import java.time.LocalDateTime;

public class LogWriter {

    public static void logError(Exception e) {
        try (FileWriter fw = new FileWriter("server_error.log", true)) {
            fw.write(LocalDateTime.now() + " - " + e.getMessage() + "\n");
        } catch (Exception ignored) {}
    }
}
