package wopen.albumservice.app.user;

import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.model.user.UserStats;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);

    User getMyDetails();

    User findUserByUsername(String id);

    void updateUser(UpdateUserCommand command);

    UserStats getUserStats(User user);
}
