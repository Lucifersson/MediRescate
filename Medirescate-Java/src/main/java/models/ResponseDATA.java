package models;

public class ResponseDATA extends Response {
    String status;
    private Object data;

    public ResponseDATA(String status, Object data) {
        this.status = status;
        this.data = data;
    }

    public Object getData() {
        return data;
    }
}

