package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class UserNotFoundException extends HttpException {
    public UserNotFoundException() {
        super(Messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
