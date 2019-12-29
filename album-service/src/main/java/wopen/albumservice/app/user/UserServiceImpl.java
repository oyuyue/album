package wopen.albumservice.app.user;

import org.springframework.stereotype.Service;
import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.model.user.UserRepo;
import wopen.albumservice.exception.AuthException;
import wopen.albumservice.exception.UserNotFoundException;
import wopen.albumservice.utils.WebContextHolder;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User getMyDetails() {
        return getCurrentUser();
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public void updateUser(UpdateUserCommand command) {
        User user = getCurrentUser();
        user.update(command);
        userRepo.save(user);
    }

    private User getCurrentUser() {
        String email = WebContextHolder.getCurrentUser().orElseThrow(AuthException::new).getUsername();
        return userRepo.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }
}
