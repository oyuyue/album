package wopen.albumservice.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.infra.i18n.Messages;

import java.util.ArrayList;

@Component
public class DbUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public DbUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        wopen.albumservice.domain.model.user.User user = userService.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException(Messages.USER_NOT_FOUND));

        return new User(username, user.getPassword(), user.getEnabled(), true, true, !user.getLocked(), new ArrayList<>());
    }
}
