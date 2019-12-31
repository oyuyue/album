package wopen.albumservice.app.account;

import wopen.albumservice.domain.model.user.ChangeEmailCommand;
import wopen.albumservice.domain.model.user.RetrievePasswordCommand;
import wopen.albumservice.domain.model.user.SignUpCommand;

public interface AccountService {
    void sendSignUpCaptcha(String email);
    void sendRetrievePasswordCaptcha(String email);
    void signUp(SignUpCommand command);
    void retrievePassword(RetrievePasswordCommand command);

    void sendChangeEmailCaptcha(String email);

    void changeEmail(ChangeEmailCommand command);
}
