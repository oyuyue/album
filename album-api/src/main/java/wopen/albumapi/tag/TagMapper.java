package wopen.albumapi.tag;

import org.mapstruct.Mapper;
import wopen.albumservice.domain.model.tag.Tag;

@Mapper
public interface TagMapper {
    TagDto toDto(Tag tag);
}
