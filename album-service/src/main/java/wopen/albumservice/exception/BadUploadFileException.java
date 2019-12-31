package wopen.albumservice.exception;

import wopen.albumservice.infra.i18n.Messages;

public class BadUploadFileException extends Http400Exception {
    public BadUploadFileException() {
        super(Messages.UPLOAD_FAILED);
    }

    public BadUploadFileException(String msg) {
        super(msg);
    }
}
