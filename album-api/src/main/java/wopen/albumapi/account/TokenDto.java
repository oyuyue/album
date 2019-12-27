package wopen.albumapi.account;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class TokenDto implements Serializable {
    private String accessToken;
}
