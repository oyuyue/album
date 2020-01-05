package wopen.albumservice.app.user;

import wopen.albumservice.domain.model.user.ChangePasswordCommand;
import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.domain.model.user.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);

    User getMyDetails();

    User getUserByUsername(String username);

    void updateUser(UpdateUserCommand command);

    String getCurrentUsername();

    User getCurrentUser();

    void changePassword(ChangePasswordCommand command);

    void changePassword(String password);

    User signUp(String email, String password);

    void changeEmail(String newEmail);
}
