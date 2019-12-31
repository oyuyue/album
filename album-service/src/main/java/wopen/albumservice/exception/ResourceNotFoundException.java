package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class ResourceNotFoundException extends HttpException {
    public ResourceNotFoundException() {
        super(Messages.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
