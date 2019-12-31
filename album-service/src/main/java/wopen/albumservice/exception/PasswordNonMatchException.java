package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class PasswordNonMatchException extends HttpException {
    public PasswordNonMatchException() {
        super(Messages.USER_PASSWORD_NON_MATCH, HttpStatus.BAD_REQUEST);
    }
}
