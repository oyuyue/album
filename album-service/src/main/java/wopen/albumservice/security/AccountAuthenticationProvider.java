package wopen.albumservice.security;

import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import wopen.albumservice.infra.i18n.Messages;

public class AccountAuthenticationProvider implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final UserDetailsChecker userDetailsChecker = new AccountStatusUserDetailsChecker();

    public AccountAuthenticationProvider(
            PasswordEncoder passwordEncoder,
            UserDetailsService userDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = (authentication.getPrincipal() == null) ? "NONE_PROVIDED"
                : authentication.getName();

        UserDetails user = retrieveUser(username);

        if (!passwordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
            throw new BadCredentialsException(Messages.USER_PASSWORD_NON_MATCH);
        }

        userDetailsChecker.check(user);

        return createSuccessAuthentication(user);
    }

    private Authentication createSuccessAuthentication(UserDetails user) {
        return new AccountAuthenticationToken(user.getAuthorities(), user, user.getPassword());
    }

    private UserDetails retrieveUser(String username) {
        return userDetailsService.loadUserByUsername(username);
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return AccountAuthenticationToken.class.isAssignableFrom(aClass);
    }
}
