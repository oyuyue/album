package wopen.albumapi.account;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wopen.albumservice.app.account.AccountService;

import javax.servlet.http.HttpSession;

@RestController
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/token")
    public TokenDto checkLogin(HttpSession session) {
        return new TokenDto(session.getId());
    }

    @PostMapping("/captcha")
    public void sendCaptcha(@RequestBody SendCaptchaCommand command) {
        accountService.sendSignUpCaptcha(command.getEmail());
    }

    @PostMapping("/signup")
    public TokenDto signUp(@RequestBody SignUpCommand command, HttpSession session) {
        accountService.signUp(
                command.getEmail(),
                command.getPassword(),
                command.getCaptcha());

        return new TokenDto(session.getId());
    }
}
