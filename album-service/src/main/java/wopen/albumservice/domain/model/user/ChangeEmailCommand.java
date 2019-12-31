package wopen.albumservice.domain.model.user;

import lombok.Data;

@Data
public class ChangeEmailCommand {
    private String email;
    private String captcha;
    private String newEmail;
}
