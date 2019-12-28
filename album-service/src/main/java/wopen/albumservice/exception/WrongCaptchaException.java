package wopen.albumservice.exception;

import wopen.albumservice.infra.i18n.Messages;

public class WrongCaptchaException extends Http400Exception {
    public WrongCaptchaException() {
        super(Messages.WRONG_CAPTCHA);
    }
}
