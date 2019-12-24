package wopen.albumservice.app.account;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import wopen.albumcore.utils.$;
import wopen.albumcore.utils.WebContextHolder;
import wopen.albumservice.app.exception.WrongCaptchaException;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.model.user.UserRepo;
import wopen.albumservice.messaging.EmailSender;

import javax.servlet.http.HttpSession;

@Service
public class AccountServiceImpl implements AccountService {
    private static final String SIGN_UP_EMAIL_CAPTCHA = "SIGN_UP_EMAIL_CAPTCHA";
    private final UserRepo userRepo;
    private final EmailSender emailSender;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(UserRepo userRepo, EmailSender emailSender, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.emailSender = emailSender;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void sendSignUpCaptcha(String email) {
        String captcha = RandomStringUtils.randomNumeric(6);
        HttpSession sess = WebContextHolder.getSession();
        sess.removeAttribute(SIGN_UP_EMAIL_CAPTCHA);
        sess.setAttribute(SIGN_UP_EMAIL_CAPTCHA, captcha);
        emailSender.send(
                email,
                "注册验证码",
                "<html><body><h3>" + captcha + "</h3></body></html>"
        );
    }

    @Override
    public void signUp(String email, String password, String captcha) {
        HttpSession sess = WebContextHolder.getSession();
        String correctCaptcha = (String) sess.getAttribute(SIGN_UP_EMAIL_CAPTCHA);
        if (!StringUtils.equals(captcha, correctCaptcha)) {
            throw new WrongCaptchaException();
        }

        User user = new User($.uuidString(), passwordEncoder.encode(password), email);
        userRepo.save(user);

        sess.removeAttribute(SIGN_UP_EMAIL_CAPTCHA);
    }
}
