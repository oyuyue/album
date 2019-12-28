package wopen.albumservice.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import wopen.albumservice.api.handing.ApiError;
import wopen.albumservice.infra.i18n.MessageTranslator;
import wopen.albumservice.infra.i18n.Messages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private final ObjectMapper objectMapper;
    private final MessageTranslator messageTranslator;

    public RestAuthenticationFailureHandler(ObjectMapper objectMapper, MessageTranslator messageTranslator) {
        this.objectMapper = objectMapper;
        this.messageTranslator = messageTranslator;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        int status = HttpStatus.UNAUTHORIZED.value();
        ApiError error = new ApiError(Messages.USER_AUTHORIZED_FAILED);

        if (exception instanceof UsernameNotFoundException) {
            status = HttpStatus.NOT_FOUND.value();
            error.setMsg(Messages.USER_NOT_FOUND);
        } else if (exception instanceof BadCredentialsException) {
            error.setMsg(Messages.USER_PASSWORD_NON_MATCH);
        } else if (exception instanceof LockedException) {
            status = HttpStatus.FORBIDDEN.value();
            error.setMsg(Messages.USER_LOCKED);
        } else if (exception instanceof DisabledException) {
            error.setMsg(Messages.USER_DISABLED);
        } else if (exception instanceof InternalAuthenticationServiceException) {
            status = HttpStatus.INTERNAL_SERVER_ERROR.value();
            error.setMsg(Messages.INTERNAL_SERVER_ERROR);
        }

        error.setMsg(messageTranslator.translate(error.getMsg()));
        response.setStatus(status);
        response.getWriter().print(objectMapper.writeValueAsString(error));
    }

}
