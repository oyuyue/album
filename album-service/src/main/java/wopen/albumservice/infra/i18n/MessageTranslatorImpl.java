package wopen.albumservice.infra.i18n;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MessageTranslatorImpl implements MessageTranslator{
    private final MessageSource messageSource;

    public MessageTranslatorImpl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public String translate(String code, Object... args) {
        return messageSource.getMessage(code, args, code, LocaleContextHolder.getLocale());
    }
}
