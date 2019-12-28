package wopen.albumservice.security;

import lombok.Data;

@Data
public class LoginCommand {
    private String username;
    private String password;

    public String getUsername() {
        if (username == null) username = "";
        return username.trim();
    }

    public String getPassword() {
        if (password == null) password = "";
        return password.trim();
    }
}
