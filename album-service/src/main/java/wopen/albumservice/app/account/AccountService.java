package wopen.albumservice.app.account;

public interface AccountService {
    void sendSignUpCaptcha(String email);
    void signUp(String email, String password, String captcha);

    void changePassword(String password);
}
