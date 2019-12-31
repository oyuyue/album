package wopen.albumservice.handing;

import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import wopen.albumservice.exception.HttpException;
import wopen.albumservice.infra.i18n.MessageTranslator;
import wopen.albumservice.infra.i18n.Messages;

@ControllerAdvice
@Slf4j
public class WebExceptionHandler extends ResponseEntityExceptionHandler {
    private final MessageTranslator messageTranslator;

    public WebExceptionHandler(MessageTranslator messageTranslator) {
        this.messageTranslator = messageTranslator;
    }

    @NotNull
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(@NotNull MethodArgumentNotValidException ex, @NotNull HttpHeaders headers, @NotNull HttpStatus status, @NotNull WebRequest request) {
        log.error("验证错误 400", ex);
        return handleExceptionInternal(ex, ApiError.of(ex.getLocalizedMessage()), headers, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({HttpException.class})
    public ResponseEntity<Object> handleHttpException(HttpException ex) {
        log.error("位置 http 错误", ex);
        return new ResponseEntity<>(ApiError.of(messageTranslator.translate(ex.getMessage())), ex.getStatus());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleAll(Exception ex) {
        log.error("未知错误", ex);
        return new ResponseEntity<>(ApiError.of(messageTranslator.translate(Messages.INTERNAL_SERVER_ERROR)), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
