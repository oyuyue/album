package wopen.albumsecurity;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import wopen.albumservice.app.UserService;

import java.util.ArrayList;

@Component
public class DbUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public DbUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        wopen.albumservice.domain.model.user.User user = userService.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException(Messages.INTERNAL_SERVER_ERROR));
//
//        return new User(username, user.getPassword(), user.getEnabled(), true, true, user.getLocked(), new ArrayList<>());

        return new User(username, "$2y$12$YT9QmxW3fTGhL.DN7X.Y0OfFtBtjCfky5hf36rvFIPYKqp5HONx9G", true, true, true, true, new ArrayList<>());
    }
}
