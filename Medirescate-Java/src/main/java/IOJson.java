import com.google.gson.JsonObject;

class Request {
    public String code;
    public JsonObject data;
}




class Response {
    String status;
    String message;

    Response(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
