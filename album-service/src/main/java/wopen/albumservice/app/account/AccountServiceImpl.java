package wopen.albumservice.app.account;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.user.ChangeEmailCommand;
import wopen.albumservice.domain.model.user.RetrievePasswordCommand;
import wopen.albumservice.domain.model.user.SignUpCommand;
import wopen.albumservice.exception.CaptchaExistException;
import wopen.albumservice.exception.WrongCaptchaException;
import wopen.albumservice.messaging.EmailSender;

import java.time.Duration;

@Service
public class AccountServiceImpl implements AccountService {
    private static final String CAPTCHA_SIGN_UP = "captcha:signUp:";
    private static final String CAPTCHA_RETRIEVE_PASSWORD = "captcha:retrievePassword:";
    private static final String CAPTCHA_CHANGE_EMAIL = "captcha:email:";
    private final EmailSender emailSender;
    private final StringRedisTemplate redisTemplate;
    private final UserService userService;

    public AccountServiceImpl(EmailSender emailSender,
                              StringRedisTemplate redisTemplate,
                              UserService userService) {
        this.emailSender = emailSender;
        this.redisTemplate = redisTemplate;
        this.userService = userService;
    }

    @Override
    public void sendSignUpCaptcha(String email) {
        sendEmailCaptcha(CAPTCHA_SIGN_UP, email);
    }

    @Override
    public void sendRetrievePasswordCaptcha(String email) {
        sendEmailCaptcha(CAPTCHA_RETRIEVE_PASSWORD, email);
    }

    @Override
    public void signUp(SignUpCommand command) {
        String key = CAPTCHA_SIGN_UP + command.getEmail();
        checkCaptcha(key, command.getCaptcha());
        userService.signUp(command.getEmail(), command.getPassword());
        redisTemplate.delete(key);
    }

    @Override
    public void retrievePassword(RetrievePasswordCommand command) {
        String key = CAPTCHA_RETRIEVE_PASSWORD + command.getEmail();
        checkCaptcha(key, command.getCaptcha());
        userService.changePassword(command.getPassword());
        redisTemplate.delete(key);
    }

    @Override
    public void sendChangeEmailCaptcha(String email) {
        sendEmailCaptcha(CAPTCHA_CHANGE_EMAIL, email);
    }

    @Override
    public void changeEmail(ChangeEmailCommand command) {
        String key = CAPTCHA_CHANGE_EMAIL + command.getEmail();
        checkCaptcha(key, command.getCaptcha());
        userService.changeEmail(command.getNewEmail());
        redisTemplate.delete(key);
    }

    private void checkCaptchaExist (String key) {
        Boolean exist = redisTemplate.hasKey(key);
        if (exist != null && !exist) throw new CaptchaExistException();
    }

    private void checkCaptcha(String key, String captcha) {
        String correct = redisTemplate.opsForValue().get(key);
        if (!StringUtils.equals(correct, captcha)) {
            throw new WrongCaptchaException();
        }
    }

    private String getRandomCaptcha() {
        return RandomStringUtils.randomNumeric(6);
    }

    private void sendEmailCaptcha(String keyPrefix, String email) {
        String key = keyPrefix + email;
        checkCaptchaExist(key);
        String captcha = getRandomCaptcha();
        redisTemplate
                .opsForValue()
                .set(key, captcha, Duration.ofMinutes(1));
        emailSender.send(
                email,
                "验证码",
                "<html><body><h3>" + captcha + "</h3></body></html>"
        );
    }
}
