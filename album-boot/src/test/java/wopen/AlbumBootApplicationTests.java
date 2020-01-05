package wopen;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import wopen.albumservice.infra.messaging.EmailSender;

@SpringBootTest(classes = {AlbumBootApplication.class})
class AlbumTestApplicationTests {
    @Autowired
    private EmailSender emailSender;

    @Test
    void contextLoads() {
        emailSender.send(
                "168272542@qq.com",
                "注册验证码",
                "<html><body><h2>验证码</h2><p>190239</p></body></html>");
    }

}
