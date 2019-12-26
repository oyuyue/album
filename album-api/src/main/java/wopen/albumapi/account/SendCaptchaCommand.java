package wopen.albumapi.account;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class SendCaptchaCommand implements Serializable {
    @NotBlank
    @Email
    private String email;
}
