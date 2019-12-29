package wopen.albumapi.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import wopen.albumservice.domain.model.user.User;

@Mapper
public interface UserMapper {
    @Mapping(source = "stats.photoCount", target = "photoCount")
    @Mapping(source = "stats.albumCount", target = "albumCount")
    @Mapping(source = "stats.likeCount", target = "likeCount")
    @Mapping(source = "stats.viewedCount", target = "viewedCount")
    @Mapping(source = "stats.likedCount", target = "likedCount")
    UserDto toDto(User user);
}
