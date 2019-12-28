package wopen.albumservice.app.user;

import org.springframework.stereotype.Service;
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
        String email = WebContextHolder.getCurrentUser().orElseThrow(AuthException::new).getUsername();
       return userRepo.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }
}
