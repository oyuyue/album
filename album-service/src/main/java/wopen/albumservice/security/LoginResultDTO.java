package wopen.albumsecurity;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginResultDTO implements Serializable {
    private String token;
}
