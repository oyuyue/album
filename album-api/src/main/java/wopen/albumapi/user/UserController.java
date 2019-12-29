package wopen.albumapi.user;

import org.springframework.web.bind.annotation.*;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.user.UpdateUserCommand;
import wopen.albumservice.domain.model.user.User;

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
        userService.updateUser(command);
    }

    @GetMapping("/me")
    public UserDto me() {
        User user = userService.getMyDetails();
        return userMapper.toDto(user);
    }

    @GetMapping("/{username}")
    public UserDto getUserDetails(@PathVariable("username") String username) {
        User user = userService.findUserByUsername(username);
        return userMapper.toDto(user);
    }
}
