package wopen.albumservice.infra.i18n;

public interface MessageTranslator {
    String translate(String code, Object... args);
}
