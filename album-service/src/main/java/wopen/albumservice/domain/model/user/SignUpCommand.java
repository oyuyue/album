package wopen.albumservice.domain.model.user;

import lombok.Data;

@Data
public class SignUpCommand {
    private String email;
    private String captcha;
    private String password;
}
