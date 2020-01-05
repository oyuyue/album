package wopen.albumapi.user;

import org.springframework.web.bind.annotation.*;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.utils.$;

@RestController
@RequestMapping(UserController.BASE_URL)
public class UserController {
    public static final String BASE_URL = "/users";
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping
    public void updateUser(@RequestBody UpdateUserCommand command) {
        command.setAvatarUrl($.extraFileName(command.getAvatarUrl()));
        command.setBannerUrl($.extraFileName(command.getBannerUrl()));
        userService.updateUser(command);
    }

    @GetMapping("/me")
    public UserDto me() {
        return userMapper.toDto(userService.getMyDetails());
    }

    @GetMapping("/{username}")
    public UserDto getUserDetails(@PathVariable("username") String username) {
        return userMapper.toDto(userService.getUserByUsername(username));
    }
}
