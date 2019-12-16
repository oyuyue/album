package wopen.albumserver.infra.i18n;

public interface MessageTranslator {
    String translate(String code, Object... args);
}
