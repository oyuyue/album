package wopen.albumservice.app.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wopen.albumservice.domain.model.user.ChangePasswordCommand;
import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.model.user.UserRepo;
import wopen.albumservice.exception.AuthException;
import wopen.albumservice.exception.PasswordNonMatchException;
import wopen.albumservice.exception.UserNotFoundException;
import wopen.albumservice.utils.WebContextHolder;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
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

    public User getCurrentUser() {
        String email = WebContextHolder.getCurrentUser().orElseThrow(AuthException::new).getUsername();
        return userRepo.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public void changePassword(ChangePasswordCommand command) {
        User user = getCurrentUser();
        checkPassword(command.getPassword(), user.getPassword());
        user.changePassword(passwordEncoder.encode(command.getNewPassword()));
        userRepo.save(user);
    }

    @Override
    public void changePassword(String password) {
        User user = getCurrentUser();
        user.changePassword(passwordEncoder.encode(password));
        userRepo.save(user);
    }

    @Override
    public User signUp(String email, String password) {
        return User.signUp(email, passwordEncoder.encode(password));
    }

    @Override
    public void changeEmail(String newEmail) {
        User user = getCurrentUser();
        user.changeEmail(newEmail);
        userRepo.save(user);
    }

    private void checkPassword(String raw, String encoded) {
        if (!passwordEncoder.matches(raw, encoded)) throw new PasswordNonMatchException();
    }
}
