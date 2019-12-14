package wopen.albumserver.domain.model.user;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.NaturalId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User implements Serializable {
    @Id
    @GeneratedValue
    private UUID id;
    @NaturalId
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private Gender gender = Gender.UNKNOWN;
    @Nationalized
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private String avatarUrl;
    @Nationalized
    private String bio;
    private String bannerUrl;
    @Column(nullable = false)
    private Instant regiteredAt;

    private Boolean enabled = false;
    private Boolean locked = false;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return username.equals(user.username) &&
                email.equals(user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, email);
    }
}
