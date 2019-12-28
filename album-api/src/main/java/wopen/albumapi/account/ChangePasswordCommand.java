package wopen.albumapi.account;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChangePasswordCommand {
    @NotBlank
    private String password;
}
