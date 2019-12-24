package wopen.albumservice.app.exception;

import org.springframework.http.HttpStatus;

public class HttpException extends RuntimeException {
    private HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

    public HttpException(HttpStatus status) {
        super();
        this.status = status;
    }

    public HttpException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpException(String message, Throwable cause, HttpStatus status) {
        super(message, cause);
        this.status = status;
    }

    public HttpException(Throwable cause, HttpStatus status) {
        super(cause);
        this.status = status;
    }

    protected HttpException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public HttpStatus getStatus() {
        return status;
    }
}
