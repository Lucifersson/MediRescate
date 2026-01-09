class Request {
    String type;
    String data;
}



class Response {
    String status;
    String message;

    Response(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
