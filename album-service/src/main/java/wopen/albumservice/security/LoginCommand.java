package wopen.albumservice.security;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginCommand implements Serializable {
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
