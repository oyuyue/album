package wopen.albumservice.app.user;

import wopen.albumservice.domain.model.user.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);
}
