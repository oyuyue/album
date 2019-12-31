package wopen.albumapi.account;

import org.springframework.web.bind.annotation.*;
import wopen.albumservice.app.account.AccountService;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.user.ChangeEmailCommand;
import wopen.albumservice.domain.model.user.ChangePasswordCommand;
import wopen.albumservice.domain.model.user.RetrievePasswordCommand;
import wopen.albumservice.domain.model.user.SignUpCommand;

import javax.servlet.http.HttpSession;

@RestController
public class AccountController {
    private final AccountService accountService;
    private final UserService userService;

    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
    }

    @GetMapping("/token")
    public TokenDto checkLogin(HttpSession session) {
        return new TokenDto(session.getId());
    }

    @PostMapping("/password")
    public void changePassword(@RequestBody ChangePasswordCommand command) {
        userService.changePassword(command);
    }

    @GetMapping("/captcha/sign-up")
    public void sendSignUpCaptcha(@RequestParam("email") String email) {
        accountService.sendSignUpCaptcha(email);
    }

    @GetMapping("/captcha/retrieve-password")
    public void sendRetrievePasswordCaptcha(@RequestParam("email") String email) {
        accountService.sendRetrievePasswordCaptcha(email);
    }

    @GetMapping("/captcha/email")
    public void sendChangeEmailCaptcha(@RequestParam("email") String email) {
        accountService.sendChangeEmailCaptcha(email);
    }

    @PostMapping("/sign-up")
    public TokenDto signUp(@RequestBody SignUpCommand command, HttpSession session) {
        accountService.signUp(command);
        return new TokenDto(session.getId());
    }

    @PostMapping("/retrieve-password")
    public TokenDto retrievePassword(@RequestBody RetrievePasswordCommand command, HttpSession session) {
        accountService.retrievePassword(command);
        return new TokenDto(session.getId());
    }

    @PostMapping("/email")
    public void changeEmail(@RequestBody ChangeEmailCommand command) {
        accountService.changeEmail(command);
    }
}
