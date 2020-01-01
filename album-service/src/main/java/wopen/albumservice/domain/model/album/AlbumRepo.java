package wopen.albumservice.domain.model.album;

import java.util.Optional;

public interface AlbumRepo {
    Optional<Album> find(AlbumId albumId);
    Album save(Album album);
}
