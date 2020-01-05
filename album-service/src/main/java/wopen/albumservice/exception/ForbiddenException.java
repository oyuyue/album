package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class ForbiddenException extends HttpException {
    public ForbiddenException() {
        this(Messages.FORBIDDEN_OPERATION);
    }

    public ForbiddenException(String msg) {
        super(msg, HttpStatus.FORBIDDEN);
    }
}
