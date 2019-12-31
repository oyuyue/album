package wopen.albumservice.exception;

import wopen.albumservice.infra.i18n.Messages;

public class CaptchaExistException extends Http400Exception {
    public CaptchaExistException() {
        super(Messages.CAPTCHA_EXIST);
    }
}
