package wopen.albumservice.exception;

import wopen.albumservice.infra.i18n.Messages;

public class ChangePasswordFailedException extends Http400Exception {
    public ChangePasswordFailedException() {
        super(Messages.CHANGE_PASSWORD_FAILED);
    }
}
