package wopen.albumservice.boot;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.model.user.UserRepo;

@Component
@Profile("dev")
public class TestData implements InitializingBean {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public TestData(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void afterPropertiesSet() {
        User user = User.signUp("168272542@qq.com", passwordEncoder.encode("123123"));

        userRepo.save(user);
    }
}
