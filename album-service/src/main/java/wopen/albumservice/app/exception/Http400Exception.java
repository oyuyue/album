package wopen.albumservice.app.exception;

import org.springframework.http.HttpStatus;

public class Http400Exception extends HttpException {
    private HttpStatus status = HttpStatus.BAD_REQUEST;

    public Http400Exception() {
        super(HttpStatus.BAD_REQUEST);
    }

    public Http400Exception(String msg) {
        super(msg, HttpStatus.BAD_REQUEST);
    }

}
