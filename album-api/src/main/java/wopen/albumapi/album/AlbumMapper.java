package wopen.albumapi.album;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import wopen.albumservice.domain.model.album.Album;

@Mapper
public interface AlbumMapper {
    @Mapping(source = "audit.createdAt", target = "createdAt")
    @Mapping(source = "audit.updatedAt", target = "updatedAt")
    AlbumDto toDto(Album album);
}
