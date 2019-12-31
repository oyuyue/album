package wopen.albumservice.domain.model.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Cache;
import wopen.albumservice.utils.$;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@ToString
@Getter
@Entity
@Table(name = "Users")
@NaturalIdCache
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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
    @Column
    private String nickname;
    @Column
    private String avatarUrl;
    @Nationalized
    private String bio;
    private String bannerUrl;
    @Column(nullable = false, updatable = false)
    private Instant joinedAt;

    @Embedded
    private UserStats stats;

    private Boolean enabled = true;
    private Boolean locked = false;

    public static User signUp(String email, String password) {
        User user = new User();
        user.email = email;
        user.password = password;
        user.username = $.uuidString();
        user.nickname = "新用户" + RandomStringUtils.randomNumeric(6);
        user.joinedAt = Instant.now();

        return user;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public Boolean getLocked() {
        return locked;
    }

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

    public void changePassword(String password) {
        this.password = password;
    }

    public void update(UpdateUserCommand command) {
        this.gender = command.getGender();
        this.nickname = command.getNickname();
        this.avatarUrl = command.getAvatarUrl();
        this.bio = command.getBio();
        this.bannerUrl = command.getBannerUrl();
    }

    public void changeEmail(String newEmail) {
        this.email = newEmail;
    }
}
