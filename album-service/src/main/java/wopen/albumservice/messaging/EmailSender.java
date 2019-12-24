package wopen.albumservice.messaging;

public interface EmailSender {
    void send(String email, String subject, String text);
}
