package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class AuthException extends HttpException {
    public AuthException() {
        super(Messages.RELOGIN, HttpStatus.UNAUTHORIZED);
    }
}
