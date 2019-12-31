package wopen.albumservice.exception;

import org.springframework.http.HttpStatus;
import wopen.albumservice.infra.i18n.Messages;

public class UploadFailedException extends HttpException {
    public UploadFailedException() {
        super(Messages.UPLOAD_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
