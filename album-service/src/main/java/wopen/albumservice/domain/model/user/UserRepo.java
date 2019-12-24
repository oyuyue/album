package wopen.albumservice.domain.model.user;

import java.util.Optional;

public interface UserRepo {
    Optional<User> findByEmail(String email);

    User save(User user);
}
