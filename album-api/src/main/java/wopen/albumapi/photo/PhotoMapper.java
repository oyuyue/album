package wopen.albumapi.photo;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import wopen.albumservice.domain.model.photo.Photo;

@Mapper
public interface PhotoMapper {
    @Mapping(source = "audit.createdAt", target = "createdAt")
    @Mapping(source = "audit.updatedAt", target = "updatedAt")
    @Mapping(target = "tags", expression = "java(photo.getTags().stream().map(x->x.getTag()).collect(java.util.stream.Collectors.toList()))")
    PhotoDto toDto(Photo photo);
}
