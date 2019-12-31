package wopen.albumservice.domain.model.user;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChangePasswordCommand {
    @NotBlank
    private String password;
    @NotBlank
    private String newPassword;
}
