
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.Socket;

public class Client implements Runnable {

    private Socket socket;

    public Client(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

            String message;
            while ((message = br.readLine()) != null) {
                System.out.println("Recibido: " + message);
            }

        } catch (Exception e) {
            LogWriter.logError(e);
        }
    }
}
