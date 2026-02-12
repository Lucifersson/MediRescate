package models;

public class ResponseMSG extends Response {
    public String status;
    public String message;
    public ResponseMSG(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
