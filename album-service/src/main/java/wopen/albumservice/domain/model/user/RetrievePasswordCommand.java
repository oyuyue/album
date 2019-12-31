package wopen.albumservice.domain.model.user;

import lombok.Data;

@Data
public class RetrievePasswordCommand {
    private String email;
    private String captcha;
    private String password;
}
