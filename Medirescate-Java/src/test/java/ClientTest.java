import static org.junit.jupiter.api.Assertions.*;

import models.Request;
import models.Response;
import models.ResponseMSG;
import network.Client;
import org.junit.jupiter.api.Test;
import java.net.Socket;

public class ClientTest {

    @Test
    void codigo100_devuelvePong() throws Exception {

        Socket socket = new Socket(); // no se conecta
        Client client = new Client(socket, "local");

        Request req = new Request();
        req.code = "100";

        Response resp = client.processRequestCode(req, null);

        assertTrue(resp instanceof ResponseMSG);

        ResponseMSG msg = (ResponseMSG) resp;

        assertEquals("ok", msg.status);
        assertEquals("pong", msg.message);
    }

    @Test
    void codigoInvalido_devuelveError() throws Exception {

        Socket socket = new Socket();
        Client client = new Client(socket, "local");

        Request req = new Request();
        req.code = "999";

        Response resp = client.processRequestCode(req, null);

        assertTrue(resp instanceof ResponseMSG);

        ResponseMSG msg = (ResponseMSG) resp;

        assertEquals("error", msg.status);
    }
}
