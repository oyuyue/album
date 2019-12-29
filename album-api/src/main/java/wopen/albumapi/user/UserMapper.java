package wopen.albumapi.user;

import org.mapstruct.Mapper;
import wopen.albumservice.domain.model.user.User;

@Mapper
public interface UserMapper {
    UserDto toDto(User user);
}
