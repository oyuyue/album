package wopen.albumapi.user;

import org.apache.logging.log4j.util.Strings;
import org.springframework.web.bind.annotation.*;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.properties.AppProperties;
import wopen.albumservice.utils.$;

@RestController
@RequestMapping(UserController.BASE_URL)
public class UserController {
    public static final String BASE_URL = "/users";
    private final UserService userService;
    private final UserMapper userMapper;
    private final String urlPrefix;

    public UserController(UserService userService, UserMapper userMapper, AppProperties appProperties) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.urlPrefix = appProperties.getUpload().getUrlPrefix();
    }

    @PostMapping
    public void updateUser(@RequestBody UpdateUserCommand command) {
        command.setAvatarUrl($.extraFileName(command.getAvatarUrl()));
        command.setBannerUrl($.extraFileName(command.getBannerUrl()));
        userService.updateUser(command);
    }

    @GetMapping("/me")
    public UserDto me() {
        User user = userService.getMyDetails();
        return addUrlPrefix(userMapper.toDto(user));
    }

    @GetMapping("/{username}")
    public UserDto getUserDetails(@PathVariable("username") String username) {
        User user = userService.findUserByUsername(username);
        return addUrlPrefix(userMapper.toDto(user));
    }

    private UserDto addUrlPrefix(UserDto dto) {
        if (Strings.isNotBlank(dto.getAvatarUrl())) {
            dto.setAvatarUrl($.concatUrl(urlPrefix, dto.getAvatarUrl()));
        }
        if (Strings.isNotBlank(dto.getBannerUrl())) {
            dto.setBannerUrl($.concatUrl(urlPrefix, dto.getBannerUrl()));
        }
        return dto;
    }
}
