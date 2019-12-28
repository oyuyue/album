package wopen.albumservice.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import wopen.albumservice.security.AccountAuthenticationToken;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

public final class WebContextHolder {
    private WebContextHolder(){}

    public static HttpServletRequest getRequest() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();

        return attr.getRequest();
    }

    public static HttpSession getSession() {
        return getRequest().getSession(true);
    }

    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static Optional<User> getCurrentUser() {
        Authentication authentication = getAuthentication();
        if (!(authentication instanceof AccountAuthenticationToken)) {
            return Optional.empty();
        }

        Object user = getAuthentication().getPrincipal();
        if (user instanceof User) return Optional.of((User) user);
        return Optional.empty();
    }

}
