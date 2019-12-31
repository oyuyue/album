package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class InternalServerException extends HttpException {
    public InternalServerException() {
        super(Messages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
