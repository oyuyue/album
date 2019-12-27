package wopen.albumservice.security;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginResultDTO implements Serializable {
    private String accessToken;
}
