package wopen.albumservice.infra.messaging;

public interface EmailSender {
    void send(String email, String subject, String text);
}
