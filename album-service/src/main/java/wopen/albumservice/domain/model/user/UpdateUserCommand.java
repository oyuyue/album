package wopen.albumservice.domain.model.user;

import lombok.Data;

@Data
public class UpdateUserCommand {
    private String username;
    private Gender gender;
    private String nickname;
    private String avatarUrl;
    private String bio;
    private String bannerUrl;
}
