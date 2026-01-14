import com.google.gson.JsonObject;

import java.util.Map;

class Request {
    public String code;
    public JsonObject data;
}



class Response{}

class ResponseMSG extends Response {
    String status;
    String message;
    public ResponseMSG(String status, String message) {
        this.status = status;
        this.message = message;
    }
}

class ResponseDATA extends Response {
    Map<String, Object> data;

    public ResponseDATA(Map<String, Object> data) {
        this.data = data;
    }
}

