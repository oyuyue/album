package wopen.albumservice.app.impl;

import org.springframework.stereotype.Service;
import wopen.albumservice.app.UserService;
import wopen.albumservice.domain.model.user.User;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public Optional<User> findUserByEmail(String email) {
        return Optional.empty();
    }
}
